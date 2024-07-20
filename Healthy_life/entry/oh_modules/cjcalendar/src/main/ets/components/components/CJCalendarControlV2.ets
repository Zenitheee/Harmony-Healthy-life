/**
 * 日历控制器
 */
import { CJCalendarV2 } from './CJCalendarV2'
import { CJDateItem } from './CJDateItem'

const TAG = "CJCalendarControlV2"

export class CJCalendarControlV2 {
  private cjCalendar: CJCalendarV2 | undefined

  bind(cjCalendar: CJCalendarV2) {
    this.cjCalendar = cjCalendar
  }

  unbind() {
    this.cjCalendar = undefined
  }

  /**
   * 上一个月
   */
  preMonth() {
    this.cjCalendar?.__preMonth()
  }

  /**
   * 下一个月
   */
  nextMonth() {
    this.cjCalendar?.__nextMonth()
  }

  /**
   * 回到今天
   */
  backToday() {
    this.cjCalendar?.__backToday()
  }

  /**
   * 跳转至指定的年月份
   * @param month “2016-08” / new Date(“2016-08”)
   */
  skipToMonth(month: Date | string) {
    this.cjCalendar?.__skipToMonth(month)
  }

  currentMonth() {

  }

  /**
   * 触发选中指定日期项
   * @param items ["2024-06-07"] 、 [new Date()]
   */
  selectItems(items: Array<string | Date> | undefined) {
    this.cjCalendar?.__changeSelectItems(items)
  }

  /**
   * 获取当前items
   * @returns
   */
  getItems(): Array<CJDateItem> | undefined {
    // return this.cjCalendar?.days[0]
    return undefined
  }

  /**
   * 添加不能选中项
   */
  addDisSelectItems(params: Array<string | Date>) {
    this.cjCalendar?.addDisSelectItems(params)
  }

  /**
   * 清楚所有不可选中项
   */
  clearDisSelectItems() {
    this.cjCalendar?.clearDisSelectItems()
  }

  /**
   * 显示隐藏农历
   */
  showLunar(show: boolean) {
    this.cjCalendar?.changeShowLunar(show)
  }
}