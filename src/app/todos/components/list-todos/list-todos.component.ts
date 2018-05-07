import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToDo } from '../../models/todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTodosComponent implements OnInit {

  constructor() { }

  
  @Input() todoList: ToDo[] = [];
  @Output() todoSelected = new EventEmitter<ToDo>();
  @Output() todoDeleted = new EventEmitter<string>();

  ngOnInit() {
    
  }

  selectTodo(todo:ToDo){
    this.todoSelected.emit(todo);
  }

  deleteTodo(event,key: string){
    event.stopPropagation();
    this.todoDeleted.emit(key);
  }

}
