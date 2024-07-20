import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import Logger from '../../common/utils/Logger';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { GenderEditDialog } from './GenderEditDialog'
import { BirthdateEditDialog } from './BirthDateEditDialog'

@Component
export struct ProfileDialogView {
  @State isShow: boolean = false;
  @Consume broadCast: BroadCast;

  // gender edit dialog
  genderEditDialog: CustomDialogController = new CustomDialogController({
    builder: GenderEditDialog(),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: Const.ZERO, dy: Const.MINUS_20 }
  });

  // birthdate edit dialog
  birthdateEditDialog: CustomDialogController = new CustomDialogController({
    builder: BirthdateEditDialog(),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: Const.ZERO, dy: Const.MINUS_20 }
  });

  aboutToAppear() {

    // gender edit dialog
    Logger.debug('CustomDialogView', 'aboutToAppear');

    this.broadCast.on(BroadCastType.SHOW_EDIT_GENDER_DIALOG, () => {
      this.genderEditDialog.open();
    })

    // birthdate edit dialog
    this.broadCast.on(BroadCastType.SHOW_EDIT_BIRTHDATE_DIALOG, () => {
      this.birthdateEditDialog.open();
    })
  }

  aboutToDisappear() {
    Logger.debug('CustomDialogView', 'aboutToDisappear');
  }

  build() {
  }
}