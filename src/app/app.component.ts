import { Component, OnInit } from "@angular/core";
import { ToDo } from "./todos/models/todo";
import { TodoService } from "./todos/services/todo.service";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { TodoState } from "./todos/store/reducers/todo.reducer";
import * as fromTodoActions from "./todos/store/actions/todo.actions";
import { AppState } from "./todos/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  selectedTodo$: Observable<ToDo>;
  todoList$: Observable<ToDo[]>;
  loadingTodos$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  onSelectedTodo(todo: ToDo) {
    this.store.dispatch(new fromTodoActions.SelectTodo(todo));
  }

  ngOnInit(): void {
    this.store.dispatch(new fromTodoActions.LoadTodos());
    this.loadingTodos$ = this.store.select(state => state.todos.loading);
    this.todoList$ = this.store.select(state => state.todos.data);
    this.selectedTodo$ = this.store.select(state => state.todos.selected);
  }

  onSaveItem(todo: ToDo) {
    if (!todo.$key) {
      this.store.dispatch(new fromTodoActions.AddTodo(todo));
    } else {
      this.store.dispatch(
        new fromTodoActions.UpdateTodo({ key: todo.$key, todo })
      );
    }
  }

  onDeleteTodo(key: string) {
    this.store.dispatch(new fromTodoActions.DeleteTodo(key));
  }
}
