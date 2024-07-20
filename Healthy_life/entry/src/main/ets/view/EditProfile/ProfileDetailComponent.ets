import {
  Edit_nickname,
  Edit_signature,
  Edit_gender,
  Edit_birthdate,
  Edit_height,
  Edit_weight
} from "./ProfileEditListItem"

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import { HealthDataSrcMgr } from '../../common/utils/HealthDataSrcMgr';
import { UserProfileItem } from '../../model/TaskInitList';
import { promptAction, router } from '@kit.ArkUI';
import { ProfileDialogView } from '../../view/dialog/ProfileDialogView'
import { formatParams_Profile, updateProfile } from  '../../viewmodel/TaskViewModel'
import { GlobalContext } from '../../common/utils/GlobalContext';
import Logger from '../../common/utils/Logger';
import UserProfile from '../UserBaseInfo';

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}

@Component
export default struct EditProfileDetail {
  @Provide broadCast: BroadCast = HealthDataSrcMgr.getInstance().getBroadCast();
  @Provide @Watch('onParamsChanged') settingParams: UserProfileItem = router.getParams() as UserProfileItem;
  private isChanged: boolean = false;


  onParamsChanged() {
    this.isChanged = true;
  }

  backIndexParams(): string {
    return formatParams_Profile(this.settingParams);
  }


   finishProfileEdit() {
    if (this.isChanged) {
      let userInfo: UserProfile = new UserProfile(this.settingParams.userID, this.settingParams.nickname,
          this.settingParams.gender, this.settingParams.signature, this.settingParams.birthdate, this.settingParams.Height, this.settingParams.Weight);
      updateProfile(userInfo).then((res: number) => {
        GlobalContext.getContext().setObject('userProfileChange', true);
        router.back({
          url: 'pages/ProfileDisplayPage',
          params: {
            editProfile: this.backIndexParams(),
          }
        })
        Logger.info('finishProfileEdit', JSON.stringify(res));
    }).catch((error : Error) => {
      promptAction.showToast({
        message: 'Profile update failed: ' + error.message
      })
      Logger.error('finishProfileEdit', 'Profile update failed: ' + JSON.stringify(error));
    })
    return;
  }
    router.back({
      url: 'pages/ProfileEditPage',
    });
  }


  aboutToAppear(): void {
    this.broadCast.off(BroadCastType.SHOW_EDIT_GENDER_DIALOG, () => {
    });
    this.broadCast.off(BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG, () => {
    });
  }


  build() {
    Row() {
      Column() {
        List({ space: Const.LIST_ITEM_SPACE }) {
          ListItem() {
            Edit_nickname()
          }
          .listItemStyle()

          ListItem() {
            Edit_signature()
          }
          .listItemStyle()

          ListItem() {
            Edit_gender()
          }
          .listItemStyle()
          .onClick(() => {
            this.broadCast.emit(
              BroadCastType.SHOW_EDIT_GENDER_DIALOG);
          })

          ListItem() {
            Edit_birthdate()
          }
          .listItemStyle()
          .onClick(() => {
            this.broadCast.emit(
              BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG);
          })

          ListItem() {
            Edit_height()
          }
          .listItemStyle()

          ListItem() {
            Edit_weight()
          }
          .listItemStyle()

        }
        .width(Const.THOUSANDTH_940)

        Button() {
          Text($r('app.string.complete')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
        }
        .width(Const.THOUSANDTH_800)
        .height(Const.DEFAULT_48)
        .backgroundColor($r('app.color.borderColor'))
        .onClick(() => {
          this.finishProfileEdit();
        })
        .position({
          x: Const.THOUSANDTH_100,
          y: Const.THOUSANDTH_800
        })

        ProfileDialogView()
      }
      .width(Const.THOUSANDTH_1000)
    }
  }
}


