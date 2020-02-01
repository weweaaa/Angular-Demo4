import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';

import { Task } from './domain/Task';
import { ListService } from './core/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'doggy-training-test';
  taskList: Task[];
  taskListNum = 0;

  ngOnInit(): void {
    this.listService.getTasks(0).pipe(
      finalize(() => {
        console.log('get tasks data complete.');
      })
    ).subscribe((value: Task[]) => {
      this.taskList = value;
      this.taskListNum = value.length;
    }, (error) => {
      const errorMsg = 'get data error.';
      this.taskListNum = 0;
    });

  }

  constructor(@Inject('todo') private listService: ListService) { }
  /**
   * 使用者觸發新增一筆 TODO 事件
   * @param Task 新增的該筆資料物件
   */
  addTodo(addTask: Task) {
    // TODO 更新 Todo 清單
    console.log(addTask);
    console.log('user add todo.');
  }
}
