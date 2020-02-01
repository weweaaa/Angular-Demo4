import { Component, EventEmitter } from '@angular/core';
import { Task } from './domain/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'doggy-training-test';

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
