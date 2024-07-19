import { display } from '@kit.ArkUI';
import WeekCalendarMethods, { ScrollTo } from '../viewmodel/CalendarViewModel';
import { HomeStore } from '../viewmodel/HomeViewModel';
import HealthText from '../view/HealthTextComponent';
import { WeekDateModel } from '../model/WeekCalendarModel';
import { sameDate } from '../common/utils/Utils';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';


export const WEEK_DAY_WIDTH: number = 100 / Const.WEEK_DAY_NUM;

const DEFAULT_SCROLL_WIDTH = 336; // default calendar width
const DEFAULT_SCROLL_PERCENT = 0.934; // default calendar width percent

@Component
export struct MonthCalendarComponent {
  @Link homeStore: HomeStore;
  currentPage: number = 1;
  private scroller: Scroller = new Scroller();
  scrollWidth: number = DEFAULT_SCROLL_WIDTH;
  private isLoadMore: boolean = false;
  private isPageScroll: boolean = false;

  aboutToAppear() {
    try {
      let displayClass = display.getDefaultDisplaySync();
      this.scrollWidth = displayClass.width / displayClass.densityPixels * DEFAULT_SCROLL_PERCENT;
      Logger.info('HomeIndex', 'get the window scrollWidth: ' + this.scrollWidth);
    } catch (err) {
      Logger.error('HomeIndex->onScrollEnd', JSON.stringify(err));
    }
    this.homeStore.setSelectedShowDate(new Date().getTime());
  }

  getProgressImg(item: WeekDateModel): Resource {
    let finNum = item.dayInfo?.finTaskNum || 0;
    if (finNum === 0) {
      return $r('app.media.ic_home_undone');
    }
    if (finNum === (item.dayInfo?.targetTaskNum || 0)) {
      return $r('app.media.ic_home_all_done');
    }
    return $r('app.media.ic_home_half_done');
  }

  @Builder
  ArrowIcon(isRight: boolean) {
    Row() {
      Image($r('app.media.ic_right_grey'))
        .width($r('app.float.default_6'))
        .height($r('app.float.default_12'))
    }
    .width($r('app.float.default_20'))
    .height($r('app.float.default_20'))
    .rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 })
    .justifyContent(FlexAlign.Center)
    .onClick(() => isRight ?
    WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, this.homeStore, this.scroller) :
    WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, this.homeStore, this.currentPage, this.scroller))
  }

  build() {

  }

  // 新增一个方法来将日期数组分成每周的数据
  getWeeks(dateArr: WeekDateModel[]): WeekDateModel[][] {
    const weeks: WeekDateModel[][] = [];
    for (let i = 0; i < dateArr.length; i += Const.WEEK_DAY_NUM) {
      weeks.push(dateArr.slice(i, i + Const.WEEK_DAY_NUM));
    }
    return weeks;
  }

  onScrollEndAction() {
    if (this.isPageScroll === false) {
      let page = Math.round(this.scroller.currentOffset().xOffset / this.scrollWidth);
      page = (this.isLoadMore === true) ? page + 1 : page;
      if (this.scroller.currentOffset().xOffset % this.scrollWidth != 0 || this.isLoadMore === true) {
        let xOffset = page * this.scrollWidth;
        this.scroller.scrollTo({ xOffset, yOffset: 0 } as ScrollTo);
        this.isLoadMore = false;
      }
      this.currentPage = this.homeStore.dateArr.length / Const.WEEK_DAY_NUM - page - 1;
      Logger.info('HomeIndex', 'onScrollEnd: page ' + page + ', listLength ' + this.homeStore.dateArr.length);
      let dayModel: WeekDateModel = this.homeStore.dateArr[Const.WEEK_DAY_NUM * page+this.homeStore.selectedDay];
      Logger.info('HomeIndex', 'currentItem: ' + JSON.stringify(dayModel) + ', selectedDay  ' + this.homeStore.selectedDay);
      this.homeStore!.setSelectedShowDate(dayModel!.date!.getTime());
    }
    this.isPageScroll = false;
  }

  onScrollEdgeAction(side: Edge) {
    if (side === Edge.Top && this.isPageScroll === false) {
      Logger.info('HomeIndex', 'onScrollEdge: currentPage ' + this.currentPage);
      if ((this.currentPage + 2) * Const.WEEK_DAY_NUM >= this.homeStore.dateArr.length) {
        Logger.info('HomeIndex', 'onScrollEdge: load more data');
        let date: Date = new Date(this.homeStore.showDate);
        date.setDate(date.getDate() - Const.WEEK_DAY_NUM);
        this.homeStore.getPreWeekData(date, () => {
        });
        this.isLoadMore = true;
      }
    }
  }
}