if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Edit_weight_Params {
    settingParams?: UserProfileItem;
}
interface Edit_height_Params {
    settingParams?: UserProfileItem;
}
interface Edit_birthdate_Params {
    settingParams?: UserProfileItem;
}
interface Edit_gender_Params {
    settingParams?: UserProfileItem;
}
interface Edit_signature_Params {
    settingParams?: UserProfileItem;
}
interface Edit_nickname_Params {
    settingParams?: UserProfileItem;
}
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { UserProfileItem } from '../../model/TaskInitList';
export class Edit_nickname extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_nickname_Params) {
    }
    updateStateVars(params: Edit_nickname_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(10:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777410, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(11:7)");
            TextInput.fontSize(Const.DEFAULT_20);
            TextInput.fontWeight(FontWeight.Medium);
            TextInput.onChange((value) => this.settingParams.nickname = value);
        }, TextInput);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Edit_signature extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_signature_Params) {
    }
    updateStateVars(params: Edit_signature_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(26:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(27:7)");
            TextInput.fontSize(Const.DEFAULT_20);
            TextInput.fontWeight(FontWeight.Medium);
            TextInput.onChange((value) => this.settingParams.signature = value);
        }, TextInput);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Edit_gender extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_gender_Params) {
    }
    updateStateVars(params: Edit_gender_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(43:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777408, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(44:7)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.settingParams.gender);
            Text.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(47:7)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Edit_birthdate extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_birthdate_Params) {
    }
    updateStateVars(params: Edit_birthdate_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(62:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777407, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(63:7)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.settingParams.birthdate);
            Text.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(66:7)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Edit_height extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_height_Params) {
    }
    updateStateVars(params: Edit_height_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(80:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(81:7)");
            TextInput.fontSize(Const.DEFAULT_20);
            TextInput.fontWeight(FontWeight.Medium);
            TextInput.onChange((value) => this.settingParams.Height = value);
        }, TextInput);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Edit_weight extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Edit_weight_Params) {
    }
    updateStateVars(params: Edit_weight_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<UserProfileItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: UserProfileItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(96:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777412, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/EditProfile/ProfileEditListItem.ets(97:7)");
            TextInput.fontSize(Const.DEFAULT_20);
            TextInput.fontWeight(FontWeight.Medium);
            TextInput.onChange((value) => this.settingParams.Weight = value);
        }, TextInput);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
