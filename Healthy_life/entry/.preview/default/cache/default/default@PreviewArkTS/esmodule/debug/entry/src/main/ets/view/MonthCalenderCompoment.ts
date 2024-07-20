if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MonthCalendarComponent_Params {
    homeStore?: HomeStore;
    currentPage?: number;
    scroller?: Scroller;
    scrollWidth?: number;
    isLoadMore?: boolean;
    isPageScroll?: boolean;
}
import display from "@ohos:display";
import WeekCalendarMethods from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CalendarViewModel";
import type { ScrollTo } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CalendarViewModel";
import { HomeStore } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/HomeViewModel";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import type { WeekDateModel } from '../model/WeekCalendarModel';
import { sameDate } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
export const WEEK_DAY_WIDTH: number = 100 / Const.WEEK_DAY_NUM;
const DEFAULT_SCROLL_WIDTH = 336; // default calendar width
const DEFAULT_SCROLL_PERCENT = 0.934; // default calendar width percent
export class MonthCalendarComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeStore = new ObservedPropertyObjectPU(new HomeStore(new Date()), this, "homeStore");
        this.currentPage = 1;
        this.scroller = new Scroller();
        this.scrollWidth = DEFAULT_SCROLL_WIDTH;
        this.isLoadMore = false;
        this.isPageScroll = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MonthCalendarComponent_Params) {
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollWidth !== undefined) {
            this.scrollWidth = params.scrollWidth;
        }
        if (params.isLoadMore !== undefined) {
            this.isLoadMore = params.isLoadMore;
        }
        if (params.isPageScroll !== undefined) {
            this.isPageScroll = params.isPageScroll;
        }
    }
    updateStateVars(params: MonthCalendarComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // @Link homeStore: HomeStore;
    private __homeStore: ObservedPropertyObjectPU<HomeStore>;
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    private currentPage: number;
    private scroller: Scroller;
    private scrollWidth: number;
    private isLoadMore: boolean;
    private isPageScroll: boolean;
    aboutToAppear() {
        try {
            let displayClass = display.getDefaultDisplaySync();
            this.scrollWidth = displayClass.width / displayClass.densityPixels * DEFAULT_SCROLL_PERCENT;
            Logger.info('HomeIndex', 'get the window scrollWidth: ' + this.scrollWidth);
        }
        catch (err) {
            Logger.error('HomeIndex->onScrollEnd', JSON.stringify(err));
        }
        this.homeStore.setSelectedShowDate(new Date().getTime());
    }
    getProgressImg(item: WeekDateModel): Resource {
        let finNum = item.dayInfo?.finTaskNum || 0;
        if (finNum === 0) {
            return { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        if (finNum === (item.dayInfo?.targetTaskNum || 0)) {
            return { "id": 16777351, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        return { "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    }
    ArrowIcon(isRight: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(53:5)");
            Row.width({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => isRight ?
                WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.scroller) :
                WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.currentPage, this.scroller));
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(54:7)");
            Image.width({ "id": 16777331, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(68:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_420);
            Row.padding(Const.THOUSANDTH_33);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(69:7)");
            Column.borderRadius({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777379, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width(Const.THOUSANDTH_1000);
            Column.height(Const.THOUSANDTH_1000);
            Column.padding({ top: Const.THOUSANDTH_50, bottom: Const.THOUSANDTH_120 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(70:9)");
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.ArrowIcon.bind(this)(false, this);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, { title: this.homeStore.dateTitle, fontSize: { "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/MonthCalenderCompoment.ets", line: 72 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.homeStore.dateTitle,
                            fontSize: { "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.homeStore.dateTitle
                    });
                }
            }, { name: "HealthText" });
        }
        __Common__.pop();
        this.ArrowIcon.bind(this)(true, this);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(78:9)");
            Scroll.scrollBar(BarState.Off);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.onScrollStop(() => this.onScrollEndAction());
            Scroll.onScrollEdge((event) => this.onScrollEdgeAction(event));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(79:11)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 将每周的数据分成多行显示
            ForEach.create();
            const forEachItemGenFunction = (_item, weekIndex?: number) => {
                const week = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(82:15)");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index?: number) => {
                        const item = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(84:19)");
                            Column.width(`${WEEK_DAY_WIDTH}%`);
                            Column.justifyContent(FlexAlign.SpaceBetween);
                            Column.onClick(() => WeekCalendarMethods.calenderItemClickAction(item, index, ObservedObject.GetRawObject(this.homeStore)));
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.weekTitle);
                            Text.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(85:21)");
                            Text.fontSize({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.fontWeight(Const.FONT_WEIGHT_500);
                            Text.fontColor(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777357, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777378, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.fontFamily({ "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.opacity(Const.OPACITY_6);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Divider.create();
                            Divider.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(92:21)");
                            Divider.margin({ top: Const.DEFAULT_2, bottom: { "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                            Divider.width({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Divider.color(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777357, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777379, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Divider);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.getProgressImg(item));
                            Image.debugLine("entry/src/main/ets/view/MonthCalenderCompoment.ets(96:21)");
                            Image.height({ "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.objectFit(ImageFit.Contain);
                            Image.margin({ top: Const.THOUSANDTH_80 });
                        }, Image);
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, week, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getWeeks(this.homeStore.dateArr), forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 将每周的数据分成多行显示
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
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
            let dayModel: WeekDateModel = this.homeStore.dateArr[Const.WEEK_DAY_NUM * page + this.homeStore.selectedDay];
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
    rerender() {
        this.updateDirtyElements();
    }
}
