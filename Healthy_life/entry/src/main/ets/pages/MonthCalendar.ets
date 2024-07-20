import MeasureText from '@ohos.measure';
import { router } from '@kit.ArkUI';
import { initializeOnStartUp } from '../model/WeekCalendarModel';
import { dateToStr } from '../common/utils/Utils';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import DatabaseApi from '../model/DatabaseModel';
import TaskInfo from '../viewmodel/TaskInfo';
import DayInfo from '../viewmodel/DayInfo';
import DayInfoApi from '../common/database/tables/DayInfoApi';
import WeekCalendarInfo from '../viewmodel/WeekCalendarInfo';


@Observed
export class DateItem {
  fullYear: number = 2024
  month: number = 7
  date: number = 20
  week: number = 0
  time: number = 0
  isPre?: boolean // 是否是上一个月的 / 在startDate 之前
  isNext?: boolean // 是否是下一个月的 / 在endDate 之后

  constructor(date: Date, isPre?: boolean, isNext?: boolean) {
    if (date) {
      this.fullYear = date.getFullYear()
      this.month = date.getMonth()
      this.date = date.getDate()
      this.week = date.getDay()
      this.time = date.getTime()
    }

    this.isPre = isPre
    this.isNext = isNext
  }

  equalDay(other: DateItem | number) {
    if (typeof other == "number") {
      other = new DateItem(new Date(other))
    }
    if (other) {
      if (this.fullYear == other.fullYear && this.month == other.month && this.date == other.date) {
        return true
      }
      return false
    }
    return false
  }
}

@Entry
@Component
struct MonthCalendar {
  @State selectItem: DateItem|undefined = undefined
  @State selectItem2: DateItem|undefined = undefined
  rangeStyle: number = 1

  private today: Date = new Date() // 当天

  // 开始日期
  startDate?: Date
  // 截止日期
  endDate?: Date

  //
  @State private currMonth: number = this.today.getMonth()
  @State private currYear: number = this.today.getFullYear()
  private startDay: Date = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    1
  ) // 当前显示的月份的第一天

  // 是否有上一个月
  @State private hasPre: boolean = true
  // 是否有下一个月
  @State private hasNext: boolean = true

  // 标题栏高度
  titleHeight: Length = '50vp'
  // 星期标题
  weeks: string[] = ["日", "一", "二", "三", "四", "五", "六"]
  // 星期标题字体大小
  weekTitleFontSize: number | string | Resource = 12
  // 星期标题字体颜色
  weekTitleFontColor: ResourceColor = "#9E9E9E"
  weekTitleBackgroundColor: ResourceColor|undefined = undefined
  // 星期标栏高度
  weekTitleHeight: Length = 40

  // 标题字体大小
  titleFontSize: number | string | Resource = 18
  // 标题字体颜色
  titleFontColor: ResourceColor = "#252a34"

  // 日期每一项字体大小
  itemFontSize: number | string | Resource = 18
  itemFontColor: ResourceColor = "#252a34"
  itemFontWeight: FontWeight = FontWeight.Normal
  disabledFontColor: ResourceColor = "#9E9E9E"
  selectFontColor: ResourceColor = "#FFFFFF"
  selectItemBgColor?: ResourceColor

  @State @Watch("onTitleChange") private title: string|undefined = undefined

  @State dates: Array<DateItem> = new Array()

  @State selectedDates: Array<DateItem | string> = new Array()

  // 自定义每一项布局
  @BuilderParam public cellLayout?: (item: DateItem) => void

  // 自定义日期标题每项内容
  @BuilderParam public titleCenterLayout?: () => void
  @BuilderParam public titleLeftLayout?: (hasPre: boolean) => void
  @BuilderParam public titleRightLayout?: (hasNext: boolean) => void

  // 当使用cellLayout时，tadayLayout无效
  @BuilderParam public todayLayout?: (item: DateItem) => void

  // 自定义顶部，可结合cusTopStateListener使用
  @BuilderParam public cusTopLayout?: (preMonth?: () => void,
                                       nextMonth?: () => void,
                                       backToday?: () => void) => void

  // 顶部状态变量更新回调
  cusTopStateListener?: (title?: string,
                        hasPre?: boolean,
                        hasNext?: boolean,
                        showFastToday?: boolean) => void

  // 计算item时，如需添加更多自定义属性时使用
  reBuildDateItem?: (item: DateItem) => DateItem

  // 变化监听
  onDateChange?: (date1: DateItem | Array<DateItem | string>, date2?: DateItem) => void
  onMonthChange?: (after: Date, befor?: Date) => void
  disableCellClick?: (item: DateItem) => void

  @Builder
  createWeekTitle(item:ResourceStr) {
    Text(item)
      .textAlign(TextAlign.Center)
      .fontColor(this.weekTitleFontColor)
      .fontSize(this.weekTitleFontSize)
      .layoutWeight(1)
  }

  public isFinished(today: DateItem): number {
    let currentDate = new Date()
    currentDate.setDate(today.date)
    currentDate.setMonth(today.month)
    currentDate.setTime(today.time)
    currentDate.setFullYear(today.fullYear)
    let weekCalendarInfo: WeekCalendarInfo = initializeOnStartUp(currentDate);
    let dateArr = weekCalendarInfo.arr;
    let flag = 0;
    // get data form db
    DatabaseApi.query(dateToStr(new Date()), (taskList: TaskInfo[], dayInfo: DayInfo) => {
      Logger.info('Current Day Task Info: ', JSON.stringify(taskList));
      DayInfoApi.queryList(weekCalendarInfo.strArr, (res: DayInfo[]) => {
        let tempList = res.concat(dayInfo);
        Logger.info('initDayInfoList: ', JSON.stringify(res));
        for (let i = 0; i < dateArr.length; i++) {
          let tempDayInfo = tempList.find((item: DayInfo) => item.date === dateArr[i].dateStr)
            || new DayInfo(dateArr[i].dateStr, 0, 0, false);
          weekCalendarInfo.arr[i].dayInfo = tempDayInfo;
          if (tempDayInfo.targetTaskNum == tempDayInfo.targetTaskNum && String(currentDate.getDate()) == tempDayInfo.date) {
            flag = 1
          }
          weekCalendarInfo.arr[i].taskList = taskList;
        }
        dateArr = weekCalendarInfo.arr;
      })
    })
    return flag
  }

  @Builder createCell() {
    ForEach(this.dates, (item: DateItem) => {
      if(this.isFinished(item)) {
        Text(String(item.date))
          .width('14.28%')
          .fontColor("#03A9F4")
          .textAlign(TextAlign.Center)
          .margin({bottom: "10"})
      } else if(item.month == this.currMonth) {
        Text(String(item.date))
          .width('14.28%')
          .fontColor("#808080")
          .textAlign(TextAlign.Center)
          .margin({ bottom: "10" })
      } else {
        Text(String(item.date))
          .width('14.28%')
          .fontColor("#9E9E9E")
          .textAlign(TextAlign.Center)
          .margin({bottom: "10"})
      }
      }, (item:DateItem) => JSON.stringify(item))
  }

  private changeTopState() {
    if (this.cusTopStateListener) {
      this.cusTopStateListener(this.title, this.hasPre, this.hasNext, (this.currYear == this.today.getFullYear()
        && this.currMonth != this.today.getMonth() || this.currYear != this.today.getFullYear()))
    }
  }

  /**
   * 标题改变时
   */
  onTitleChange() {
    this.changeTopState()
  }

  /**
   * 属性初始化
   */
  initAttr() {
    this.today = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
    )

    // 开始日期
    if (!this.startDate) {
      this.startDate = new Date(1970, 0, 1)
    }
    // 截止日期
    if (!this.endDate) {
      this.endDate = new Date(this.today.getFullYear() + 10, 11, 31)
    }

    if (this.today.getTime() < this.startDate.getTime()) {
      this.startDay.setTime(this.startDate.getTime())
    } else if (this.today.getTime() > this.endDate.getTime()) {
      this.startDay.setTime(this.endDate.getTime())
    } else {
      this.startDay.setTime(this.today.getTime())
    }

    // 初始化默认选项
    if (this.selectedDates && this.selectedDates.length > 0) {
      for (let index = 0; index < this.selectedDates.length; index++) {
        const element = this.selectedDates[index];
        if (typeof element == "string") {
          this.selectedDates[index] = new DateItem(new Date(element))
        }
      }
    }
  }

  aboutToAppear() {
    this.initAttr()
    this.calcDatas()
  }

  /**
   * 下一个月
   */
  private nextMonth() {
    this.dates = []
    const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth())
    this.startDay.setMonth(this.startDay.getMonth() + 1)
    if (this.onMonthChange) {
      this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate)
    }
    this.calcDatas()
  }

  /**
   * 上一个月
   */
  private preMonth() {
    this.dates = []
    const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth())
    this.startDay.setMonth(this.startDay.getMonth() - 1)
    if (this.onMonthChange) {
      this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate)
    }
    this.calcDatas()
  }

  /**
   * 回到今天
   */
  private backToday() {
    this.dates = []
    const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth())
    this.startDay.setFullYear(this.today.getFullYear(), this.today.getMonth())

    if (this.onMonthChange) {
      this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate)
    }
    this.calcDatas()
  }

  /**
   * 具体计算
   */
  private calcDatas() {
    const startDay = this.startDay
    this.currMonth = startDay.getMonth()
    this.currYear = startDay.getFullYear()
    this.title = `${startDay.getFullYear()}年${startDay.getMonth() + 1}月`
    startDay.setDate(1)

    if (this.startDate&&(startDay.getFullYear() < this.startDate.getFullYear()
    || (startDay.getFullYear() == this.startDate.getFullYear() && startDay.getMonth() <= this.startDate.getMonth()))) {
      this.hasPre = false
    } else {
      this.hasPre = true
    }

    if (this.endDate&&this.startDate&&(startDay.getFullYear() > this.endDate.getFullYear()
    || (startDay.getFullYear() == this.startDate.getFullYear() && startDay.getMonth() >= this.endDate.getMonth()))) {
      this.hasNext = false
    } else {
      this.hasNext = true
    }

    // 计算第一个月
    // 获取第一个月总天数
    let endDay: Date = new Date(
      startDay.getFullYear(),
      startDay.getMonth() + 1,
      0, 23, 59, 59)

    let tempDate: Date = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate()
    )

    const count = endDay.getDate()
    const preCount = startDay.getDay()
    const nextCount = 6 - endDay.getDay()
    const finilCount = count + preCount + nextCount

    // 补齐上一个月
    tempDate.setDate(tempDate.getDate() - preCount)

    // 添加日期
    for (let index = 0; index < finilCount; index++) {
      let item = new DateItem(
        tempDate,
        (index < preCount ? true : false) || (this.startDate&&(this.startDate.getTime() > tempDate.getTime())),
        (index >= preCount + count ? true : false) || (this.endDate&&(this.endDate.getTime() < tempDate.getTime()))
      )
      if (this.reBuildDateItem) {
        this.reBuildDateItem(item)
      }
      this.dates.push(item)
      tempDate.setDate(tempDate.getDate() + 1)
    }
  }

  build() {
    Column() {
      if (this.cusTopLayout) {
        this.cusTopLayout(
          () => {
            this.preMonth()
          },
          () => {
            this.nextMonth()
          },
          () => {
            this.backToday()
          },
        );
      } else {
        Row() {
          Button('取消')
            .onClick(() => {
              // 切换回主页
              router.back()
            })
            .width($r('app.float.default_56'))
            .height($r('app.float.default_36'))
            .backgroundColor($r('app.color.progress_background_color'))
            .fontColor($r('app.color.black'))
            .fontSize($r('app.float.default_12'))
            .margin({ top: $r('app.float.default_10') })
          Column() {
            if (this.titleLeftLayout) {
              this.titleLeftLayout(this.hasPre)
            } else {
              Image($r("app.media.arrow"))
                .width(18)
                .fillColor(this.hasPre ? this.itemFontColor : this.disabledFontColor)
                .rotate({ z: 1, angle: Const.DEFAULT_180 })
                .aspectRatio(1)
            }
          }
          .justifyContent(FlexAlign.Center)
          .height("100%")
          .aspectRatio(1)
          .onClick(() => {
            if (this.hasPre) {
              this.preMonth()
            }
          })

          Blank()

          if (this.titleCenterLayout) {
            this.titleCenterLayout()
          } else {
            Row() {
              Text(this.title)
                .fontSize(this.titleFontSize)
                .fontColor(this.titleFontColor)
            }
          }
          Blank()
          Column() {
            if (this.titleRightLayout) {
              this.titleRightLayout(this.hasNext)
            } else {
              Image($r("app.media.arrow"))
                .fillColor(this.hasNext ? this.itemFontColor : this.disabledFontColor)
                .width(18)
                .aspectRatio(1)
            }
          }
          .justifyContent(FlexAlign.Center)
          .height("100%")
          .aspectRatio(1)
          .onClick(() => {
            if (this.hasNext) {
              this.nextMonth()
            }
          })
        }
        .alignItems(VerticalAlign.Center)
        .width("100%")
        .height(this.titleHeight)
      }

      // 星期title
      Row() {
        ForEach(this.weeks, (item:string) => {
          this.createWeekTitle(item)
        })
      }
      .backgroundColor(this.weekTitleBackgroundColor)
      .alignItems(VerticalAlign.Center)
      .height(this.weekTitleHeight)

      Flex({ wrap: FlexWrap.Wrap }) {
        this.createCell()
      }
      .width("100%")
    }
    .width("100%")
  }
}