import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../domain/Task';
import { ListService } from '../core/list.service';

// 透過 code snippet 引入事件物件時，要注意不要用錯 import 來源
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() changeList = new EventEmitter<any>();

  constructor(@Inject('todo') private listService: ListService) { }

  ngOnInit() {
  }

  /**
   * 更新修改
   */
  updateInput(event: KeyboardEvent) {
    const newTitle = (event.target as HTMLInputElement).value;

    this.listService.postTask(newTitle).subscribe(
      (response) => {
        // 產生一個更新成功的事件通知
        this.changeList.emit(response);
        console.log('資料庫更新完成，新增資料 => ', response);
      }, (error) => {
        console.log('post error');
        alert('新增失敗，請檢查資料庫連線是否正常!');
      });
  }

  /**
   * 清除使用者的輸入
   */
  clearInput(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    target.value = '';
    console.log('Clear Input.');

  }
}
