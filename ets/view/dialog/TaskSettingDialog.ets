
import prompt from '@system.prompt';
import { ITaskItem } from '../../model/TaskInitList';
import { frequencyRange } from '../../common/utils/Utils';
import { returnTimeStamp, createAppleRange, createDrinkRange, formatTime } from '../../viewmodel/TaskViewModel';
import { taskType } from '../../viewmodel/TaskInfo';
import { CommonConstants as Const } from '../..//common/constants/CommonConstants';
import { FrequencyContentType } from '../../model/TaskInitList';

@CustomDialog
export struct TargetSettingDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  drinkRange: string[] = createDrinkRange();
  appleRange: string[] = createAppleRange();
  currentValue: string = this.settingParams.targetValue;
  currentTime: string = Const.DEFAULT_TIME;

  compareTime(startTime: string, endTime: string) {
    if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
    returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
      prompt.showToast({
        message: Const.CHOOSE_TIME_OUT_RANGE
      })
      return false;
    }
    return true;
  }

  setTargetValue() {
    if (this.settingParams?.taskID === taskType.getup) {
      if (!this.compareTime(Const.GET_UP_EARLY_TIME, Const.GET_UP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    if (this.settingParams?.taskID === taskType.sleepEarly) {
      if (!this.compareTime(Const.SLEEP_EARLY_TIME, Const.SLEEP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    this.settingParams.targetValue = this.currentValue;
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.target_setting')).fontSize(Const.DEFAULT_20).margin({ right: Const.DEFAULT_12 })
        Text(this.settingParams?.taskID === taskType.getup ?
        Const.GET_UP_TIME_RANGE :
            this.settingParams?.taskID === taskType.sleepEarly ?
          Const.SLEEP_TIME_RANGE : '')
          .fontSize(Const.DEFAULT_16)
      }
      .width(Const.THOUSANDTH_1000)
      .justifyContent(FlexAlign.Start)

      if ([taskType.getup, taskType.sleepEarly].indexOf(this.settingParams?.taskID) > Const.HAS_NO_INDEX) {
        TimePicker({
          selected: new Date(`${new Date().toDateString()} 8:00:00`),
        })
          .height(Const.THOUSANDTH_800)
          .useMilitaryTime(true)
          .onChange((value: TimePickerResult) => {   //hh:mm
            this.currentTime = formatTime(value);
          })
      } else {
        TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
          .width(Const.THOUSANDTH_900,)
          .height(Const.THOUSANDTH_800,)
          .onChange((value) => {
            this.currentValue = value?.split(' ')[0];
          })
      }

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = Const.DEFAULT_TIME;
            this.currentValue = '';
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.setTargetValue();
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

@CustomDialog
export struct RemindTimeDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  currentTime: string = Const.DEFAULT_TIME;

  build() {
    Column() {
      Column() {
        Text($r('app.string.remind_time'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      TimePicker({
        selected: new Date(`${new Date().toDateString()} 8:00:00`),
      })
        .height(Const.THOUSANDTH_800)
        .useMilitaryTime(true)
        .onChange((value: TimePickerResult) => {
          this.currentTime = formatTime(value);
        })

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = Const.DEFAULT_TIME;
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.settingParams.startTime = this.currentTime;
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

@CustomDialog
export struct FrequencyDialog {
  @Consume settingParams: ITaskItem;
  @Consume frequency: string;
  private controller: CustomDialogController = new CustomDialogController({ builder: '' });
  private currentFrequency: string = Const.EVERYDAY;  //每天
  private frequencyChooseRange: FrequencyContentType[] = frequencyRange();   //.length  === 7

  setFrequency() {
    //过滤 7
    const checkedArr = this.frequencyChooseRange.filter((item) => item?.isChecked)
    if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === Const.NO_LENGTH) {
      this.currentFrequency = Const.EVERYDAY;   //每天
      this.settingParams.frequency = Const.INIT_WEEK_IDS;
      return;
    }
    //星期一 星期二
    this.currentFrequency = checkedArr.reduce((sum, current) => {
      return sum + ' ' + current?.label;   //'星期一'+'星期二'
    }, '')
    //星期一 星期二
    this.settingParams.frequency = checkedArr.reduce((sum, current) => {   //'1,2'
      return sum === '' ? sum + current?.id : sum + ',' + current?.id;   //  '1'+','+2  '1,2'
    }, '')
  }

  build() {
    Column() {
      Column() {
        Text($r('app.string.set_your_frequency'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      List() {
        ForEach(this.frequencyChooseRange, (item: FrequencyContentType) => {
          ListItem() {
            Row() {
              Text(item?.label).fontSize(Const.DEFAULT_20)
              Toggle({ type: ToggleType.Checkbox })
                .onChange((isOn) => {
                  item.isChecked = isOn;
                })
            }
            .width(Const.THOUSANDTH_1000)
            .justifyContent(FlexAlign.SpaceBetween)
            .height(Const.DEFAULT_60)
          }
        }, (item: FrequencyContentType) => JSON.stringify(item))
      }
      .divider({
        strokeWidth: Const.DEFAULT_2,
        color: $r('app.color.btnBgColor')
      })
      .flexGrow(1)
      .padding(Const.DEFAULT_12)
      .width(Const.THOUSANDTH_1000)

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.setFrequency();
            this.frequency = this.currentFrequency;
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(Const.THOUSANDTH_900)
      .height(Const.DEFAULT_28)
      .margin({ bottom: Const.DEFAULT_16 })
    }
    .justifyContent(FlexAlign.Center)
    .height(Const.THOUSANDTH_900)
    .padding(Const.DEFAULT_12)
  }
}