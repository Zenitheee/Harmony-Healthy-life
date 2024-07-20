import { router } from '@kit.ArkUI';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

@Entry
@Component
  struct AboutPage {
  build() {
    Column() {
      List() {
        ListItem() {
          Text("APP名称：健康生活")
            .fontSize($r('app.float.default_24'))
            .fontColor($r('app.color.titleColor'))
            .margin({ top: 20, left: 20, right: 20 })
            .textAlign(TextAlign.Start); // 将文本左对齐
        }

        ListItem() {
          Divider()
            .color($r('app.color.borderColor'))
            .margin({ top: 20, bottom: 20, left: 20, right: 20 });
        }

        ListItem() {
          Text("版本号：V1.0")
            .fontSize($r('app.float.default_24'))
            .fontColor($r('app.color.black'))
            .margin({ top: 20, left: 20, right: 20 })
            .textAlign(TextAlign.Start); // 将文本左对齐
        }
      }
      .padding(16)
      .backgroundColor($r('app.color.white'))
      .borderRadius(8)

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
    .backgroundColor($r('app.color.primaryBgColor'));
  }
}
