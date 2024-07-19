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

import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { MineInfoList, InfoItem } from '../model/Mine';

@Component
export struct ListInfo {
  build() {
    List() {
      ForEach(MineInfoList, (item: InfoItem) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_48'))

            Image($r('app.media.ic_right_grey'))
              .objectFit(ImageFit.Contain)
              .height($r('app.float.default_12'))
              .width($r('app.float.default_7'))
          }
        }
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))

      }, (item: InfoItem) => JSON.stringify(item));
    }
    .borderRadius(24)
    // 为列表增加分隔线
    .divider({
      strokeWidth: 1,
      color: $r('app.color.borderColor'),
      startMargin: 25,
      endMargin: 25
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_16') })
    .padding({ top: $r('app.float.default_24') })
    .flexGrow(1)
    .clip(true)
    .height(20)
  }
}

@Component
export struct ExitLogin{
  build() {
    Button('退出登录', { type: ButtonType.Capsule })
      .width('90%')
      .height(40)
      .fontSize(16)
      .fontColor($r('app.color.setting_button_fontColor'))
      .fontWeight(FontWeight.Medium)
      .backgroundColor($r('app.color.setting_button_backgroundColor'))
      .margin({ bottom: 55 })
      .onClick(() => {
        promptAction.showToast({ message: '退出登录' })
        router.replaceUrl({ url: 'pages/Login' })
      })
  }
}
