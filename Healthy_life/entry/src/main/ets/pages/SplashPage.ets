/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { common } from '@kit.AbilityKit';
import { router } from '@kit.ArkUI';
import { preferences } from '@kit.ArkData';
import Logger from '../common/utils/Logger';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import UserPrivacyDialog from '../view/dialog/UserPrivacyDialog';

// app preferences name
const H_STORE: string = 'healthAppStore';
const IS_PRIVACY: string = 'isPrivacy';

@Entry
@Component
struct SplashIndex {
  // 上下文对象，用于获取应用程序的上下文
  context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

  // 自定义对话框控制器，用于显示用户隐私对话框
  dialogController: CustomDialogController = new CustomDialogController({
    builder: UserPrivacyDialog(
      {
        cancel: () => {
          this.exitApp(); // 用户取消时退出应用
        },
        confirm: () => {
          this.onConfirm();  // 用户确认时调用 onConfirm 方法
        }
      }),
    cancel: () => {
      this.exitApp();  // 对话框取消时退出应用
    },
    autoCancel: false, // 禁用自动取消
    alignment: DialogAlignment.Bottom, // 对话框对齐方式
    offset: { dx: 0, dy: Const.OFFSET_24 } // 对话框偏移量
  });

  // 用户确认隐私政策时调用的方法
  onConfirm() {
    let preference = preferences.getPreferences(this.context, H_STORE);
    preference.then((res) => {
      res.put(IS_PRIVACY, true).then(() => {
        res.flush();  // 刷新偏好设置
        Logger.info('SplashPage', 'isPrivacy is put success');
      }).catch((err: Error) => {
        Logger.info('SplashPage', 'isPrivacy put failed. Cause: ' + err);
      });
    })
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
        } else {
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
  build() {
    Column() {
      Image($r('app.media.logo'))
        .width($r('app.float.default_120'))
        .aspectRatio(1)
        .margin({ top: $r('app.float.default_120') });
      Text($r('app.string.EntryAbility_label'))
        .fontFamily($r('app.string.HarmonyHeiTi_Bold'))
        .fontSize($r('app.float.default_24'))
        .fontColor($r('app.color.titleColor'))
        .fontWeight(Const.FONT_WEIGHT_700)
        .letterSpacing(Const.LETTER_1)
        .margin({
          top: $r('app.float.default_20'),
          bottom: $r('app.float.default_8')
        })
      Text($r('app.string.EntryAbility_desc'))
        .fontFamily($r('app.string.HarmonyHeiTi'))
        .fontColor($r('app.color.titleColor'))
        .fontWeight(Const.FONT_WEIGHT_400)
        .letterSpacing(Const.LETTER_34)
        .opacity(Const.OPACITY_6)
        .fontSize($r('app.float.default_16'))
    }
    .width('100%')
    .height('100%')
    .backgroundImagePosition({ x: 0, y: 0 })
    .backgroundImage($r('app.media.ic_splash_bg'))
    .backgroundImageSize({ width: '100%', height: '100%' })
  }
}