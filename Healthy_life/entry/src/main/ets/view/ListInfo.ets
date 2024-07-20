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

import { MineInfoList, InfoItem } from '../model/Mine';
import { router } from '@kit.ArkUI';
import { UserProfileItem } from '../model/TaskInitList';

@Component
export struct ListInfo {
  @Link userID: number;
  @Link nickname: string;
  @Link signature: string;
  @Link gender: string;
  @Link birthdate: string;
  @Link Height: string;
  @Link Weight: string;

  build() {
    List() {
      ForEach(MineInfoList, (item: InfoItem) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_40'))

            Image($r('app.media.ic_right_grey'))
              .objectFit(ImageFit.Contain)
              .height($r('app.float.default_12'))
              .width($r('app.float.default_7'))
          }
        }
        .onClick(() => {
          if (item.id === '1') {    // 跳转到个人资料展示页面
            const profile: UserProfileItem = {
              userID: this.userID,
              nickname: this.nickname,
              signature: this.signature,
              gender: this.gender,
              birthdate: this.birthdate,
              Height: this.Height,
              Weight: this.Weight
            };
            router.pushUrl({
              url: 'pages/ProfileDisplayPage',
              params: profile,
            });
          } else if (item.id === '2') {
            router.pushUrl({
              url: 'pages/CheckUpdatesPage'
            });
          } else {
            router.pushUrl({
              url: 'pages/AboutPage'
            });
          }
        })
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))
        .border({
          width: { bottom: $r('app.float.default_1') },
          color: $r('app.color.borderColor')
        })

      }, (item: InfoItem) => JSON.stringify(item));
    }
    .border({
      radius: {
        topLeft: $r('app.float.default_24'),
        topRight: $r('app.float.default_24')
      }
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_24') })
    .padding({ top: $r('app.float.default_16') })
    .flexGrow(1)
    .clip(true)
  }
}