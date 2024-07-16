import { ITaskItem } from '../model/TaskInitList';
import TaskList from '../view/task/TaskListComponent';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { getAllTask, taskIndexDataInit, taskOriginData } from '../viewmodel/TaskViewModel';
import TaskInfo from '../viewmodel/TaskInfo';

@Entry
@Component
@Preview
struct TaskIndex {
  @Provide taskList: ITaskItem[] = taskOriginData;

  onPageShow() {
    getAllTask().then((res: TaskInfo[]) => {
      let deepCopyDataStr = JSON.stringify(this.taskList);
      let deepCopyData: ITaskItem[] = JSON.parse(deepCopyDataStr);
      this.taskList = taskIndexDataInit(deepCopyData, res);
    })
  }

  build() {
    Row() {
      Navigation() {
        Column() {
          TaskList()
        }
        .width(Const.THOUSANDTH_1000)
        .justifyContent(FlexAlign.Center)
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title(Const.ADD_TASK_TITLE)
      .titleMode(NavigationTitleMode.Mini)
    }
    .backgroundColor($r('app.color.primaryBgColor'))
    .height(Const.THOUSANDTH_1000)
  }
}