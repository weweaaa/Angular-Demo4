import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';

import { Task, TaskStatus } from './domain/Task';
import { ListService } from './core/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'doggy-training-test';
  taskList: Task[] = [];
  taskStatus = TaskStatus.ALL;
  taskListNum = 0;

  ngOnInit(): void {
    this.getTaskData();
  }

  getTaskData() {
    this.listService.getTasks(0).pipe(
      finalize(() => {
        console.log('get tasks data complete.');
      })
    ).subscribe((value: Task[]) => {
      this.taskList = value;
      this.taskListNum = value.length;
    }, (error) => {
      this.taskListNum = 0;
      const errorMsg = 'get data error.';
      alert(errorMsg);
      console.log(errorMsg);
    });
  }

  constructor(@Inject('todo') private listService: ListService) { }
  /**
   * 使用者觸發新增一筆 TODO 事件
   * @param Task 新增的該筆資料物件
   */
  addTodo(addTask: Task) {
    console.log(addTask);
    this.taskList.push(addTask);
    console.log('user add todo.');
  }

  /**
   * 清除已完成項目
   * @param number[] clearTaskIdList 要清除的 id 清單
   */
  clearCompleteEvent(clearTaskIdList: number[]) {
    if (clearTaskIdList !== undefined && clearTaskIdList.length > 0) {
      clearTaskIdList.forEach((val) => {
        this.listService.deleteTask(val).subscribe(
          (response) => {
            this.getTaskData();
            console.log('delete success.');
          },
          (error) => {
            console.error('delete faild.');
          });

        // this.taskList = this.taskList.filter((todo) => {
        //   return clearTaskIdList.find((val) => val === todo.id) === undefined;
        // });
      });
    }
  }

  /**
   * 更改 Task 的清單狀態顯示
   */
  changeShowTaskStatus(taskStatus: TaskStatus) {
    this.taskStatus = taskStatus;
  }

  /**
   * 使用者更改某比資料狀態
   */
  clickChangeTaskStatus(task: Task) {
    this.listService.putTask(task.id, task).subscribe((rsp) => {
      this.getTaskData();
      console.log('update task status success.');
    },
      (error) => {
        console.log('update task status faild.');
      });
  }
}
