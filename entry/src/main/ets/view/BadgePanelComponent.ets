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

import { BadgeCard } from './BadgeCardComponent'
import { getAchievementLevel } from '../model/AchieveModel'
import { getBadgeCardItems } from '../viewmodel/AchievementViewModel'
import Logger from '../common/utils/Logger'
import { ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel'
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import CardInfo from '../viewmodel/CardInfo'

@Component
export struct BadgePanel {
  @StorageProp(ACHIEVEMENT_LEVEL_KEY) successiveDays: number = 0;

  aboutToAppear() {
    Logger.debug('BadgePanel', 'aboutToAppear');
    getAchievementLevel();
  }

  build() {
    Scroll() {
      Flex({ direction: FlexDirection.Column, wrap: FlexWrap.Wrap }) {
        Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
          ForEach(getBadgeCardItems(this.successiveDays), (item: CardInfo) => {
            BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
          })
        }
        .width(Const.FULL_WIDTH)


        Row() {
          // New Section 1
          Column({ space: Const.DEFAULT_18 }) {
            Image($r('app.media.ic_badge_hide'))
              .width(Const.FULL_WIDTH)
              .height(Const.ACHIEVE_CARD_IMG_HEIGHT)
              .objectFit(ImageFit.Contain)
            Text($r('app.string.task_achievement_hide'))
              .lineHeight($r('app.float.default_16'))
              .fontSize($r('app.float.default_12'))
              .fontColor($r('app.color.white'))
          }
          .padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM })
          .width('33%')

          // New Section 2
          Column({ space: Const.DEFAULT_18 }) {
            Image($r('app.media.ic_badge_hide'))
              .width(Const.FULL_WIDTH)
              .height(Const.ACHIEVE_CARD_IMG_HEIGHT)
              .objectFit(ImageFit.Contain)
            Text($r('app.string.task_achievement_hide'))
              .lineHeight($r('app.float.default_16'))
              .fontSize($r('app.float.default_12'))
              .fontColor($r('app.color.white'))
          }
          .padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM })
          .width('33%')

          // New Section 3
          Column({ space: Const.DEFAULT_18 }) {
            Image($r('app.media.ic_badge_hide'))
              .width(Const.FULL_WIDTH)
              .height(Const.ACHIEVE_CARD_IMG_HEIGHT)
              .objectFit(ImageFit.Contain)
            Text($r('app.string.task_achievement_hide'))
              .lineHeight($r('app.float.default_16'))
              .fontSize($r('app.float.default_12'))
              .fontColor($r('app.color.white'))
          }
          .padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM })
          .width('33%')
        }
        .width('100%').justifyContent(FlexAlign.SpaceAround)
      }
      .width(Const.FULL_WIDTH)


    }
  }
}
