import TaskDetail from '../view/task/TaskDetailComponent';
import { CommonConstants as Const } from '../common/constants/CommonConstants';

@Entry
@Component
struct TaskEdit {
  build() {
    Row() {
      Navigation() {    //title  页面标题  menus 右上角菜单 titleMode 标题栏显示模式
        Column() {
          TaskDetail()
        }
        .width(Const.THOUSANDTH_1000)
        .height(Const.THOUSANDTH_1000)
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title(Const.EDIT_TASK_TITLE)
      .titleMode(NavigationTitleMode.Mini)  //小标题模式
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}