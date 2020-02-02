import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../domain/Task';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() taskList: Task[];
  @Output() clearComplete = new EventEmitter<number[]>();

  isDoneNum = 0;
  isnotDoneNum = 0;

  constructor() { }

  ngOnInit() {
    this.isDoneNum = this.getTaskDoneList(true).length;
    this.isnotDoneNum = this.getTaskDoneList(false).length;
  }

  /**
   * 清除所有已完成項目
   */
  clearCompleteList() {
    const clearCompleteList = this.getTaskDoneList(true);
    const clearList = Object.values(clearCompleteList).map(item => item.id);
    console.log('get clear list', clearList);
    this.clearComplete.emit(clearList);
  }

  /**
   * 依據傳入條件決定取出的內容結果
   * @param boolean isDone 是否完成
   */
  private getTaskDoneList(isDone: boolean) {
    return this.taskList.filter((val) => {
      return (val.isDone === isDone);
    });
  }
}
