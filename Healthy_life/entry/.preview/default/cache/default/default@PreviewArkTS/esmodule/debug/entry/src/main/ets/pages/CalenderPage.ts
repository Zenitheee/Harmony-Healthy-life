if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MonthCalendar_Params {
}
import { MonthCalendarComponent } from "@bundle:com.example.healthy_life/entry/ets/view/MonthCalenderCompoment";
class MonthCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MonthCalendar_Params) {
    }
    updateStateVars(params: MonthCalendar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CalenderPage.ets(23:5)");
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MonthCalendarComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CalenderPage.ets", line: 24 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MonthCalendarComponent" });
        }
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MonthCalendar";
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "MonthCalendar", new MonthCalendar(undefined, {}));
    previewComponent();
}
else {
    registerNamedRoute(() => new MonthCalendar(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CalenderPage", pageFullPath: "entry/src/main/ets/pages/CalenderPage", integratedHsp: "false" });
}
