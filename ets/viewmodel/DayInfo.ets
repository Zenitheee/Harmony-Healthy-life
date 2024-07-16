/**
 * DayInfo
 *
 * @param date
 * @param targetTaskNum
 * @param finTaskNum
 */
export default class DayInfo {
    date: string;
    targetTaskNum: number;
    finTaskNum: number;

    constructor(date: string, targetTaskNum: number, finTaskNum: number) {
        this.date = date;   //任务信息对应的日期
        this.targetTaskNum = targetTaskNum;  //目标任务数量
        this.finTaskNum = finTaskNum;  //实际完成的任务数量
    }
}