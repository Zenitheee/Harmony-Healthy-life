if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListInfo_Params {
    userID?: number;
    nickname?: string;
    signature?: string;
    gender?: string;
    birthdate?: string;
    Height?: string;
    Weight?: string;
}
import { MineInfoList } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import type { InfoItem } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import router from "@ohos:router";
import type { UserProfileItem } from '../model/TaskInitList';
export class ListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userID = new SynchedPropertySimpleTwoWayPU(params.userID, this, "userID");
        this.__nickname = new SynchedPropertySimpleTwoWayPU(params.nickname, this, "nickname");
        this.__signature = new SynchedPropertySimpleTwoWayPU(params.signature, this, "signature");
        this.__gender = new SynchedPropertySimpleTwoWayPU(params.gender, this, "gender");
        this.__birthdate = new SynchedPropertySimpleTwoWayPU(params.birthdate, this, "birthdate");
        this.__Height = new SynchedPropertySimpleTwoWayPU(params.Height, this, "Height");
        this.__Weight = new SynchedPropertySimpleTwoWayPU(params.Weight, this, "Weight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListInfo_Params) {
    }
    updateStateVars(params: ListInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userID.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__birthdate.purgeDependencyOnElmtId(rmElmtId);
        this.__Height.purgeDependencyOnElmtId(rmElmtId);
        this.__Weight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userID.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__birthdate.aboutToBeDeleted();
        this.__Height.aboutToBeDeleted();
        this.__Weight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userID: SynchedPropertySimpleTwoWayPU<number>;
    get userID() {
        return this.__userID.get();
    }
    set userID(newValue: number) {
        this.__userID.set(newValue);
    }
    private __nickname: SynchedPropertySimpleTwoWayPU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: SynchedPropertySimpleTwoWayPU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __gender: SynchedPropertySimpleTwoWayPU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __birthdate: SynchedPropertySimpleTwoWayPU<string>;
    get birthdate() {
        return this.__birthdate.get();
    }
    set birthdate(newValue: string) {
        this.__birthdate.set(newValue);
    }
    private __Height: SynchedPropertySimpleTwoWayPU<string>;
    get Height() {
        return this.__Height.get();
    }
    set Height(newValue: string) {
        this.__Height.set(newValue);
    }
    private __Weight: SynchedPropertySimpleTwoWayPU<string>;
    get Weight() {
        return this.__Weight.get();
    }
    set Weight(newValue: string) {
        this.__Weight.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/ListInfo.ets(31:5)");
            List.border({
                radius: {
                    topLeft: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    topRight: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                }
            });
            List.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            List.margin({ top: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.padding({ top: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.flexGrow(1);
            List.clip(true);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.onClick(() => {
                            if (item.id === '1') { // 跳转到个人资料展示页面
                                const profile: UserProfileItem = {
                                    userID: this.userID,
                                    nickname: this.nickname,
                                    signature: this.signature,
                                    gender: this.gender,
                                    birthdate: this.birthdate,
                                    Height: this.Height,
                                    Weight: this.Weight
                                };
                                router.pushUrl({
                                    url: 'pages/ProfileDisplayPage',
                                    params: profile,
                                });
                            }
                            else if (item.id === '2') {
                                router.pushUrl({
                                    url: 'pages/CheckUpdatesPage'
                                });
                            }
                            else {
                                router.pushUrl({
                                    url: 'pages/AboutPage'
                                });
                            }
                        });
                        ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777290, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.debugLine("entry/src/main/ets/view/ListInfo.ets(33:9)");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("entry/src/main/ets/view/ListInfo.ets(34:11)");
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/view/ListInfo.ets(35:13)");
                            Text.fontSize({ "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777377, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("entry/src/main/ets/view/ListInfo.ets(37:13)");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Image);
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, MineInfoList, forEachItemGenFunction, (item: InfoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
