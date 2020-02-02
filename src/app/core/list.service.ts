import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../domain/Task';
import { Subscribable, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// 在 Angular 使用 HttpClient 的各種 TypeScript 地雷與陷阱
// https://blog.miniasp.com/post/2019/01/20/Angular-HttpClient-Pitfall-and-Tricks

export class ListService {

  api = environment.api;

  constructor(private http: HttpClient) { }

  /**
   * 取得 Tasks 資料清單
   */
  getTasks(id: number) {
    if (id > 0) {
      return this.http.get(this.api + '?id=' + id);
    } else {
      return this.http.get(this.api);
    }

  }

  /**
   * 新增一筆 Task todo 資料
   */
  postTask(newTitle: string) {
    // TODO 暫時還不知道怎麼在 service 中操作外部傳入的事件物件
    return this.http.post<Task>(this.api, { title: newTitle, isDone: false });
  }

  /**
   * 更新一筆 Task todo 資料
   * @param number id
   * @param Task task
   */
  putTask(id: number, task: Task) {
    if (id > 0) {
      return this.http.put<Task>(this.api + '/' + id, task);
    } else {
      console.error('deleteTask => id < 0');
    }
  }

  /**
   * 刪除指定的 Tasks 資料清單
   * @param number id 要刪除的該筆資料 id
   */
  deleteTask(id: number) {
    if (id > 0) {
      return this.http.delete<Task>(this.api + '/' + id);
    } else {
      console.error('deleteTask => id < 0');
    }
  }
}
