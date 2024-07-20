import { CommonConstants as Const } from '../..//common/constants/CommonConstants';
import { UserProfileItem } from '../../model/TaskInitList';
import { genderRange } from '../../viewmodel/TaskViewModel';


@CustomDialog
export struct GenderEditDialog {
  @Consume settingParams: UserProfileItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  gender_range: string[] = genderRange();
  currentValue: string = this.settingParams.gender;

  build() {
    Column() {
      Column() {
        Text($r('app.string.gender'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      TextPicker({
        range: this.gender_range,
        value: this.settingParams.gender
      })
        .height(Const.THOUSANDTH_800)
        .onChange((value: string | string[], index: number | number[]) => {
          const textPickerResult: TextPickerResult = {
            value,
            index
          };
          this.currentValue =
            Array.isArray(textPickerResult.value) ? textPickerResult.value[0] : textPickerResult.value;
        })

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.settingParams.gender = this.currentValue
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(Const.THOUSANDTH_1000)
      .height(Const.DEFAULT_28)
      .margin({ bottom: Const.DEFAULT_20 })
    }
    .justifyContent(FlexAlign.Center)
    .height(Const.THOUSANDTH_560)
    .padding(Const.DEFAULT_12)
  }
}