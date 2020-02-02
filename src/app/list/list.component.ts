import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';

import { ListService } from '../core/list.service';
import { Task, TaskStatus } from '../domain/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  taskStatus: TaskStatus; // 目前選擇要呈現的 Task 狀態
  TaskList: Task[]; // 所有 Task 狀態的清單
  showTaskList: Task[]; // 依據目前清單選擇的狀態呈現的 Task 清單

  @Input('taskList') set setShowTaskList(taskList: Task[]) {
    this.TaskList = Object.assign(taskList);
    this.taskStatus = this.taskStatus === undefined ? TaskStatus.ALL : this.taskStatus;
    this.changeTaskList();
  }
  @Input('taskStatus') set setTaskStatus(taskStatus: TaskStatus) {
    this.taskStatus = taskStatus;
    this.changeTaskList();
  }

  @Output() changeTaskStatus = new EventEmitter<any>();

  constructor(@Inject('todo') private listService: ListService) { }

  ngOnInit() {

  }

  /**
   * 編輯代辦清單資料
   */
  editTask(event: MouseEvent) {
    const value = (event.target as HTMLLabelElement).innerText;
    console.log('user edit', value);
  }

  /**
   * 變更清單狀態
   */
  changeTaskList() {
    switch (this.taskStatus) {
      case TaskStatus.ALL:
        {
          this.showTaskList = Object.assign(this.TaskList);
        }
        break;
      case TaskStatus.Active:
        {
          this.showTaskList = this.getTaskDoneList(false);
        }
        break;
      case TaskStatus.Complete:
        {
          this.showTaskList = this.getTaskDoneList(true);
        }
        break;
      default:
        console.log('TaskStatus not definde.', this.taskStatus);
        break;
    }
  }

  /**
   * 依據傳入條件決定取出的內容結果
   * @param boolean isDone 是否完成
   */
  private getTaskDoneList(isDone: boolean) {
    return this.TaskList.filter((val) => {
      return (val.isDone === isDone);
    });
  }

  /**
   * 完成項目
   */
  completeTask(event: MouseEvent) {
    const value = (event.target as HTMLInputElement);
    const changeId = value.id.replace('_CB', '');

    console.log('user complete', changeId);
    const liTask = document.getElementById(changeId + '_li');
    if (value.checked === true) {
      liTask.classList.add('completed');
    } else {
      liTask.classList.remove('completed');
    }

    this.changeTaskStatusEvent(this.TaskList.filter((todo) => {
      if (todo.id === +changeId) {
        todo.isDone = value.checked;
        return todo;
      }
    })[0]);
  }

  /**
   * 使用者觸發更改 Task 狀態事件
   * @param Task task
   */
  changeTaskStatusEvent(task: Task) {
    this.changeTaskStatus.emit(task);
  }
}
