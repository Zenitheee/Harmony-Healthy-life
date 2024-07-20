if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SplashIndex_Params {
    // 上下文对象，用于获取应用程序的上下文
    context?: common.UIAbilityContext;
    // 自定义对话框控制器，用于显示用户隐私对话框
    dialogController?: CustomDialogController;
}
import type common from "@ohos:app.ability.common";
import router from "@ohos:router";
import preferences from "@ohos:data.preferences";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import UserPrivacyDialog from "@bundle:com.example.healthy_life/entry/ets/view/dialog/UserPrivacyDialog";
// app preferences name
const H_STORE: string = 'healthAppStore';
const IS_PRIVACY: string = 'isPrivacy';
class SplashIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = getContext(this) as common.UIAbilityContext;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new UserPrivacyDialog(this, {
                    cancel: () => {
                        this.exitApp(); // 用户取消时退出应用
                    },
                    confirm: () => {
                        this.onConfirm(); // 用户确认时调用 onConfirm 方法
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/SplashPage.ets", line: 35 });
                jsDialog.setController(this.
                // 自定义对话框控制器，用于显示用户隐私对话框
                dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        cancel: () => {
                            this.exitApp(); // 用户取消时退出应用
                        },
                        confirm: () => {
                            this.onConfirm(); // 用户确认时调用 onConfirm 方法
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            cancel: () => {
                this.exitApp(); // 对话框取消时退出应用
            },
            autoCancel: false,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: Const.OFFSET_24 } // 对话框偏移量
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SplashIndex_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: SplashIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 上下文对象，用于获取应用程序的上下文
    private context: common.UIAbilityContext;
    // 自定义对话框控制器，用于显示用户隐私对话框
    private dialogController: CustomDialogController;
    // 用户确认隐私政策时调用的方法
    onConfirm() {
        let preference = preferences.getPreferences(this.context, H_STORE);
        preference.then((res) => {
            res.put(IS_PRIVACY, true).then(() => {
                res.flush(); // 刷新偏好设置
                Logger.info('SplashPage', 'isPrivacy is put success');
            }).catch((err: Error) => {
                Logger.info('SplashPage', 'isPrivacy put failed. Cause: ' + err);
            });
        });
        this.jumpAdPage(); // 跳转到广告页面
    }
    exitApp() {
        this.context.terminateSelf();
    }
    // 跳转到广告页面
    jumpAdPage() {
        setTimeout(() => {
            router.replaceUrl({ url: 'pages/AdvertisingPage' });
        }, Const.LAUNCHER_DELAY_TIME);
    }
    // 组件即将出现时调用的方法
    aboutToAppear() {
        let preference = preferences.getPreferences(this.context, H_STORE);
        preference.then((res) => {
            res.get(IS_PRIVACY, false).then((isPrivate) => {
                if (isPrivate === true) {
                    this.jumpAdPage(); // 如果用户已同意隐私政策，跳转到广告页面
                }
                else {
                    this.dialogController.open(); // 否则打开隐私对话框
                }
            });
        });
    }
    // 组件即将消失时调用
    aboutToDisappear() {
        clearTimeout(); // 清除定时器
    }
    // 构建组件的 UI
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SplashPage.ets(98:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777350, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/SplashPage.ets(99:7)");
            Image.width({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.aspectRatio(1);
            Image.margin({ top: { "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/SplashPage.ets(103:7)");
            Text.fontFamily({ "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777378, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_700);
            Text.letterSpacing(Const.LETTER_1);
            Text.margin({
                top: { "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                bottom: { "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/SplashPage.ets(113:7)");
            Text.fontFamily({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777378, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_400);
            Text.letterSpacing(Const.LETTER_34);
            Text.opacity(Const.OPACITY_6);
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SplashIndex";
    }
}
registerNamedRoute(() => new SplashIndex(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/SplashPage", pageFullPath: "entry/src/main/ets/pages/SplashPage", integratedHsp: "false" });
