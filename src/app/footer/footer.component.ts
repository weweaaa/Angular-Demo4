import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../domain/Task';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() taskList: Task[];

  isDoneNum = 0;
  isnotDoneNum = 0;

  constructor() { }

  ngOnInit() {
    this.isDoneNum = this.taskList.filter((val) => {
      return (val.isDone === true);
    }).length;

    this.isnotDoneNum = this.taskList.filter((val) => {
      return (val.isDone === false);
    }).length;
  }

  /**
   * 清除所有已完成項目
   */
  clearCompleteList() {
    // TODO 清除所有已完成項目
  }
}
