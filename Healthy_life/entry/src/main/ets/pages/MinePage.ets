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

import { ListInfo } from '../view/ListInfo';
import UserProfile, { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import Logger from '../common/utils/Logger';


@Component
export struct MineIndex {
  @State nickname: string = Const.NICK_NAME;
  @State signature: string = Const.SIGNATURE;
  @State userID: number = Const.ZERO;
  @State gender: string = '保密';
  @State birthdate: string = '2001年08月01日';
  @State Height: string = '185';
  @State Weight: string = '140';

  build() {
    Column() {
      UserBaseInfo({
        nickname: this.nickname,
        signature: this.signature
      });

      ListInfo({
        nickname: this.nickname,
        signature: this.signature,
        userID: this.userID,
        gender: this.gender,
        birthdate: this.birthdate,
        Height: this.Height,
        Weight: this.Weight
      })
        .height(Const.FULL_HEIGHT)
        .backgroundColor($r('app.color.mineBgColor'))
    }
  }
}
