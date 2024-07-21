if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WeekCalendar_Params {
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
import router from "@ohos:router";
export const WEEK_DAY_WIDTH: number = 100 / Const.WEEK_DAY_NUM;
const DEFAULT_SCROLL_WIDTH = 336; // default calendar width
const DEFAULT_SCROLL_PERCENT = 0.934; // default calendar width percent
class WeekCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.homeStore = new HomeStore(new Date());
        this.currentPage = 1;
        this.scroller = new Scroller();
        this.scrollWidth = DEFAULT_SCROLL_WIDTH;
        this.isLoadMore = false;
        this.isPageScroll = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WeekCalendar_Params) {
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
    updateStateVars(params: WeekCalendar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private homeStore: HomeStore;
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
            return { "id": 16777452, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        if (finNum === (item.dayInfo?.targetTaskNum || 0)) {
            return { "id": 16777449, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        return { "id": 16777451, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    }
    MonthViewButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.onClick(() => {
                // 切换回主页
                router.pushUrl({
                    url: 'pages/MainPage'
                });
            });
            Button.width({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.height({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.fontColor({ "id": 16777339, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.fontSize({ "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.margin({ top: { "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Button);
        Button.pop();
    }
    ArrowIcon(isRight: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => isRight ?
                WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, this.homeStore, this.scroller) :
                WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, this.homeStore, this.currentPage, this.scroller));
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777455, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width({ "id": 16777375, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_420);
            Row.padding(Const.THOUSANDTH_33);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.borderRadius({ "id": 16777361, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777339, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width(Const.THOUSANDTH_1000);
            Column.height(Const.THOUSANDTH_1000);
            Column.padding({ top: Const.THOUSANDTH_50, bottom: Const.THOUSANDTH_120 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.ArrowIcon.bind(this)(false, this);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, { title: this.homeStore.dateTitle, fontSize: { "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalendarPage.ets", line: 101 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.homeStore.dateTitle,
                            fontSize: { "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
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
        this.MonthViewButton.bind(this)(this);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.scrollBar(BarState.Off);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.onScrollStop(() => this.onScrollEndAction());
            Scroll.onScrollEdge((event) => this.onScrollEdgeAction(event));
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(`${WEEK_DAY_WIDTH}%`);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.onClick(() => WeekCalendarMethods.calenderItemClickAction(item, index, this.homeStore));
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.weekTitle);
                    Text.fontSize({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontWeight(Const.FONT_WEIGHT_500);
                    Text.fontColor(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777337, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontFamily({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.opacity(Const.OPACITY_6);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.margin({ top: Const.DEFAULT_2, bottom: { "id": 16777367, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Divider.width({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Divider.color(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777339, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                }, Divider);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.getProgressImg(item));
                    Image.height({ "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Image.objectFit(ImageFit.Contain);
                    Image.margin({ top: Const.THOUSANDTH_80 });
                }, Image);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.homeStore.dateArr, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
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
    static getEntryName(): string {
        return "WeekCalendar";
    }
}
registerNamedRoute(() => new WeekCalendar(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CalendarPage", pageFullPath: "entry/src/main/ets/pages/CalendarPage", integratedHsp: "false" });