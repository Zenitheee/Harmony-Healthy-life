if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentPage?: number;
    editedTaskInfo?: ITaskItem;
    editedTaskID?: string;
    homeStore?: HomeStore;
    tabController?: TabsController;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import notificationManager from "@ohos:notificationManager";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import type { ITaskItem } from '../model/TaskInitList';
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import HomeIndex from "@bundle:com.example.healthy_life/entry/ets/view/HomeComponent";
import { AchievementIndex } from "@bundle:com.example.healthy_life/entry/ets/view/AchievementComponent";
import { MineIndex } from "@bundle:com.example.healthy_life/entry/ets/pages/MinePage";
import { HomeStore } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/HomeViewModel";
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
import type GlobalInfo from '../viewmodel/GlobalInfo';
import { GlobalContext } from "@bundle:com.example.healthy_life/entry/ets/common/utils/GlobalContext";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new ObservedPropertySimplePU(0, this, "currentPage");
        this.__editedTaskInfo = new ObservedPropertyObjectPU(router.getParams() ? (router.getParams() as Record<string, Object>).editTask as ITaskItem : {} as ITaskItem, this, "editedTaskInfo");
        this.__editedTaskID = new ObservedPropertySimplePU('0', this, "editedTaskID");
        this.__homeStore = new ObservedPropertyObjectPU(new HomeStore(new Date()), this, "homeStore");
        this.tabController = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.editedTaskInfo !== undefined) {
            this.editedTaskInfo = params.editedTaskInfo;
        }
        if (params.editedTaskID !== undefined) {
            this.editedTaskID = params.editedTaskID;
        }
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
        if (params.tabController !== undefined) {
            this.tabController = params.tabController;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskID.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__editedTaskInfo.aboutToBeDeleted();
        this.__editedTaskID.aboutToBeDeleted();
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentPage: ObservedPropertySimplePU<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private __editedTaskInfo: ObservedPropertyObjectPU<ITaskItem>;
    get editedTaskInfo() {
        return this.__editedTaskInfo.get();
    }
    set editedTaskInfo(newValue: ITaskItem) {
        this.__editedTaskInfo.set(newValue);
    }
    private __editedTaskID: ObservedPropertySimplePU<string>;
    get editedTaskID() {
        return this.__editedTaskID.get();
    }
    set editedTaskID(newValue: string) {
        this.__editedTaskID.set(newValue);
    }
    private __homeStore: ObservedPropertyObjectPU<HomeStore>;
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    private tabController: TabsController;
    aboutToAppear() {
        notificationManager.requestEnableNotification().then(() => {
            Logger.info('onPageShow', `requestEnableNotification success`);
        }).catch((err: Error) => {
            Logger.error('onPageShow', `requestEnableNotification failed, message is ${err.message}`);
        });
    }
    onPageShow() {
        Logger.info('onPageShow', JSON.stringify(router.getParams()));
        let params = (router.getParams() ? router.getParams() : {}) as Record<string, Object>;
        let result = params.editTask ? params.editTask as string : '{}';
        this.editedTaskInfo = JSON.parse(result);
        this.editedTaskID = JSON.stringify(this.editedTaskInfo);
        if ((GlobalContext.getContext().getObject('isForeground') as boolean)) {
            GlobalContext.getContext().setObject('isForeground', false);
            if (this.homeStore.currentDate.getDate() !== (new Date()).getDate()) {
                GlobalContext.getContext().setObject('taskListChange', true);
                this.homeStore = new HomeStore(new Date());
            }
            this.checkCurrentTime();
        }
    }
    checkCurrentTime() {
        GlobalInfoApi.query((result: GlobalInfo) => {
            let predate = new Date(result.lastDate);
            let date = new Date();
            if (result && date.getTime() < predate.getTime()) {
                AlertDialog.show({
                    title: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    message: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    autoCancel: false,
                    alignment: DialogAlignment.Bottom,
                    offset: { dx: 0, dy: -20 },
                    gridCount: 3,
                    confirm: {
                        value: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        action: () => {
                            (getContext(this) as common.UIAbilityContext).terminateSelf();
                            console.info('Button-clicking callback');
                        }
                    },
                    cancel: () => {
                        console.info('Closed callbacks');
                    }
                });
            }
            else {
                this.homeStore.initData();
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, controller: this.tabController });
            Tabs.scrollable(false);
            Tabs.width(Const.THOUSANDTH_1000);
            Tabs.height(Const.THOUSANDTH_1000);
            Tabs.barWidth(Const.THOUSANDTH_940);
            Tabs.barMode(BarMode.Fixed);
            Tabs.vertical(false);
            Tabs.onChange((index) => {
                this.currentPage = index;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.borderWidth({ bottom: 1 });
                    __Common__.borderColor({ "id": 16777326, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomeIndex(this, { homeStore: this.__homeStore, editedTaskInfo: this.__editedTaskInfo, editedTaskID: this.__editedTaskID }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalenderPage.ets", line: 104 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    homeStore: this.homeStore,
                                    editedTaskInfo: this.editedTaskInfo,
                                    editedTaskID: this.editedTaskID
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HomeIndex" });
                }
                __Common__.pop();
            });
            TabContent.align(Alignment.Start);
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AchievementIndex(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalenderPage.ets", line: 111 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "AchievementIndex" });
                }
            });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.borderWidth({ bottom: 1 });
                    __Common__.borderColor({ "id": 16777326, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MineIndex(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalenderPage.ets", line: 115 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "MineIndex" });
                }
                __Common__.pop();
            });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CalenderPage", pageFullPath: "entry/src/main/ets/pages/CalenderPage", integratedHsp: "false" });
