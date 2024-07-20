// CheckUpdatesPage.ts
import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

@Entry
@Component
struct CheckUpdatesPage {
  build() {
    Column() {
      Text("当前已是最新版本")
        .fontSize($r('app.float.default_24'))
        .fontColor($r('app.color.black'))
        .margin({ top: 20, left: 20, right: 20 })

      Button() {
        Text($r('app.string.backup')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
      }
      .width(Const.THOUSANDTH_800)
      .height(Const.DEFAULT_48)
      .backgroundColor($r('app.color.borderColor'))
      .onClick(() =>{
        router.back();
      })
      .position({
        x: Const.THOUSANDTH_100,
        y: Const.THOUSANDTH_800
      })
    }
    .padding(16)
    .backgroundColor("#FFFFFF")
  }
}
