import { Component, OnInit, Inject } from '@angular/core';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';

import { ListService } from '../core/list.service';
import { Task } from '../domain/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasksData: Task[];

  constructor(@Inject('todo') private listService: ListService) { }

  ngOnInit() {
    this.listService.getTasks(0).pipe(
      finalize(() => {
        console.log('get tasks data complete.');
        console.log(this.tasksData);
      })
    ).subscribe((value: Task[]) => {
      this.tasksData = value;
    }, (error) => {
      const errorMsg = 'get data error.';

      alert(errorMsg);
      console.log(errorMsg);
    });
  }

  /**
   * 編輯代辦清單資料
   */
  editTask(event: MouseEvent) {
    const value = (event.target as HTMLLabelElement).innerText;
    console.log('user edit', value);
  }
}
