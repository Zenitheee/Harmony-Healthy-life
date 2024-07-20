if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConfirmDialog_Params {
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
export class ConfirmDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new SynchedPropertySimpleOneWayPU(params.message, this, "message");
        this.__onConfirm = new SynchedPropertyObjectOneWayPU(params.onConfirm, this, "onConfirm");
        this.__onCancel = new SynchedPropertyObjectOneWayPU(params.onCancel, this, "onCancel");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConfirmDialog_Params) {
    }
    updateStateVars(params: ConfirmDialog_Params) {
        this.__message.reset(params.message);
        this.__onConfirm.reset(params.onConfirm);
        this.__onCancel.reset(params.onCancel);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__onConfirm.purgeDependencyOnElmtId(rmElmtId);
        this.__onCancel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__onConfirm.aboutToBeDeleted();
        this.__onCancel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __message: SynchedPropertySimpleOneWayPU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __onConfirm: SynchedPropertySimpleOneWayPU<() => void>;
    get onConfirm() {
        return this.__onConfirm.get();
    }
    set onConfirm(newValue: () => void) {
        this.__onConfirm.set(newValue);
    }
    private __onCancel: SynchedPropertySimpleOneWayPU<() => void>;
    get onCancel() {
        return this.__onCancel.get();
    }
    set onCancel(newValue: () => void) {
        this.__onCancel.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/ConfirmDialog.ets(8:5)");
            Column.padding(16);
            Column.backgroundColor("#FFFFFF");
            Column.borderRadius(8);
            Column.shadow({ color: "#000000", radius: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/view/dialog/ConfirmDialog.ets(9:7)");
            Text.fontSize(16);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/ConfirmDialog.ets(13:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("是");
            Button.debugLine("entry/src/main/ets/view/dialog/ConfirmDialog.ets(14:9)");
            Button.onClick(() => {
                this.onConfirm();
            });
            Button.margin({ right: 8 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("否");
            Button.debugLine("entry/src/main/ets/view/dialog/ConfirmDialog.ets(20:9)");
            Button.onClick(() => {
                this.onCancel();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
