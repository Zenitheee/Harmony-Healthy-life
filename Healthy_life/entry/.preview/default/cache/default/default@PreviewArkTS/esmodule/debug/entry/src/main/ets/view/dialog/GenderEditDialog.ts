if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GenderEditDialog_Params {
    settingParams?: UserProfileItem;
    controller?: CustomDialogController;
    gender_range?: string[];
    currentValue?: string;
}
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { UserProfileItem } from '../../model/TaskInitList';
import { genderRange } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
export class GenderEditDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.gender_range = genderRange();
        this.currentValue = this.settingParams.gender;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GenderEditDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.gender_range !== undefined) {
            this.gender_range = params.gender_range;
        }
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
    }
    updateStateVars(params: GenderEditDialog_Params) {
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
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private gender_range: string[];
    private currentValue: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(14:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(15:7)");
            Column.width(Const.THOUSANDTH_900);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777414, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(16:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextPicker.create({
                range: this.gender_range,
                value: this.settingParams.gender
            });
            TextPicker.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(24:7)");
            TextPicker.height(Const.THOUSANDTH_800);
            TextPicker.onChange((value: string | string[], index: number | number[]) => {
                const textPickerResult: TextPickerResult = {
                    value,
                    index
                };
                this.currentValue =
                    Array.isArray(textPickerResult.value) ? textPickerResult.value[0] : textPickerResult.value;
            });
        }, TextPicker);
        TextPicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(38:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(39:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777341, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.controller.close();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/GenderEditDialog.ets(44:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777341, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.settingParams.gender = this.currentValue;
                this.controller.close();
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
