import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import UserInfoApi from '../common/database/tables/UserInfoApi';
import Logger from '../common/utils/Logger';
import { UserProfileItem } from '../model/TaskInitList';
import UserProfile from '../view/UserBaseInfo';

@Entry
@Component

struct ProfileDisplayPage {
  @State nickname: string = Const.NICK_NAME;
  @State signature: string = Const.SIGNATURE;
  @State userID: number = Const.ZERO;
  @State gender: string = '保密';
  @State birthdate: string = '2001年08月01日';
  @State Height: string = '185';
  @State Weight: string = '140';

  // onInit() {
  //   this.loadUserProfile();
  // }
  //
  // loadUserProfile() {
  //   UserInfoApi.query(this.userID, (result: UserProfile) => {
  //     if (result) {
  //       this.userID = result.userID;
  //       this.nickname = result.nickname;
  //       this.signature = result.signature;
  //       this.gender = result.gender;
  //       this.birthdate = result.birthdate;
  //       this.Height = result.Height;
  //       this.Weight = result.Weight;
  //     } else {
  //       Logger.error('MineIndex', 'Failed to load user profile');
  //     }
  //   });
  // }



  navigateToEditProfile() {
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
      url: 'pages/ProfileEditPage',
      params: profile
    });
  }

  build() {
    Row() {
      Navigation() {
        Column() {
          Column() {
            // userIcon
            Image($r('app.media.ic_user'))
              .objectFit(ImageFit.Contain)
              .height($r('app.float.default_66'))
              .width($r('app.float.default_66'))
              .margin({ top: $r('app.float.default_71') })

            Column() {
              Text('LV.7')
                .fontSize($r('app.float.default_12'))
                .fontWeight(FontWeight.Bolder)
                .fontColor($r('app.color.leveColor'))
            }
            .width($r('app.float.default_44'))
            .height($r('app.float.default_16'))
            .margin({ top: $r('app.float.default_n8') })
            .border({ radius: $r('app.float.default_5') })
            .backgroundColor($r('app.color.leveBgColor'))
            .justifyContent(FlexAlign.Center)

            List({ space: Const.LIST_ITEM_SPACE }) {
              ListItem() {
                Text(`昵称: ${this.nickname}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20 })
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }

              ListItem() {
                Text(`性别: ${this.gender}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20 })
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }

              ListItem() {
                Text(`个性签名: ${this.signature}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20, bottom: 30})
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }

              ListItem() {
                Text(`生日: ${this.birthdate}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20 })
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }

              ListItem() {
                Text(`身高(厘米): ${this.Height}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20 })
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }

              ListItem() {
                Text(`体重(斤): ${this.Weight}`)
                  .fontSize($r('app.float.default_20'))
                  .fontColor($r('app.color.titleColor'))
                  .margin({ top: 20, left: 20, right: 20 })
                  .textAlign(TextAlign.Start); // 将文本左对齐
              }
            }

            Button() {
              Text($r('app.string.change')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
            }
            .width(Const.THOUSANDTH_800)
            .height(Const.DEFAULT_48)
            .backgroundColor($r('app.color.borderColor'))
            .onClick(() =>{
              this.navigateToEditProfile();
            })
            .position({
              x: Const.THOUSANDTH_100,
              y: Const.THOUSANDTH_800
            })
          }
        }
        .width(Const.THOUSANDTH_1000)
        .height(Const.THOUSANDTH_1000)
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title(Const.PROFILE_DISPLAY)
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
