import { CommonConstants as Const } from '../common/constants/CommonConstants';

@Component
export struct TitleBar {
  build() {
    Row() {
      Text($r('app.string.achievement'))
        .fontSize($r('app.float.default_24'))
        .fontColor($r('app.color.white'))
        .align(Alignment.Start)
        .padding({left: Const.ACHIEVE_TITLE_BAR_LEFT,top: Const.ACHIEVE_TITLE_BAR_TOP})
    }
    .width(Const.FULL_WIDTH)
  }
}