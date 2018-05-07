import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToDo } from '../../models/todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor() { }

  
  @Input() todoList: ToDo[] = [];
  @Output() todoSelected = new EventEmitter<ToDo>();

  ngOnInit() {
    
  }

  selectTodo(todo:ToDo){
    this.todoSelected.emit(todo);
  }

}
