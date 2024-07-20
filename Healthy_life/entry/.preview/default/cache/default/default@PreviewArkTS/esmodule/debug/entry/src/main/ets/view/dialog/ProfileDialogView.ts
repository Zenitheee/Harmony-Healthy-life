if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileDialogView_Params {
    isShow?: boolean;
    broadCast?: BroadCast;
    // gender edit dialog
    genderEditDialog?: CustomDialogController;
    // birthdate edit dialog
    birthdateEditDialog?: CustomDialogController;
}
import { BroadCastType } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import type { BroadCast } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { GenderEditDialog } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/GenderEditDialog";
import { BirthdateEditDialog } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/BirthDateEditDialog";
export class ProfileDialogView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new ObservedPropertySimplePU(false, this, "isShow");
        this.__broadCast = this.initializeConsume("broadCast", "broadCast");
        this.genderEditDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new GenderEditDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/dialog/ProfileDialogView.ets", line: 14 });
                jsDialog.setController(this.
                // gender edit dialog
                genderEditDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: Const.ZERO, dy: Const.MINUS_20 }
        }, this);
        this.birthdateEditDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new BirthdateEditDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/dialog/ProfileDialogView.ets", line: 22 });
                jsDialog.setController(this.
                // birthdate edit dialog
                birthdateEditDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: Const.ZERO, dy: Const.MINUS_20 }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileDialogView_Params) {
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.genderEditDialog !== undefined) {
            this.genderEditDialog = params.genderEditDialog;
        }
        if (params.birthdateEditDialog !== undefined) {
            this.birthdateEditDialog = params.birthdateEditDialog;
        }
    }
    updateStateVars(params: ProfileDialogView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__broadCast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__broadCast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isShow: ObservedPropertySimplePU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __broadCast: ObservedPropertyAbstractPU<BroadCast>;
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue: BroadCast) {
        this.__broadCast.set(newValue);
    }
    // gender edit dialog
    private genderEditDialog: CustomDialogController;
    // birthdate edit dialog
    private birthdateEditDialog: CustomDialogController;
    aboutToAppear() {
        // gender edit dialog
        Logger.debug('CustomDialogView', 'aboutToAppear');
        this.broadCast.on(BroadCastType.SHOW_EDIT_GENDER_DIALOG, () => {
            this.genderEditDialog.open();
        });
        // birthdate edit dialog
        this.broadCast.on(BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG, () => {
            this.birthdateEditDialog.open();
        });
    }
    aboutToDisappear() {
        Logger.debug('CustomDialogView', 'aboutToDisappear');
    }
    initialRender() {
    }
    rerender() {
        this.updateDirtyElements();
    }
}
