import { CommonConstants as Const } from '../..//common/constants/CommonConstants';
import { UserProfileItem } from '../../model/TaskInitList';


@CustomDialog
export struct BirthdateEditDialog {
  @Consume settingParams: UserProfileItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  private selectedDate: Date = new Date('2021-08-08')

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }

  build() {
    Column() {
      Column() {
        Text($r('app.string.birthdate'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      DatePicker({
        start: new Date('1900-1-1'),
        end: new Date(),
        selected: this.selectedDate
      })
        .disappearTextStyle({color: Color.Gray, font: {size: '16fp', weight: FontWeight.Bold}})
        .textStyle({color: '#ff182431', font: {size: '18fp', weight: FontWeight.Normal}})
        .selectedTextStyle({color: '#ff0000FF', font: {size: '26fp', weight: FontWeight.Regular}})
        .onDateChange((value: Date) => {
          this.selectedDate = value
        })

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.settingParams.birthdate = this.formatDate(this.selectedDate)
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