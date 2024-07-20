if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ButtonExample_Params {
}
class ButtonExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ButtonExample_Params) {
    }
    updateStateVars(params: ButtonExample_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("entry/src/main/ets/test/1.ets(6:5)");
            Flex.height(400);
            Flex.padding({ left: 35, right: 35, top: 35 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Normal button');
            Text.debugLine("entry/src/main/ets/test/1.ets(7:7)");
            Text.fontSize(9);
            Text.fontColor(0xCCCCCC);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("entry/src/main/ets/test/1.ets(8:7)");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('OK', { type: ButtonType.Normal, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(9:9)");
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.width(90);
            Button.onClick(() => {
                console.log('ButtonType.Normal');
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(16:9)");
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.width(90);
            Button.height(40);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/test/1.ets(17:11)");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/test/1.ets(18:13)");
            LoadingProgress.width(20);
            LoadingProgress.height(20);
            LoadingProgress.margin({ left: 12 });
            LoadingProgress.color(0xFFFFFF);
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('loading');
            Text.debugLine("entry/src/main/ets/test/1.ets(19:13)");
            Text.fontSize(12);
            Text.fontColor(0xffffff);
            Text.margin({ left: 5, right: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Disable', { type: ButtonType.Normal, stateEffect: false });
            Button.debugLine("entry/src/main/ets/test/1.ets(23:9)");
            Button.opacity(0.4);
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.width(90);
        }, Button);
        Button.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Capsule button');
            Text.debugLine("entry/src/main/ets/test/1.ets(27:7)");
            Text.fontSize(9);
            Text.fontColor(0xCCCCCC);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("entry/src/main/ets/test/1.ets(28:7)");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('OK', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(29:9)");
            Button.backgroundColor(0x317aff);
            Button.width(90);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(30:9)");
            Button.backgroundColor(0x317aff);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/test/1.ets(31:11)");
            Row.alignItems(VerticalAlign.Center);
            Row.width(90);
            Row.height(40);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/test/1.ets(32:13)");
            LoadingProgress.width(20);
            LoadingProgress.height(20);
            LoadingProgress.margin({ left: 12 });
            LoadingProgress.color(0xFFFFFF);
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('loading');
            Text.debugLine("entry/src/main/ets/test/1.ets(33:13)");
            Text.fontSize(12);
            Text.fontColor(0xffffff);
            Text.margin({ left: 5, right: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Disable', { type: ButtonType.Capsule, stateEffect: false });
            Button.debugLine("entry/src/main/ets/test/1.ets(37:9)");
            Button.opacity(0.4);
            Button.backgroundColor(0x317aff);
            Button.width(90);
        }, Button);
        Button.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Circle button');
            Text.debugLine("entry/src/main/ets/test/1.ets(41:7)");
            Text.fontSize(9);
            Text.fontColor(0xCCCCCC);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/test/1.ets(42:7)");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(43:9)");
            Button.width(55);
            Button.height(55);
            Button.backgroundColor(0x317aff);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/test/1.ets(44:11)");
            LoadingProgress.width(20);
            LoadingProgress.height(20);
            LoadingProgress.color(0xFFFFFF);
        }, LoadingProgress);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.debugLine("entry/src/main/ets/test/1.ets(47:9)");
            Button.width(55);
            Button.height(55);
            Button.margin({ left: 20 });
            Button.backgroundColor(0xF55A42);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/test/1.ets(48:11)");
            LoadingProgress.width(20);
            LoadingProgress.height(20);
            LoadingProgress.color(0xFFFFFF);
        }, LoadingProgress);
        Button.pop();
        Flex.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ButtonExample";
    }
}
registerNamedRoute(() => new ButtonExample(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "test/1", pageFullPath: "entry/src/main/ets/test/1", integratedHsp: "false" });
