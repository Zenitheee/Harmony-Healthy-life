if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Login_Params {
    account?: string;
    password?: string;
    isShowProgress?: boolean;
    timeOutId?: number;
}
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
/**
 * 输入框的通用样式
 */
function __TextInput__inputStyle(): void {
    TextInput.placeholderColor({ "id": 16777461, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    TextInput.height(45);
    TextInput.fontSize(18);
    TextInput.backgroundColor({ "id": 16777450, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    TextInput.width('100%');
    TextInput.padding({ left: 0 });
    TextInput.margin({ top: 12 });
}
function __Line__lineStyle(): void {
    Line.width('100%');
    Line.height(2);
    Line.backgroundColor({ "id": 16777452, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__blueTextStyle(): void {
    Text.fontColor({ "id": 16777454, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontSize(14);
    Text.fontWeight(FontWeight.Medium);
}
class Login extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isShowProgress = new ObservedPropertySimplePU(false, this, "isShowProgress");
        this.timeOutId = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Login_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
    }
    updateStateVars(params: Login_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowProgress.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __account: ObservedPropertySimplePU<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    //是否显示加载条
    private __isShowProgress: ObservedPropertySimplePU<boolean>;
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue: boolean) {
        this.__isShowProgress.set(newValue);
    }
    //超时标识
    private timeOutId: number;
    /**
     * 登录
     */
    login(): void {
        if (this.account === '' || this.password === '') {
            //显示Toast
            promptAction.showToast({ message: '账号或密码为空' });
            return;
        }
        //内容不为空则显示加载进度条
        this.isShowProgress = true;
        router.replaceUrl({ url: 'pages/Index' });
        if (this.timeOutId === -1) {
            //设置超时处理，两秒后执行页面跳转到主页
            this.timeOutId = setTimeout(() => {
                this.isShowProgress = false;
                this.timeOutId = -1;
                router.replaceUrl({
                    url: 'pages/MainPage',
                    params: {
                        account: this.account
                    }
                });
            }, 2000);
        }
    }
    /**
     * 组件的生命周期，组件销毁时执行
     */
    aboutToDisappear() {
        console.log('aboutToDisappear');
        clearTimeout(this.timeOutId);
        this.timeOutId = -1;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面纵向布局
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Login.ets(77:5)");
            // 页面纵向布局
            Column.backgroundColor({ "id": 16777450, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // 页面纵向布局
            Column.height('100%');
            // 页面纵向布局
            Column.width('100%');
            // 页面纵向布局
            Column.padding({
                left: 12,
                right: 12,
                bottom: 24
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //Logo
            Image.create({ "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Login.ets(79:7)");
            //Logo
            Image.width(78);
            //Logo
            Image.height(78);
            //Logo
            Image.margin({ top: 100, bottom: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(83:7)");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777465, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录帐号以使用更多服务');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(87:7)");
            Text.fontSize(16);
            Text.fontColor({ "id": 16777456, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: 16, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //账号输入框
            TextInput.create({ placeholder: '账号' });
            TextInput.debugLine("entry/src/main/ets/pages/Login.ets(92:7)");
            //账号输入框
            TextInput.maxLength(11);
            //账号输入框
            TextInput.type(InputType.Number);
            __TextInput__inputStyle();
            //账号输入框
            TextInput.onChange((value: string) => {
                //获取输入的内容
                this.account = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //下划线
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/Login.ets(101:7)");
            __Line__lineStyle();
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //密码输入框
            TextInput.create({ placeholder: '密码' });
            TextInput.debugLine("entry/src/main/ets/pages/Login.ets(103:7)");
            //密码输入框
            TextInput.maxLength(8);
            //密码输入框
            TextInput.type(InputType.Password);
            __TextInput__inputStyle();
            //密码输入框
            TextInput.onChange((value: string) => {
                //获取输入的内容
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //下划线
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/Login.ets(112:7)");
            __Line__lineStyle();
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Login.ets(114:7)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('短信验证码登录');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(115:9)");
            __Text__blueTextStyle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('忘记密码');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(116:9)");
            __Text__blueTextStyle();
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //登录按钮
            Button.createWithLabel('登录', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/Login.ets(122:7)");
            //登录按钮
            Button.width('90%');
            //登录按钮
            Button.height(40);
            //登录按钮
            Button.fontSize(16);
            //登录按钮
            Button.fontWeight(FontWeight.Medium);
            //登录按钮
            Button.backgroundColor({ "id": 16777455, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            //登录按钮
            Button.margin({ top: 80, bottom: 12 });
            //登录按钮
            Button.onClick(() => {
                //登录
                this.login();
            });
        }, Button);
        //登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册账号');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(133:7)");
            Text.fontColor({ "id": 16777454, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            //是否显示等待进度条
            if (this.isShowProgress) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/pages/Login.ets(139:9)");
                        LoadingProgress.color({ "id": 16777453, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        LoadingProgress.width(30);
                        LoadingProgress.height(30);
                        LoadingProgress.margin({ top: 20 });
                    }, LoadingProgress);
                });
            }
            //空白填充组件，具有自动填充容器空余部分的能力。仅当父组件为Row/Column时生效。
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //空白填充组件，具有自动填充容器空余部分的能力。仅当父组件为Row/Column时生效。
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Login.ets(146:7)");
        }, Blank);
        //空白填充组件，具有自动填充容器空余部分的能力。仅当父组件为Row/Column时生效。
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('其他登录方式');
            Text.debugLine("entry/src/main/ets/pages/Login.ets(147:7)");
            Text.fontColor({ "id": 16777460, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 48, bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 44 });
            Row.debugLine("entry/src/main/ets/pages/Login.ets(152:7)");
        }, Row);
        this.imageButton.bind(this)({ "id": 16777480, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this);
        this.imageButton.bind(this)({ "id": 16777488, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this);
        this.imageButton.bind(this)({ "id": 16777472, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this);
        Row.pop();
        // 页面纵向布局
        Column.pop();
    }
    /**
     * 其他登录方式按钮
     * @param src
     */
    imageButton(src: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.debugLine("entry/src/main/ets/pages/Login.ets(174:5)");
            Button.height(48);
            Button.width(48);
            Button.backgroundColor({ "id": 16777450, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(src);
            Image.debugLine("entry/src/main/ets/pages/Login.ets(175:7)");
        }, Image);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Login";
    }
}
registerNamedRoute(() => new Login(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/Login", pageFullPath: "entry/src/main/ets/pages/Login", integratedHsp: "false" });
