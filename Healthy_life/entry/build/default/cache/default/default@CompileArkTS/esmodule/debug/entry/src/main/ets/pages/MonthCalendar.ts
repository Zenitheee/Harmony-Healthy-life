if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MonthCalendar_Params {
    selectItem?: DateItem | undefined;
    selectItem2?: DateItem | undefined;
    rangeStyle?: number;
    today?: Date;
    // 开始日期
    startDate?: Date;
    // 截止日期
    endDate?: Date;
    currMonth?: number;
    currYear?: number;
    startDay?: Date;
    hasPre?: boolean;
    hasNext?: boolean;
    // 标题栏高度
    titleHeight?: Length;
    // 星期标题
    weeks?: string[];
    // 星期标题字体大小
    weekTitleFontSize?: number | string | Resource;
    // 星期标题字体颜色
    weekTitleFontColor?: ResourceColor;
    weekTitleBackgroundColor?: ResourceColor | undefined;
    // 星期标栏高度
    weekTitleHeight?: Length;
    // 标题字体大小
    titleFontSize?: number | string | Resource;
    // 标题字体颜色
    titleFontColor?: ResourceColor;
    // 日期每一项字体大小
    itemFontSize?: number | string | Resource;
    itemFontColor?: ResourceColor;
    itemFontWeight?: FontWeight;
    disabledFontColor?: ResourceColor;
    selectFontColor?: ResourceColor;
    selectItemBgColor?: ResourceColor;
    title?: string | undefined;
    dates?: Array<DateItem>;
    selectedDates?: Array<DateItem | string>;
    cellLayout?: (item: DateItem) => void;
    titleCenterLayout?: () => void;
    titleLeftLayout?: (hasPre: boolean) => void;
    titleRightLayout?: (hasNext: boolean) => void;
    todayLayout?: (item: DateItem) => void;
    cusTopLayout?: (preMonth?: () => void, nextMonth?: () => void, backToday?: () => void) => void;
    // 顶部状态变量更新回调
    cusTopStateListener?: (title?: string, hasPre?: boolean, hasNext?: boolean, showFastToday?: boolean) => void;
    // 计算item时，如需添加更多自定义属性时使用
    reBuildDateItem?: (item: DateItem) => DateItem;
    // 变化监听
    onDateChange?: (date1: DateItem | Array<DateItem | string>, date2?: DateItem) => void;
    onMonthChange?: (after: Date, befor?: Date) => void;
    disableCellClick?: (item: DateItem) => void;
}
import router from "@ohos:router";
import { initializeOnStartUp } from "@bundle:com.example.healthy_life/entry/ets/model/WeekCalendarModel";
import { dateToStr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import DatabaseApi from "@bundle:com.example.healthy_life/entry/ets/model/DatabaseModel";
import type TaskInfo from '../viewmodel/TaskInfo';
import DayInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/DayInfo";
import DayInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/DayInfoApi";
import type WeekCalendarInfo from '../viewmodel/WeekCalendarInfo';
@Observed
export class DateItem {
    fullYear: number = 2024;
    month: number = 7;
    date: number = 20;
    week: number = 0;
    time: number = 0;
    isPre?: boolean; // 是否是上一个月的 / 在startDate 之前
    isNext?: boolean; // 是否是下一个月的 / 在endDate 之后
    constructor(date: Date, isPre?: boolean, isNext?: boolean) {
        if (date) {
            this.fullYear = date.getFullYear();
            this.month = date.getMonth();
            this.date = date.getDate();
            this.week = date.getDay();
            this.time = date.getTime();
        }
        this.isPre = isPre;
        this.isNext = isNext;
    }
    equalDay(other: DateItem | number) {
        if (typeof other == "number") {
            other = new DateItem(new Date(other));
        }
        if (other) {
            if (this.fullYear == other.fullYear && this.month == other.month && this.date == other.date) {
                return true;
            }
            return false;
        }
        return false;
    }
}
class MonthCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectItem = new ObservedPropertyObjectPU(undefined, this, "selectItem");
        this.__selectItem2 = new ObservedPropertyObjectPU(undefined, this, "selectItem2");
        this.rangeStyle = 1;
        this.today = new Date() // 当天
        ;
        this.startDate = undefined;
        this.endDate = undefined;
        this.__currMonth = new ObservedPropertySimplePU(this.today.getMonth(), this, "currMonth");
        this.__currYear = new ObservedPropertySimplePU(this.today.getFullYear(), this, "currYear");
        this.startDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1) // 当前显示的月份的第一天
        ;
        this.__hasPre = new ObservedPropertySimplePU(true
        // 是否有下一个月
        , this, "hasPre");
        this.__hasNext = new ObservedPropertySimplePU(true
        // 标题栏高度
        , this, "hasNext");
        this.titleHeight = '50vp';
        this.weeks = ["日", "一", "二", "三", "四", "五", "六"];
        this.weekTitleFontSize = 12;
        this.weekTitleFontColor = "#9E9E9E";
        this.weekTitleBackgroundColor = undefined;
        this.weekTitleHeight = 40;
        this.titleFontSize = 18;
        this.titleFontColor = "#252a34";
        this.itemFontSize = 18;
        this.itemFontColor = "#252a34";
        this.itemFontWeight = FontWeight.Normal;
        this.disabledFontColor = "#9E9E9E";
        this.selectFontColor = "#FFFFFF";
        this.selectItemBgColor = undefined;
        this.__title = new ObservedPropertyObjectPU(undefined, this, "title");
        this.__dates = new ObservedPropertyObjectPU(new Array(), this, "dates");
        this.__selectedDates = new ObservedPropertyObjectPU(new Array()
        // 自定义每一项布局
        , this, "selectedDates");
        this.cellLayout = undefined;
        this.titleCenterLayout = undefined;
        this.titleLeftLayout = undefined;
        this.titleRightLayout = undefined;
        this.todayLayout = undefined;
        this.cusTopLayout = undefined;
        this.cusTopStateListener = undefined;
        this.reBuildDateItem = undefined;
        this.onDateChange = undefined;
        this.onMonthChange = undefined;
        this.disableCellClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("title", this.onTitleChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MonthCalendar_Params) {
        if (params.selectItem !== undefined) {
            this.selectItem = params.selectItem;
        }
        if (params.selectItem2 !== undefined) {
            this.selectItem2 = params.selectItem2;
        }
        if (params.rangeStyle !== undefined) {
            this.rangeStyle = params.rangeStyle;
        }
        if (params.today !== undefined) {
            this.today = params.today;
        }
        if (params.startDate !== undefined) {
            this.startDate = params.startDate;
        }
        if (params.endDate !== undefined) {
            this.endDate = params.endDate;
        }
        if (params.currMonth !== undefined) {
            this.currMonth = params.currMonth;
        }
        if (params.currYear !== undefined) {
            this.currYear = params.currYear;
        }
        if (params.startDay !== undefined) {
            this.startDay = params.startDay;
        }
        if (params.hasPre !== undefined) {
            this.hasPre = params.hasPre;
        }
        if (params.hasNext !== undefined) {
            this.hasNext = params.hasNext;
        }
        if (params.titleHeight !== undefined) {
            this.titleHeight = params.titleHeight;
        }
        if (params.weeks !== undefined) {
            this.weeks = params.weeks;
        }
        if (params.weekTitleFontSize !== undefined) {
            this.weekTitleFontSize = params.weekTitleFontSize;
        }
        if (params.weekTitleFontColor !== undefined) {
            this.weekTitleFontColor = params.weekTitleFontColor;
        }
        if (params.weekTitleBackgroundColor !== undefined) {
            this.weekTitleBackgroundColor = params.weekTitleBackgroundColor;
        }
        if (params.weekTitleHeight !== undefined) {
            this.weekTitleHeight = params.weekTitleHeight;
        }
        if (params.titleFontSize !== undefined) {
            this.titleFontSize = params.titleFontSize;
        }
        if (params.titleFontColor !== undefined) {
            this.titleFontColor = params.titleFontColor;
        }
        if (params.itemFontSize !== undefined) {
            this.itemFontSize = params.itemFontSize;
        }
        if (params.itemFontColor !== undefined) {
            this.itemFontColor = params.itemFontColor;
        }
        if (params.itemFontWeight !== undefined) {
            this.itemFontWeight = params.itemFontWeight;
        }
        if (params.disabledFontColor !== undefined) {
            this.disabledFontColor = params.disabledFontColor;
        }
        if (params.selectFontColor !== undefined) {
            this.selectFontColor = params.selectFontColor;
        }
        if (params.selectItemBgColor !== undefined) {
            this.selectItemBgColor = params.selectItemBgColor;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dates !== undefined) {
            this.dates = params.dates;
        }
        if (params.selectedDates !== undefined) {
            this.selectedDates = params.selectedDates;
        }
        if (params.cellLayout !== undefined) {
            this.cellLayout = params.cellLayout;
        }
        if (params.titleCenterLayout !== undefined) {
            this.titleCenterLayout = params.titleCenterLayout;
        }
        if (params.titleLeftLayout !== undefined) {
            this.titleLeftLayout = params.titleLeftLayout;
        }
        if (params.titleRightLayout !== undefined) {
            this.titleRightLayout = params.titleRightLayout;
        }
        if (params.todayLayout !== undefined) {
            this.todayLayout = params.todayLayout;
        }
        if (params.cusTopLayout !== undefined) {
            this.cusTopLayout = params.cusTopLayout;
        }
        if (params.cusTopStateListener !== undefined) {
            this.cusTopStateListener = params.cusTopStateListener;
        }
        if (params.reBuildDateItem !== undefined) {
            this.reBuildDateItem = params.reBuildDateItem;
        }
        if (params.onDateChange !== undefined) {
            this.onDateChange = params.onDateChange;
        }
        if (params.onMonthChange !== undefined) {
            this.onMonthChange = params.onMonthChange;
        }
        if (params.disableCellClick !== undefined) {
            this.disableCellClick = params.disableCellClick;
        }
    }
    updateStateVars(params: MonthCalendar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectItem.purgeDependencyOnElmtId(rmElmtId);
        this.__selectItem2.purgeDependencyOnElmtId(rmElmtId);
        this.__currMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__currYear.purgeDependencyOnElmtId(rmElmtId);
        this.__hasPre.purgeDependencyOnElmtId(rmElmtId);
        this.__hasNext.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__dates.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDates.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectItem.aboutToBeDeleted();
        this.__selectItem2.aboutToBeDeleted();
        this.__currMonth.aboutToBeDeleted();
        this.__currYear.aboutToBeDeleted();
        this.__hasPre.aboutToBeDeleted();
        this.__hasNext.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__dates.aboutToBeDeleted();
        this.__selectedDates.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectItem: ObservedPropertyObjectPU<DateItem | undefined>;
    get selectItem() {
        return this.__selectItem.get();
    }
    set selectItem(newValue: DateItem | undefined) {
        this.__selectItem.set(newValue);
    }
    private __selectItem2: ObservedPropertyObjectPU<DateItem | undefined>;
    get selectItem2() {
        return this.__selectItem2.get();
    }
    set selectItem2(newValue: DateItem | undefined) {
        this.__selectItem2.set(newValue);
    }
    private rangeStyle: number;
    private today: Date; // 当天
    // 开始日期
    private startDate?: Date;
    // 截止日期
    private endDate?: Date;
    //
    private __currMonth: ObservedPropertySimplePU<number>;
    get currMonth() {
        return this.__currMonth.get();
    }
    set currMonth(newValue: number) {
        this.__currMonth.set(newValue);
    }
    private __currYear: ObservedPropertySimplePU<number>;
    get currYear() {
        return this.__currYear.get();
    }
    set currYear(newValue: number) {
        this.__currYear.set(newValue);
    }
    private startDay: Date; // 当前显示的月份的第一天
    // 是否有上一个月
    private __hasPre: ObservedPropertySimplePU<boolean>;
    get hasPre() {
        return this.__hasPre.get();
    }
    set hasPre(newValue: boolean) {
        this.__hasPre.set(newValue);
    }
    // 是否有下一个月
    private __hasNext: ObservedPropertySimplePU<boolean>;
    get hasNext() {
        return this.__hasNext.get();
    }
    set hasNext(newValue: boolean) {
        this.__hasNext.set(newValue);
    }
    // 标题栏高度
    private titleHeight: Length;
    // 星期标题
    private weeks: string[];
    // 星期标题字体大小
    private weekTitleFontSize: number | string | Resource;
    // 星期标题字体颜色
    private weekTitleFontColor: ResourceColor;
    private weekTitleBackgroundColor: ResourceColor | undefined;
    // 星期标栏高度
    private weekTitleHeight: Length;
    // 标题字体大小
    private titleFontSize: number | string | Resource;
    // 标题字体颜色
    private titleFontColor: ResourceColor;
    // 日期每一项字体大小
    private itemFontSize: number | string | Resource;
    private itemFontColor: ResourceColor;
    private itemFontWeight: FontWeight;
    private disabledFontColor: ResourceColor;
    private selectFontColor: ResourceColor;
    private selectItemBgColor?: ResourceColor;
    private __title: ObservedPropertyObjectPU<string | undefined>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string | undefined) {
        this.__title.set(newValue);
    }
    private __dates: ObservedPropertyObjectPU<Array<DateItem>>;
    get dates() {
        return this.__dates.get();
    }
    set dates(newValue: Array<DateItem>) {
        this.__dates.set(newValue);
    }
    private __selectedDates: ObservedPropertyObjectPU<Array<DateItem | string>>;
    get selectedDates() {
        return this.__selectedDates.get();
    }
    set selectedDates(newValue: Array<DateItem | string>) {
        this.__selectedDates.set(newValue);
    }
    // 自定义每一项布局
    public __cellLayout?;
    // 自定义日期标题每项内容
    public __titleCenterLayout?;
    public __titleLeftLayout?;
    public __titleRightLayout?;
    // 当使用cellLayout时，tadayLayout无效
    public __todayLayout?;
    // 自定义顶部，可结合cusTopStateListener使用
    public __cusTopLayout?;
    // 顶部状态变量更新回调
    private cusTopStateListener?: (title?: string, hasPre?: boolean, hasNext?: boolean, showFastToday?: boolean) => void;
    // 计算item时，如需添加更多自定义属性时使用
    private reBuildDateItem?: (item: DateItem) => DateItem;
    // 变化监听
    private onDateChange?: (date1: DateItem | Array<DateItem | string>, date2?: DateItem) => void;
    private onMonthChange?: (after: Date, befor?: Date) => void;
    private disableCellClick?: (item: DateItem) => void;
    createWeekTitle(item: ResourceStr, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item);
            Text.textAlign(TextAlign.Center);
            Text.fontColor(this.weekTitleFontColor);
            Text.fontSize(this.weekTitleFontSize);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
    }
    public isFinished(today: DateItem): number {
        let currentDate = new Date();
        currentDate.setDate(today.date);
        currentDate.setMonth(today.month);
        currentDate.setTime(today.time);
        currentDate.setFullYear(today.fullYear);
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
                        flag = 1;
                    }
                    weekCalendarInfo.arr[i].taskList = taskList;
                }
                dateArr = weekCalendarInfo.arr;
            });
        });
        return flag;
    }
    createCell(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isFinished(item)) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(String(item.date));
                                Text.width('14.28%');
                                Text.fontColor("#03A9F4");
                                Text.textAlign(TextAlign.Center);
                                Text.margin({ bottom: "10" });
                            }, Text);
                            Text.pop();
                        });
                    }
                    else if (item.month == this.currMonth) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(String(item.date));
                                Text.width('14.28%');
                                Text.fontColor("#808080");
                                Text.textAlign(TextAlign.Center);
                                Text.margin({ bottom: "10" });
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(String(item.date));
                                Text.width('14.28%');
                                Text.fontColor("#9E9E9E");
                                Text.textAlign(TextAlign.Center);
                                Text.margin({ bottom: "10" });
                            }, Text);
                            Text.pop();
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.dates, forEachItemGenFunction, (item: DateItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
    }
    private changeTopState() {
        if (this.cusTopStateListener) {
            this.cusTopStateListener(this.title, this.hasPre, this.hasNext, (this.currYear == this.today.getFullYear()
                && this.currMonth != this.today.getMonth() || this.currYear != this.today.getFullYear()));
        }
    }
    /**
     * 标题改变时
     */
    onTitleChange() {
        this.changeTopState();
    }
    /**
     * 属性初始化
     */
    initAttr() {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
        // 开始日期
        if (!this.startDate) {
            this.startDate = new Date(1970, 0, 1);
        }
        // 截止日期
        if (!this.endDate) {
            this.endDate = new Date(this.today.getFullYear() + 10, 11, 31);
        }
        if (this.today.getTime() < this.startDate.getTime()) {
            this.startDay.setTime(this.startDate.getTime());
        }
        else if (this.today.getTime() > this.endDate.getTime()) {
            this.startDay.setTime(this.endDate.getTime());
        }
        else {
            this.startDay.setTime(this.today.getTime());
        }
        // 初始化默认选项
        if (this.selectedDates && this.selectedDates.length > 0) {
            for (let index = 0; index < this.selectedDates.length; index++) {
                const element = this.selectedDates[index];
                if (typeof element == "string") {
                    this.selectedDates[index] = new DateItem(new Date(element));
                }
            }
        }
    }
    aboutToAppear() {
        this.initAttr();
        this.calcDatas();
    }
    /**
     * 下一个月
     */
    private nextMonth() {
        this.dates = [];
        const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth());
        this.startDay.setMonth(this.startDay.getMonth() + 1);
        if (this.onMonthChange) {
            this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate);
        }
        this.calcDatas();
    }
    /**
     * 上一个月
     */
    private preMonth() {
        this.dates = [];
        const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth());
        this.startDay.setMonth(this.startDay.getMonth() - 1);
        if (this.onMonthChange) {
            this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate);
        }
        this.calcDatas();
    }
    /**
     * 回到今天
     */
    private backToday() {
        this.dates = [];
        const beforDate = new Date(this.startDay.getFullYear(), this.startDay.getMonth());
        this.startDay.setFullYear(this.today.getFullYear(), this.today.getMonth());
        if (this.onMonthChange) {
            this.onMonthChange(new Date(this.startDay.getFullYear(), this.startDay.getMonth()), beforDate);
        }
        this.calcDatas();
    }
    /**
     * 具体计算
     */
    private calcDatas() {
        const startDay = this.startDay;
        this.currMonth = startDay.getMonth();
        this.currYear = startDay.getFullYear();
        this.title = `${startDay.getFullYear()}年${startDay.getMonth() + 1}月`;
        startDay.setDate(1);
        if (this.startDate && (startDay.getFullYear() < this.startDate.getFullYear()
            || (startDay.getFullYear() == this.startDate.getFullYear() && startDay.getMonth() <= this.startDate.getMonth()))) {
            this.hasPre = false;
        }
        else {
            this.hasPre = true;
        }
        if (this.endDate && this.startDate && (startDay.getFullYear() > this.endDate.getFullYear()
            || (startDay.getFullYear() == this.startDate.getFullYear() && startDay.getMonth() >= this.endDate.getMonth()))) {
            this.hasNext = false;
        }
        else {
            this.hasNext = true;
        }
        // 计算第一个月
        // 获取第一个月总天数
        let endDay: Date = new Date(startDay.getFullYear(), startDay.getMonth() + 1, 0, 23, 59, 59);
        let tempDate: Date = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
        const count = endDay.getDate();
        const preCount = startDay.getDay();
        const nextCount = 6 - endDay.getDay();
        const finilCount = count + preCount + nextCount;
        // 补齐上一个月
        tempDate.setDate(tempDate.getDate() - preCount);
        // 添加日期
        for (let index = 0; index < finilCount; index++) {
            let item = new DateItem(tempDate, (index < preCount ? true : false) || (this.startDate && (this.startDate.getTime() > tempDate.getTime())), (index >= preCount + count ? true : false) || (this.endDate && (this.endDate.getTime() < tempDate.getTime())));
            if (this.reBuildDateItem) {
                this.reBuildDateItem(item);
            }
            this.dates.push(item);
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width("100%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cusTopLayout) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.cusTopLayout.bind(this)(() => {
                        this.preMonth();
                    }, () => {
                        this.nextMonth();
                    }, () => {
                        this.backToday();
                    }, this);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.alignItems(VerticalAlign.Center);
                        Row.width("100%");
                        Row.height(this.titleHeight);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.onClick(() => {
                            // 切换回主页
                            router.back();
                        });
                        Button.width({ "id": 16777374, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.height({ "id": 16777366, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777328, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.fontColor({ "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.margin({ top: { "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.justifyContent(FlexAlign.Center);
                        Column.height("100%");
                        Column.aspectRatio(1);
                        Column.onClick(() => {
                            if (this.hasPre) {
                                this.preMonth();
                            }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.titleLeftLayout) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.titleLeftLayout.bind(this)(this.hasPre, this);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777407, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                    Image.width(18);
                                    Image.fillColor(this.hasPre ? this.itemFontColor : this.disabledFontColor);
                                    Image.rotate({ z: 1, angle: Const.DEFAULT_180 });
                                    Image.aspectRatio(1);
                                }, Image);
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.titleCenterLayout) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.titleCenterLayout.bind(this)(this);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.title);
                                    Text.fontSize(this.titleFontSize);
                                    Text.fontColor(this.titleFontColor);
                                }, Text);
                                Text.pop();
                                Row.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.justifyContent(FlexAlign.Center);
                        Column.height("100%");
                        Column.aspectRatio(1);
                        Column.onClick(() => {
                            if (this.hasNext) {
                                this.nextMonth();
                            }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.titleRightLayout) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.titleRightLayout.bind(this)(this.hasNext, this);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777407, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                    Image.fillColor(this.hasNext ? this.itemFontColor : this.disabledFontColor);
                                    Image.width(18);
                                    Image.aspectRatio(1);
                                }, Image);
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星期title
            Row.create();
            // 星期title
            Row.backgroundColor(this.weekTitleBackgroundColor);
            // 星期title
            Row.alignItems(VerticalAlign.Center);
            // 星期title
            Row.height(this.weekTitleHeight);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.createWeekTitle.bind(this)(item, this);
            };
            this.forEachUpdateFunction(elmtId, this.weeks, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 星期title
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width("100%");
        }, Flex);
        this.createCell.bind(this)(this);
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MonthCalendar";
    }
}
registerNamedRoute(() => new MonthCalendar(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/MonthCalendar", pageFullPath: "entry/src/main/ets/pages/MonthCalendar", integratedHsp: "false" });
