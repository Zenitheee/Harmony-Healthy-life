import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { UserProfileItem } from '../../model/TaskInitList'


@Component
export struct Edit_nickname {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      TextInput({ placeholder: $r('app.string.edit_nickname')})
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
        .onChange((value) => this.settingParams.nickname = value)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}

@Component
export struct Edit_signature {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      TextInput({ placeholder:$r('app.string.edit_signature')})
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
        .onChange((value) => this.settingParams.signature = value)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}


@Component
export struct Edit_gender {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      Text($r('app.string.edit_gender'))
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
      Text(this.settingParams.gender) // 显示当前性别
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}


@Component
export struct Edit_birthdate {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      Text($r('app.string.edit_birthdate'))
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
      Text(this.settingParams.birthdate)
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}

@Component
export struct Edit_height {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      TextInput({ placeholder :  $r('app.string.edit_height')})
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
        .onChange((value) => this.settingParams.Height = value)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}

@Component
export struct Edit_weight {
  @Consume settingParams: UserProfileItem;

  build() {
    Row() {
      TextInput({ placeholder: $r('app.string.edit_weight')})
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)
        .onChange((value) => this.settingParams.Weight = value)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.Start)
  }
}