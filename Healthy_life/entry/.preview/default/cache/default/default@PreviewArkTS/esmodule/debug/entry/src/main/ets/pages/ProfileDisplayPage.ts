if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileDisplayPage_Params {
    nickname?: string;
    signature?: string;
    userID?: number;
    gender?: string;
    birthdate?: string;
    Height?: string;
    Weight?: string;
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import UserInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/UserInfoApi";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import type { UserProfileItem } from '../model/TaskInitList';
import type UserProfile from '../view/UserBaseInfo';
class ProfileDisplayPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.__signature = new ObservedPropertySimplePU(Const.SIGNATURE, this, "signature");
        this.__userID = new ObservedPropertySimplePU(Const.ZERO, this, "userID");
        this.__gender = new ObservedPropertySimplePU('保密', this, "gender");
        this.__birthdate = new ObservedPropertySimplePU('2001年08月01日', this, "birthdate");
        this.__Height = new ObservedPropertySimplePU('185', this, "Height");
        this.__Weight = new ObservedPropertySimplePU('140', this, "Weight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileDisplayPage_Params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.userID !== undefined) {
            this.userID = params.userID;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
        }
        if (params.birthdate !== undefined) {
            this.birthdate = params.birthdate;
        }
        if (params.Height !== undefined) {
            this.Height = params.Height;
        }
        if (params.Weight !== undefined) {
            this.Weight = params.Weight;
        }
    }
    updateStateVars(params: ProfileDisplayPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__userID.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__birthdate.purgeDependencyOnElmtId(rmElmtId);
        this.__Height.purgeDependencyOnElmtId(rmElmtId);
        this.__Weight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__userID.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__birthdate.aboutToBeDeleted();
        this.__Height.aboutToBeDeleted();
        this.__Weight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __userID: ObservedPropertySimplePU<number>;
    get userID() {
        return this.__userID.get();
    }
    set userID(newValue: number) {
        this.__userID.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __birthdate: ObservedPropertySimplePU<string>;
    get birthdate() {
        return this.__birthdate.get();
    }
    set birthdate(newValue: string) {
        this.__birthdate.set(newValue);
    }
    private __Height: ObservedPropertySimplePU<string>;
    get Height() {
        return this.__Height.get();
    }
    set Height(newValue: string) {
        this.__Height.set(newValue);
    }
    private __Weight: ObservedPropertySimplePU<string>;
    get Weight() {
        return this.__Weight.get();
    }
    set Weight(newValue: string) {
        this.__Weight.set(newValue);
    }
    onInit() {
        this.loadUserProfile();
    }
    loadUserProfile() {
        UserInfoApi.query(this.userID, (result: UserProfile) => {
            if (result) {
                this.userID = result.userID;
                this.nickname = result.nickname;
                this.signature = result.signature;
                this.gender = result.gender;
                this.birthdate = result.birthdate;
                this.Height = result.Height;
                this.Weight = result.Weight;
            }
            else {
                Logger.error('MineIndex', 'Failed to load user profile');
            }
        });
    }
    navigateToEditProfile() {
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
            url: 'pages/ProfileEditPage',
            params: profile
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(59:5)");
            Column.padding(16);
            Column.backgroundColor({ "id": 16777354, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // userIcon
            Image.create({ "id": 16777384, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(61:7)");
            // userIcon
            Image.objectFit(ImageFit.Contain);
            // userIcon
            Image.height({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.margin({ top: { "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(67:7)");
            Column.width({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.height({ "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.margin({ top: { "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.border({ radius: { "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777348, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('LV.7');
            Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(68:9)");
            Text.fontSize({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor({ "id": 16777349, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Const.LIST_ITEM_SPACE });
            List.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(80:7)");
        }, List);
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(81:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`昵称: ${this.nickname}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(82:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(89:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`性别: ${this.gender}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(90:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(97:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`个性签名: ${this.signature}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(98:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20, bottom: 30 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(105:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`生日: ${this.birthdate}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(106:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(113:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`身高(厘米): ${this.Height}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(114:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(121:9)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`体重(斤): ${this.Weight}`);
                    Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(122:11)");
                    Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777362, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.margin({ top: 20, left: 20, right: 20 });
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(130:7)");
            Button.width(Const.THOUSANDTH_800);
            Button.height(Const.DEFAULT_48);
            Button.backgroundColor({ "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/ProfileEditPage',
                });
            });
            Button.position({
                x: Const.THOUSANDTH_100,
                y: Const.THOUSANDTH_800
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777406, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/ProfileDisplayPage.ets(131:9)");
            Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777341, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProfileDisplayPage";
    }
}
registerNamedRoute(() => new ProfileDisplayPage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/ProfileDisplayPage", pageFullPath: "entry/src/main/ets/pages/ProfileDisplayPage", integratedHsp: "false" });
