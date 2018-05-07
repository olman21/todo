import { Component, OnInit } from '@angular/core';
import { ToDo } from './todos/models/todo';
import { TodoService } from './todos/services/todo.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedTodo: ToDo;
  todoList$: Observable<ToDo[]>;

  constructor(private todoService: TodoService){
    
  }

  onSelectedTodo(todo: ToDo){
    this.selectedTodo = todo;
  }

  ngOnInit(): void {
    this.todoList$ = this.todoService.getTodos();
  }

  onSaveItem(todo:ToDo){
    if(!todo.$key){
      this.todoService.addTodo(todo);
    }
    else{
      this.todoService.updateTodo(todo.$key, todo)
    }
  }
}
