if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BirthdateEditDialog_Params {
    settingParams?: UserProfileItem;
    controller?: CustomDialogController;
    selectedDate?: Date;
}
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { UserProfileItem } from '../../model/TaskInitList';
export class BirthdateEditDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.selectedDate = new Date('2021-08-08');
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BirthdateEditDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
    }
    updateStateVars(params: BirthdateEditDialog_Params) {
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
    private selectedDate: Date;
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.THOUSANDTH_900);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            DatePicker.create({
                start: new Date('1900-1-1'),
                end: new Date(),
                selected: this.selectedDate
            });
            DatePicker.disappearTextStyle({ color: Color.Gray, font: { size: '16fp', weight: FontWeight.Bold } });
            DatePicker.textStyle({ color: '#ff182431', font: { size: '18fp', weight: FontWeight.Normal } });
            DatePicker.selectedTextStyle({ color: '#ff0000FF', font: { size: '26fp', weight: FontWeight.Regular } });
            DatePicker.onDateChange((value: Date) => {
                this.selectedDate = value;
            });
        }, DatePicker);
        DatePicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.controller.close();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.settingParams.birthdate = this.formatDate(this.selectedDate);
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
