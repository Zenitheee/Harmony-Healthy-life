if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditProfilePage_Params {
    nickname?: string;
    gender?: string;
    signature?: string;
    birthdate?: string;
    Height?: string;
    Weight?: string;
    isEditing?: boolean;
    showConfirmDialog?: boolean;
}
import router from "@ohos:router";
import { ConfirmDialog } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/ConfirmDialog";
export interface UserProfile {
    nickname: string;
    gender: string;
    signature: string;
    birthdate: string;
    Height: string;
    Weight: string;
}
export class EditProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new ObservedPropertySimplePU('', this, "nickname");
        this.__gender = new ObservedPropertySimplePU('Secret', this, "gender");
        this.__signature = new ObservedPropertySimplePU('', this, "signature");
        this.__birthdate = new ObservedPropertySimplePU('', this, "birthdate");
        this.__Height = new ObservedPropertySimplePU('', this, "Height");
        this.__Weight = new ObservedPropertySimplePU('', this, "Weight");
        this.__isEditing = new ObservedPropertySimplePU(false, this, "isEditing");
        this.__showConfirmDialog = new ObservedPropertySimplePU(false, this, "showConfirmDialog");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditProfilePage_Params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.birthdate !== undefined) {
            this.birthdate = params.birthdate;
        }
        if (params.Height !== undefined) {
            this.Height = params.Height;
        }
        if (params.Weight !== undefined) {
            this.Weight = params.Weight;
        }
        if (params.isEditing !== undefined) {
            this.isEditing = params.isEditing;
        }
        if (params.showConfirmDialog !== undefined) {
            this.showConfirmDialog = params.showConfirmDialog;
        }
    }
    updateStateVars(params: EditProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__birthdate.purgeDependencyOnElmtId(rmElmtId);
        this.__Height.purgeDependencyOnElmtId(rmElmtId);
        this.__Weight.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditing.purgeDependencyOnElmtId(rmElmtId);
        this.__showConfirmDialog.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__birthdate.aboutToBeDeleted();
        this.__Height.aboutToBeDeleted();
        this.__Weight.aboutToBeDeleted();
        this.__isEditing.aboutToBeDeleted();
        this.__showConfirmDialog.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __birthdate: ObservedPropertySimplePU<string>;
    get birthdate() {
        return this.__birthdate.get();
    }
    set birthdate(newValue: string) {
        this.__birthdate.set(newValue);
    }
    private __Height: ObservedPropertySimplePU<string>;
    get Height() {
        return this.__Height.get();
    }
    set Height(newValue: string) {
        this.__Height.set(newValue);
    }
    private __Weight: ObservedPropertySimplePU<string>;
    get Weight() {
        return this.__Weight.get();
    }
    set Weight(newValue: string) {
        this.__Weight.set(newValue);
    }
    private __isEditing: ObservedPropertySimplePU<boolean>;
    get isEditing() {
        return this.__isEditing.get();
    }
    set isEditing(newValue: boolean) {
        this.__isEditing.set(newValue);
    }
    private __showConfirmDialog: ObservedPropertySimplePU<boolean>;
    get showConfirmDialog() {
        return this.__showConfirmDialog.get();
    }
    set showConfirmDialog(newValue: boolean) {
        this.__showConfirmDialog.set(newValue);
    }
    aboutToAppear(): void {
        const params = router.getParams() as UserProfile; // 类型断言为 UserProfile 类型
        if (params) {
            this.nickname = params.nickname || '';
            this.gender = params.gender || 'Secret';
            this.signature = params.signature || '';
            this.birthdate = params.birthdate || '';
            this.Height = params.Height || '';
            this.Weight = params.Weight || '';
        }
    }
    toggleEditing(): void {
        this.isEditing = true;
    }
    confirmSave(): void {
        this.showConfirmDialog = true;
    }
    handleConfirmSave(): void {
        const updatedProfile: UserProfile = {
            nickname: this.nickname,
            gender: this.gender,
            signature: this.signature,
            birthdate: this.birthdate,
            Height: this.Height,
            Weight: this.Weight
        };
        router.back();
    }
    handleCancelEdit(): void {
        this.showConfirmDialog = true; // 显示是否继续编辑的对话框
    }
    handleDiscardChanges(): void {
        this.showConfirmDialog = false; // 取消编辑，关闭对话框
        router.back(); // 放弃编辑后返回上一页
    }
    handleContinueEditing(): void {
        this.showConfirmDialog = false; // 继续编辑
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(72:5)");
            Column.padding(16);
            Column.backgroundColor("#FFFFFF");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(73:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("返回");
            Button.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(74:9)");
            Button.onClick(() => {
                this.handleCancelEdit();
            });
            Button.margin({ top: 16 });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "请输入您的昵称" });
            TextInput.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(81:7)");
            TextInput.onChange((value) => this.nickname = value);
            TextInput.margin({ bottom: 16 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextPicker.create({
                range: ["男", "女", "保密"],
                value: this.gender
            });
            TextPicker.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(85:7)");
            TextPicker.onChange((value: string | string[]) => {
                this.gender = value as string;
            });
            TextPicker.margin({ bottom: 16 });
        }, TextPicker);
        TextPicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "请编辑您的个性签名" });
            TextInput.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(94:7)");
            TextInput.onChange((value) => this.signature = value);
            TextInput.margin({ bottom: 16 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            DatePicker.create({ selected: this.birthdate ? new Date(this.birthdate) : new Date() });
            DatePicker.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(98:7)");
            DatePicker.onDateChange((value: Date) => this.birthdate = value.toISOString().split('T')[0]);
            DatePicker.margin({ bottom: 16 });
        }, DatePicker);
        DatePicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "请输入您的身高" });
            TextInput.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(102:7)");
            TextInput.onChange((value) => this.Height = value);
            TextInput.margin({ bottom: 16 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "请输入您的体重" });
            TextInput.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(106:7)");
            TextInput.onChange((value) => this.Weight = value);
            TextInput.margin({ bottom: 16 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("保存");
            Button.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(110:7)");
            Button.onClick(() => {
                this.handleConfirmSave();
            });
            Button.margin({ top: 16 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showConfirmDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EditProfilePage.ets(117:9)");
                        Column.padding(16);
                        Column.backgroundColor("#FFFFFF");
                        Column.borderRadius(8);
                        Column.shadow({ color: "#000000", radius: 10 });
                        Column.width('80%');
                        Column.height('20%');
                        Column.alignItems(HorizontalAlign.Center);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConfirmDialog(this, {
                                    message: "是否退出编辑？",
                                    onConfirm: () => this.handleDiscardChanges(),
                                    onCancel: () => this.handleContinueEditing()
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EditProfilePage.ets", line: 118 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        message: "是否退出编辑？",
                                        onConfirm: () => this.handleDiscardChanges(),
                                        onCancel: () => this.handleContinueEditing()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    message: "是否退出编辑？",
                                    onConfirm: () => this.handleDiscardChanges(),
                                    onCancel: () => this.handleContinueEditing()
                                });
                            }
                        }, { name: "ConfirmDialog" });
                    }
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EditProfilePage";
    }
}
registerNamedRoute(() => new EditProfilePage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/EditProfilePage", pageFullPath: "entry/src/main/ets/pages/EditProfilePage", integratedHsp: "false" });
