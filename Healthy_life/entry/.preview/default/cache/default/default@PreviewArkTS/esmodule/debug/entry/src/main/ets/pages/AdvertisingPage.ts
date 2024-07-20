if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdvertisingPage_Params {
    duration?: number;
    intervalId?: number;
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
class AdvertisingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__duration = new ObservedPropertySimplePU(Const.AD_DURATION, this, "duration");
        this.intervalId = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdvertisingPage_Params) {
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    updateStateVars(params: AdvertisingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__duration.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __duration: ObservedPropertySimplePU<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private intervalId: number;
    goToHomePage() {
        clearInterval(this.intervalId);
        router.replaceUrl({ url: 'pages/MainPage' });
    }
    aboutToAppear() {
        this.intervalId = setInterval(() => {
            if (this.duration > 0) {
                this.duration -= 1;
            }
            else {
                this.goToHomePage();
            }
        }, Const.DURATION_1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(41:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
            Column.justifyContent(FlexAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /*
            Row() {
              Text($r('app.string.jump_ad', this.duration))
                .fontSize($r('app.float.default_12'))
                .fontColor($r('app.color.white'))
                .borderRadius($r('app.float.default_16'))
                .letterSpacing(Const.LETTER_1)
                .height($r('app.float.default_36'))
                .backgroundColor('rgba(0,0,0,0.20)')
                .border({ color: $r('app.color.white'), width: $r('app.float.default_1') })
                .margin({ top: $r('app.float.default_36') })
                .padding($r('app.float.default_8'))
                .onClick(() => this.goToHomePage())
            }
            .width('90%')
            .justifyContent(FlexAlign.End)
            */
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(59:7)");
            /*
            Row() {
              Text($r('app.string.jump_ad', this.duration))
                .fontSize($r('app.float.default_12'))
                .fontColor($r('app.color.white'))
                .borderRadius($r('app.float.default_16'))
                .letterSpacing(Const.LETTER_1)
                .height($r('app.float.default_36'))
                .backgroundColor('rgba(0,0,0,0.20)')
                .border({ color: $r('app.color.white'), width: $r('app.float.default_1') })
                .margin({ top: $r('app.float.default_36') })
                .padding($r('app.float.default_8'))
                .onClick(() => this.goToHomePage())
            }
            .width('90%')
            .justifyContent(FlexAlign.End)
            */
            Row.height({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            /*
            Row() {
              Text($r('app.string.jump_ad', this.duration))
                .fontSize($r('app.float.default_12'))
                .fontColor($r('app.color.white'))
                .borderRadius($r('app.float.default_16'))
                .letterSpacing(Const.LETTER_1)
                .height($r('app.float.default_36'))
                .backgroundColor('rgba(0,0,0,0.20)')
                .border({ color: $r('app.color.white'), width: $r('app.float.default_1') })
                .margin({ top: $r('app.float.default_36') })
                .padding($r('app.float.default_8'))
                .onClick(() => this.goToHomePage())
            }
            .width('90%')
            .justifyContent(FlexAlign.End)
            */
            Row.width('100%');
            /*
            Row() {
              Text($r('app.string.jump_ad', this.duration))
                .fontSize($r('app.float.default_12'))
                .fontColor($r('app.color.white'))
                .borderRadius($r('app.float.default_16'))
                .letterSpacing(Const.LETTER_1)
                .height($r('app.float.default_36'))
                .backgroundColor('rgba(0,0,0,0.20)')
                .border({ color: $r('app.color.white'), width: $r('app.float.default_1') })
                .margin({ top: $r('app.float.default_36') })
                .padding($r('app.float.default_8'))
                .onClick(() => this.goToHomePage())
            }
            .width('90%')
            .justifyContent(FlexAlign.End)
            */
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(60:9)");
            Image.width({ "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: Const.SPACE_4 });
            Column.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(64:9)");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: { "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(65:11)");
            Text.fontFamily({ "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777378, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_700);
            Text.letterSpacing(Const.LETTER_1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AdvertisingPage.ets(71:11)");
            Text.fontFamily({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777378, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_400);
            Text.letterSpacing(Const.LETTER_34);
            Text.opacity(Const.OPACITY_4);
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        /*
        Row() {
          Text($r('app.string.jump_ad', this.duration))
            .fontSize($r('app.float.default_12'))
            .fontColor($r('app.color.white'))
            .borderRadius($r('app.float.default_16'))
            .letterSpacing(Const.LETTER_1)
            .height($r('app.float.default_36'))
            .backgroundColor('rgba(0,0,0,0.20)')
            .border({ color: $r('app.color.white'), width: $r('app.float.default_1') })
            .margin({ top: $r('app.float.default_36') })
            .padding($r('app.float.default_8'))
            .onClick(() => this.goToHomePage())
        }
        .width('90%')
        .justifyContent(FlexAlign.End)
        */
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AdvertisingPage";
    }
}
registerNamedRoute(() => new AdvertisingPage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/AdvertisingPage", pageFullPath: "entry/src/main/ets/pages/AdvertisingPage", integratedHsp: "false" });
