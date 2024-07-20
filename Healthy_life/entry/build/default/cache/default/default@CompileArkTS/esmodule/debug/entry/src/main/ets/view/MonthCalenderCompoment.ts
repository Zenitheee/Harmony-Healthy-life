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
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import { sameDate } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import DayInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/DayInfo";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { isReachNewAchievement, ACHIEVEMENT_LEVEL_KEY } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { TaskMapById, ACHIEVEMENT_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type { ITaskItem } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import { dateToStr, weekDateFormat } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { WeekDateModel, initializeOnStartUp, getPreviousWeek, WEEK_DAY_NUM } from "@bundle:com.example.healthy_life/entry/ets/model/WeekCalendarModel";
import DatabaseApi from "@bundle:com.example.healthy_life/entry/ets/model/DatabaseModel";
import TaskInfoTableApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi";
import DayInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/DayInfoApi";
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
import type GlobalInfo from '../viewmodel/GlobalInfo';
import type WeekCalendarInfo from '../viewmodel/WeekCalendarInfo';
import type AchievementInfo from '../viewmodel/AchievementInfo';
export class HomeStore {
    public currentDate: Date;
    public dateArr: Array<WeekDateModel> = []; // data source list
    public selectedDay: number; // selected day of on week
    public showDate: number;
    public dateTitle: string;
    public selectedDayInfo: WeekDateModel = new WeekDateModel('', '', new Date()); // task info on selected day
    constructor(currentDate: Date) {
        this.currentDate = currentDate;
        this.showDate = currentDate.getTime();
        this.dateTitle = weekDateFormat(currentDate.getTime());
        this.selectedDay = (new Date().getDay() + WEEK_DAY_NUM - 1) % WEEK_DAY_NUM;
    }
    public initData() {
        let weekCalendarInfo: WeekCalendarInfo = initializeOnStartUp(this.currentDate);
        this.dateArr = weekCalendarInfo.arr;
        Logger.info('this.currentDate', this.currentDate.toDateString());
        Logger.info('initWeekData dateArr', JSON.stringify(weekCalendarInfo.strArr));
        // get data form db
        DatabaseApi.query(dateToStr(new Date()), (taskList: TaskInfo[], dayInfo: DayInfo) => {
            Logger.info('Current Day Task Info: ', JSON.stringify(taskList));
            DayInfoApi.queryList(weekCalendarInfo.strArr, (res: DayInfo[]) => {
                let tempList = res.concat(dayInfo);
                Logger.info('initDayInfoList: ', JSON.stringify(res));
                for (let i = 0; i < this.dateArr.length; i++) {
                    let tempDayInfo = tempList.find((item: DayInfo) => item.date === this.dateArr[i].dateStr) || new DayInfo(this.dateArr[i].dateStr, 0, 0);
                    weekCalendarInfo.arr[i].dayInfo = tempDayInfo;
                    if (this.dateArr[i].dateStr === dateToStr(new Date(this.showDate))) {
                        // get tasks of showDate
                        weekCalendarInfo.arr[i].taskList = taskList;
                    }
                }
                this.dateArr = weekCalendarInfo.arr;
                setTimeout(() => {
                    this.setSelectedShowDate(this.showDate);
                }, 0);
            });
        });
    }
    public getPreWeekData(date: Date, callback: Function) {
        let weekCalendarInfo: WeekCalendarInfo = getPreviousWeek(date);
        // get data form db
        DayInfoApi.queryList(weekCalendarInfo.strArr, (res: DayInfo[]) => {
            Logger.info('getPreWeekData->DayInfoList: ', JSON.stringify(res));
            if (res.length > 0) {
                for (let i = 0; i < weekCalendarInfo.arr.length; i++) {
                    let dayInfo = res.find((item) => item.date === weekCalendarInfo.arr[i].dateStr);
                    if (dayInfo) {
                        weekCalendarInfo.arr[i].dayInfo = dayInfo;
                    }
                }
            }
            this.dateArr = weekCalendarInfo.arr.concat(...this.dateArr);
            callback();
        });
    }
    // check is current day
    public checkCurrentDay(): boolean {
        return dateToStr(new Date()) === this.selectedDayInfo?.dateStr;
    }
    public updateSelectedDayInfo(selectedDayInfo: WeekDateModel) {
        Logger.debug('updateSelectedDayInfo', JSON.stringify(selectedDayInfo));
        if (selectedDayInfo.taskList?.length === 0) {
            // get data form db
            TaskInfoTableApi.query(selectedDayInfo.dateStr, true, (res: TaskInfo[]) => {
                Logger.info('Selected TaskInfoList: ', JSON.stringify(res));
                selectedDayInfo.taskList = res;
                this.dateArr = this.dateArr.map((item: WeekDateModel) => {
                    if (item.dateStr === selectedDayInfo.dateStr) {
                        let taskListStr = JSON.stringify(res);
                        item.taskList = JSON.parse(taskListStr);
                        return item;
                    }
                    else {
                        return item;
                    }
                });
                this.selectedDayInfo = selectedDayInfo;
            });
        }
        else {
            this.selectedDayInfo = selectedDayInfo;
        }
        Logger.info("selectedDayTaskInfo: ", JSON.stringify(selectedDayInfo.taskList));
    }
    public updateTaskInfoList(editedTaskInfo: ITaskItem) {
        if (editedTaskInfo?.taskID) {
            // edited task
            let taskID = editedTaskInfo.taskID;
            let targetValue = editedTaskInfo.targetValue;
            let isAlarm = editedTaskInfo.isAlarm;
            let frequency = editedTaskInfo.frequency;
            let startTime = editedTaskInfo.startTime;
            let endTime = editedTaskInfo.endTime;
            let isOpen = editedTaskInfo.isOpen;
            let isDone = editedTaskInfo.isDone;
            let finValue = editedTaskInfo.finValue;
            let task = new TaskInfo(0, dateToStr(new Date()), taskID, targetValue, isAlarm, startTime, endTime, frequency, isDone, finValue, isOpen);
            this.dateArr = this.dateArr.map((item: WeekDateModel) => {
                if (task.date === item.dateStr) {
                    Logger.info('item', JSON.stringify(item));
                    let taskList: TaskInfo[] = item.taskList;
                    const dayInfo: DayInfo = item.dayInfo;
                    if (editedTaskInfo.isOpen) {
                        // add task
                        taskList = taskList.filter((taskItem) => taskItem.taskID != taskID)
                            .concat(task)
                            .sort((a, b) => a.taskID - b.taskID);
                        let count: number = 0;
                        taskList.forEach((taskItem: TaskInfo) => {
                            if (taskItem.isDone) {
                                count++;
                            }
                        });
                        if (count > dayInfo.finTaskNum) {
                            dayInfo.finTaskNum = count;
                        }
                    }
                    else {
                        // delete task
                        let taskIndex = taskList.findIndex((taskItem) => taskItem.taskID === taskID);
                        Logger.info('taskList[taskIndex]', JSON.stringify(taskList[taskIndex]));
                        if (taskList[taskIndex]?.isDone) {
                            dayInfo.finTaskNum -= 1;
                        }
                        taskList = taskList.filter((taskItem) => taskItem.taskID != taskID);
                    }
                    dayInfo.targetTaskNum = taskList.length;
                    if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
                        dayInfo.finTaskNum = dayInfo.targetTaskNum;
                    }
                    DayInfoApi.updateData(dayInfo, () => {
                    });
                    Logger.debug("tempDayInfo", JSON.stringify(dayInfo));
                    let weekDateModelStr = JSON.stringify(item);
                    let currentDayInfo: WeekDateModel = JSON.parse(weekDateModelStr);
                    currentDayInfo.date = item.date;
                    currentDayInfo.taskList = taskList;
                    currentDayInfo.dayInfo = dayInfo;
                    if (this.checkCurrentDay()) {
                        this.selectedDayInfo = currentDayInfo;
                    }
                    return currentDayInfo;
                }
                return item;
            }).slice(0);
        }
    }
    public setSelectedShowDate(showDateTime: number) {
        if (showDateTime > new Date().getTime()) {
            return;
        }
        this.showDate = showDateTime;
        this.dateTitle = weekDateFormat(this.showDate);
        let selectedInfo = this.dateArr.find((item: WeekDateModel) => item.dateStr === dateToStr(new Date(showDateTime)));
        if (selectedInfo) {
            this.updateSelectedDayInfo(selectedInfo);
        }
        Logger.info('dateTitle', this.dateTitle);
    }
    public getDonePercent(): string {
        let dayInfo = this.selectedDayInfo?.dayInfo;
        Logger.debug("dayInfo", JSON.stringify(dayInfo));
        if (dayInfo && (dayInfo?.finTaskNum || 0) > 0) {
            if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
                return `${Const.DEFAULT_100}`;
            }
            return `${Math.ceil(dayInfo.finTaskNum / dayInfo.targetTaskNum * Const.DEFAULT_100)}`;
        }
        return '0';
    }
    public getTaskListOfDay(): TaskInfo[] {
        Logger.info('getTaskListOfDay', JSON.stringify(this.selectedDayInfo));
        if (this.selectedDayInfo && this.selectedDayInfo.taskList.length > 0) {
            return this.selectedDayInfo.taskList;
        }
        return [];
    }
    public async taskClock(taskInfo: TaskInfo) {
        let taskItem = await this.updateTask(taskInfo);
        let dateStr = this.selectedDayInfo?.dateStr;
        if (!taskItem) {
            return {
                achievementLevel: 0,
                showAchievement: false
            } as AchievementInfo;
        }
        this.selectedDayInfo.taskList = this.selectedDayInfo.taskList.map((item) => {
            return item.taskID === taskItem?.taskID ? taskItem : item;
        });
        let achievementLevel: number = 0;
        if (taskItem.isDone) {
            let dayInfo = await this.updateDayInfo();
            if (dayInfo && dayInfo?.finTaskNum === dayInfo?.targetTaskNum) {
                achievementLevel = await this.updateAchievement(this.selectedDayInfo.dayInfo);
            }
        }
        this.dateArr = this.dateArr.map((item: WeekDateModel) => dateStr === item.dateStr ? this.selectedDayInfo : item);
        return {
            achievementLevel: achievementLevel,
            showAchievement: ACHIEVEMENT_LEVEL_LIST.includes(achievementLevel)
        } as AchievementInfo;
    }
    // 更新当天任务列表
    updateTask(task: TaskInfo): Promise<TaskInfo> {
        return new Promise((resolve, reject) => {
            let taskID = task.taskID;
            let targetValue = task.targetValue;
            let finValue = task.finValue;
            let updateTask = new TaskInfo(task.id, task.date, taskID, targetValue, task.isAlarm, task.startTime, task.endTime, task.frequency, task.isDone, finValue, task.isOpen);
            // 任务步长
            let step = TaskMapById[taskID - 1].step;
            let hasExceed = updateTask.isDone;
            // 任务步长为0 打卡一次即完成该任务
            if (step === 0) {
                updateTask.isDone = true;
                updateTask.finValue = targetValue;
            }
            else { // 任务步长非0 打卡一次 步长与上次打卡进度累加
                let value = Number(finValue) + step;
                // 判断任务是否完成
                updateTask.isDone = updateTask.isDone || value >= Number(targetValue);
                updateTask.finValue = updateTask.isDone ? targetValue : `${value}`;
            }
            // 更新数据库
            TaskInfoTableApi.updateDataByDate(updateTask, (res: number) => {
                if (!res || hasExceed) {
                    Logger.error('taskClock-updateTask', JSON.stringify(res));
                    reject(res);
                }
                resolve(updateTask);
            });
        });
    }
    updateDayInfo(): Promise<DayInfo> {
        let dayInfo: DayInfo = this.selectedDayInfo.dayInfo;
        dayInfo.finTaskNum += 1;
        dayInfo.targetTaskNum = this.selectedDayInfo.taskList.length;
        return new Promise((resolve, reject) => {
            DayInfoApi.updateData(dayInfo, (res: number) => {
                if (!res) {
                    Logger.error('taskClock-updateDayInfo', JSON.stringify(res));
                    reject(res);
                }
                Logger.info('taskClock-updateDayInfo', JSON.stringify(dayInfo));
                // 同步界面数据
                let dayInfoStr = JSON.stringify(dayInfo);
                this.selectedDayInfo.dayInfo = JSON.parse(dayInfoStr);
                resolve(dayInfo);
            });
        });
    }
    updateAchievement(dayInfo: DayInfo): Promise<number> {
        Logger.debug('taskClock-updateAchievement', JSON.stringify(dayInfo));
        return new Promise((resolve, reject) => {
            let preDay = new Date();
            preDay.setDate(preDay.getDate() - 1);
            preDay = new Date(preDay);
            let preDayStr = dateToStr(preDay);
            Logger.info('taskClock-updateAchievement-1', `${preDayStr}`);
            DayInfoApi.query(preDayStr, (res: DayInfo) => {
                Logger.info('taskClock-updateAchievement-2', JSON.stringify(res));
                let isReset = res?.date === '' || res?.targetTaskNum > res?.finTaskNum;
                GlobalInfoApi.query((res: GlobalInfo) => {
                    Logger.info('taskClock-globalInfoApi', JSON.stringify(res));
                    let achievementInfo = res;
                    isReset ? (achievementInfo.checkInDays = 1) : (achievementInfo.checkInDays += 1);
                    let isNewAchieve = isReachNewAchievement(achievementInfo);
                    if (isNewAchieve) {
                        AppStorage.setOrCreate(ACHIEVEMENT_LEVEL_KEY, achievementInfo.checkInDays);
                        achievementInfo.achievements = achievementInfo.achievements + ',' + achievementInfo.checkInDays;
                    }
                    GlobalInfoApi.updateData(achievementInfo, (res: number) => {
                        if (!res) {
                            Logger.error('taskClock-updateAchievement', JSON.stringify(res));
                            reject(res);
                        }
                        Logger.debug('taskClock-updateAchievement', JSON.stringify(achievementInfo));
                        isNewAchieve ? resolve(achievementInfo.checkInDays) : resolve(0);
                    });
                });
            });
        });
    }
}
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
            return { "id": 16777452, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        if (finNum === (item.dayInfo?.targetTaskNum || 0)) {
            return { "id": 16777449, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        return { "id": 16777451, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    }
    ArrowIcon(isRight: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => isRight ?
                WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.scroller) :
                WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.currentPage, this.scroller));
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
                    let componentCall = new HealthText(this, { title: this.homeStore.dateTitle, fontSize: { "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/MonthCalenderCompoment.ets", line: 377 });
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
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 将每周的数据分成多行显示
            ForEach.create();
            const forEachItemGenFunction = (_item, weekIndex?: number) => {
                const week = _item;
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
                            Column.onClick(() => WeekCalendarMethods.calenderItemClickAction(item, index, ObservedObject.GetRawObject(this.homeStore)));
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
