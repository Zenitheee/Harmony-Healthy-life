if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditProfileDetail_Params {
    broadCast?: BroadCast;
    settingParams?: UserProfileItem;
    isChanged?: boolean;
}
import { Edit_nickname, Edit_signature, Edit_gender, Edit_birthdate, Edit_height, Edit_weight } from "@bundle:com.example.healthy_life/entry/ets/view/EditProfile/ProfileEditListItem";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { BroadCastType } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import type { BroadCast } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import { HealthDataSrcMgr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr";
import type { UserProfileItem } from '../../model/TaskInitList';
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import { ProfileDialogView } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/ProfileDialogView";
import { formatParams_Profile, updateProfile } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
import { GlobalContext } from "@bundle:com.example.healthy_life/entry/ets/common/utils/GlobalContext";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import UserProfile from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
export default class EditProfileDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast, false);
        this.__settingParams = new ObservedPropertyObjectPU(router.getParams() as UserProfileItem, this, "settingParams");
        this.addProvidedVar("settingParams", this.__settingParams, false);
        this.isChanged = false;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("settingParams", this.onParamsChanged);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditProfileDetail_Params) {
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.settingParams !== undefined) {
            this.settingParams = params.settingParams;
        }
        if (params.isChanged !== undefined) {
            this.isChanged = params.isChanged;
        }
    }
    updateStateVars(params: EditProfileDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__broadCast.purgeDependencyOnElmtId(rmElmtId);
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__broadCast.aboutToBeDeleted();
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __broadCast: ObservedPropertyObjectPU<BroadCast>;
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue: BroadCast) {
        this.__broadCast.set(newValue);
    }
    private __settingParams: ObservedPropertyObjectPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    private isChanged: boolean;
    onParamsChanged() {
        this.isChanged = true;
    }
    backIndexParams(): string {
        return formatParams_Profile(this.settingParams);
    }
    finishProfileEdit() {
        if (this.isChanged) {
            let userInfo: UserProfile = new UserProfile(this.settingParams.userID, this.settingParams.nickname, this.settingParams.gender, this.settingParams.signature, this.settingParams.birthdate, this.settingParams.Height, this.settingParams.Weight);
            updateProfile(userInfo).then((res: number) => {
                GlobalContext.getContext().setObject('userProfileChange', true);
                router.back({
                    url: 'pages/ProfileDisplayPage',
                    params: {
                        editProfile: this.backIndexParams(),
                    }
                });
                Logger.info('finishProfileEdit', JSON.stringify(res));
            }).catch((error: Error) => {
                promptAction.showToast({
                    message: 'Profile update failed: ' + error.message
                });
                Logger.error('finishProfileEdit', 'Profile update failed: ' + JSON.stringify(error));
            });
            return;
        }
        router.back({
            url: 'pages/ProfileEditPage',
        });
    }
    aboutToAppear(): void {
        this.broadCast.off(BroadCastType.SHOW_EDIT_GENDER_DIALOG, () => {
        });
        this.broadCast.off(BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG, () => {
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(81:5)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(82:7)");
            Column.width(Const.THOUSANDTH_1000);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Const.LIST_ITEM_SPACE });
            List.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(83:9)");
            List.width(Const.THOUSANDTH_940);
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(84:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_nickname(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 85 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_nickname" });
                }
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(89:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_signature(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 90 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_signature" });
                }
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_EDIT_GENDER_DIALOG);
                });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(94:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_gender(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 95 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_gender" });
                }
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG);
                });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(103:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_birthdate(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 104 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_birthdate" });
                }
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(112:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_height(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 113 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_height" });
                }
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
                ListItem.backgroundColor({ "id": 16777363, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(117:11)");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Edit_weight(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 118 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Edit_weight" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(125:9)");
            Button.width(Const.THOUSANDTH_800);
            Button.height(Const.DEFAULT_48);
            Button.backgroundColor({ "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.finishProfileEdit();
            });
            Button.position({
                x: Const.THOUSANDTH_100,
                y: Const.THOUSANDTH_800
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets(126:11)");
            Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777341, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Button.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileDialogView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/EditProfile/ProfileDetailComponent.ets", line: 139 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileDialogView" });
        }
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
