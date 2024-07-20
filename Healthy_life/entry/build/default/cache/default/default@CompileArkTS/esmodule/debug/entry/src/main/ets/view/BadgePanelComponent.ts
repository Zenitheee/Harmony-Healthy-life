if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BadgePanel_Params {
    successiveDays?: number;
}
import { BadgeCard } from "@bundle:com.example.healthy_life/entry/ets/view/BadgeCardComponent";
import { getAchievementLevel } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { getBadgeCardItems } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementViewModel";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { ACHIEVEMENT_LEVEL_KEY } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type CardInfo from '../viewmodel/CardInfo';
export class BadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__successiveDays = this.createStorageProp(ACHIEVEMENT_LEVEL_KEY, 0, "successiveDays");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BadgePanel_Params) {
    }
    updateStateVars(params: BadgePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__successiveDays.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__successiveDays.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __successiveDays: ObservedPropertyAbstractPU<number>;
    get successiveDays() {
        return this.__successiveDays.get();
    }
    set successiveDays(newValue: number) {
        this.__successiveDays.set(newValue);
    }
    aboutToAppear() {
        Logger.debug('BadgePanel', 'aboutToAppear');
        getAchievementLevel();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, wrap: FlexWrap.Wrap });
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 38 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    content: item.titleContent,
                                    imgSrc: item.achievement
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                content: item.titleContent
                            });
                        }
                    }, { name: "BadgeCard" });
                }
            };
            this.forEachUpdateFunction(elmtId, getBadgeCardItems(this.successiveDays), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // New Section 1
            Column.create({ space: Const.DEFAULT_18 });
            // New Section 1
            Column.padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM });
            // New Section 1
            Column.width('33%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777412, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.FULL_WIDTH);
            Image.height(Const.ACHIEVE_CARD_IMG_HEIGHT);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // New Section 1
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // New Section 2
            Column.create({ space: Const.DEFAULT_18 });
            // New Section 2
            Column.padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM });
            // New Section 2
            Column.width('33%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777412, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.FULL_WIDTH);
            Image.height(Const.ACHIEVE_CARD_IMG_HEIGHT);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // New Section 2
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // New Section 3
            Column.create({ space: Const.DEFAULT_18 });
            // New Section 3
            Column.padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM });
            // New Section 3
            Column.width('33%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777412, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.FULL_WIDTH);
            Image.height(Const.ACHIEVE_CARD_IMG_HEIGHT);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // New Section 3
        Column.pop();
        Row.pop();
        Flex.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
