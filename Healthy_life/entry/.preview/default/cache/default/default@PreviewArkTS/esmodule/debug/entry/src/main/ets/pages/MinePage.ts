if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineIndex_Params {
    nickname?: string;
    signature?: string;
    userID?: number;
    gender?: string;
    birthdate?: string;
    Height?: string;
    Weight?: string;
}
import { ListInfo } from "@bundle:com.example.healthy_life/entry/ets/view/ListInfo";
import { UserBaseInfo } from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
export class MineIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.__signature = new ObservedPropertySimplePU(Const.SIGNATURE, this, "signature");
        this.__userID = new ObservedPropertySimplePU(Const.ZERO, this, "userID");
        this.__gender = new ObservedPropertySimplePU('保密', this, "gender");
        this.__birthdate = new ObservedPropertySimplePU('2001年08月01日', this, "birthdate");
        this.__Height = new ObservedPropertySimplePU('185', this, "Height");
        this.__Weight = new ObservedPropertySimplePU('140', this, "Weight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineIndex_Params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.userID !== undefined) {
            this.userID = params.userID;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
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
    }
    updateStateVars(params: MineIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__userID.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__birthdate.purgeDependencyOnElmtId(rmElmtId);
        this.__Height.purgeDependencyOnElmtId(rmElmtId);
        this.__Weight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__userID.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__birthdate.aboutToBeDeleted();
        this.__Height.aboutToBeDeleted();
        this.__Weight.aboutToBeDeleted();
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
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __userID: ObservedPropertySimplePU<number>;
    get userID() {
        return this.__userID.get();
    }
    set userID(newValue: number) {
        this.__userID.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(34:5)");
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new UserBaseInfo(this, {
                        nickname: this.nickname,
                        signature: this.signature
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 35 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            nickname: this.nickname,
                            signature: this.signature
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "UserBaseInfo" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.height(Const.FULL_HEIGHT);
            __Common__.backgroundColor({ "id": 16777351, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ListInfo(this, {
                        nickname: this.__nickname,
                        signature: this.__signature,
                        userID: this.__userID,
                        gender: this.__gender,
                        birthdate: this.__birthdate,
                        Height: this.__Height,
                        Weight: this.__Weight
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 40 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            nickname: this.nickname,
                            signature: this.signature,
                            userID: this.userID,
                            gender: this.gender,
                            birthdate: this.birthdate,
                            Height: this.Height,
                            Weight: this.Weight
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ListInfo" });
        }
        __Common__.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
