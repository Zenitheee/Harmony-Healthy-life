import router from '@ohos.router';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { formatParams } from '../../viewmodel/TaskViewModel';
import { ITaskItem } from '../../model/TaskInitList';

@Component
export default struct TaskList {
  @Consume taskList: ITaskItem[];  //@Consume  @Provide   @state @Prop  @Link....

  build() {
    List({ space: Const.LIST_ITEM_SPACE }) {
      ForEach(this.taskList, (item: ITaskItem) => {
        ListItem() {
          Row() {
            Row() {
              Image(item?.icon)
                .width(Const.DEFAULT_24)
                .height(Const.DEFAULT_24)
                .margin({ right: Const.DEFAULT_8 })
              Text(item?.taskName).fontSize(Const.DEFAULT_20).fontColor($r('app.color.titleColor'))
            }.width(Const.THOUSANDTH_500)

            Blank()
              .layoutWeight(1)
            if (item?.isOpen) {
              Text($r('app.string.already_open'))
                .fontSize(Const.DEFAULT_16)
                .flexGrow(1)
                .align(Alignment.End)
                .margin({ right: Const.DEFAULT_8 })
                .fontColor($r('app.color.titleColor'))
            }
            Image($r('app.media.ic_right_grey'))
            .width(Const.DEFAULT_8)
            .height(Const.DEFAULT_16)
          }
          .width(Const.THOUSANDTH_1000)
          .justifyContent(FlexAlign.SpaceBetween)
          .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
        }
        .height(Const.THOUSANDTH_80)
        .borderRadius(Const.DEFAULT_12)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/TaskEditPage',
            params: {
              params: formatParams(item)
            }
          })
        })
        .backgroundColor($r('app.color.white'))
      }, (item: ITaskItem) => JSON.stringify(item))
    }
    .height(Const.THOUSANDTH_1000)
    .width(Const.THOUSANDTH_940)
  }
}