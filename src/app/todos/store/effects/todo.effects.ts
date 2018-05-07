import { Actions, Effect } from "@ngrx/effects";
import {
  LOAD_TODOS,
  LoadTodosSuccess,
  LoadTodosFailed,
  ADD_TODO,
  AddTodoSuccess,
  AddTodo,
  UPDATE_TODO,
  UpdateTodo,
  UpdateTodoSuccess,
  DELETE_TODO,
  DeleteTodo,
  DeleteTodoSuccess
} from "../actions/todo.actions";
import {
  switchMap,
  map,
  catchError,
  concatMap,
  mergeMap
} from "rxjs/operators";
import { TodoService } from "../../services/todo.service";
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodos = this.actions$
    .ofType(LOAD_TODOS)
    .pipe(
      switchMap(() => this.todoService.getTodos()),
      map(todos => new LoadTodosSuccess(todos)),
      catchError(error => of(new LoadTodosFailed()))
    );

  @Effect()
  addTodo = this.actions$
    .ofType(ADD_TODO)
    .pipe(
      switchMap((action: AddTodo) => this.todoService.addTodo(action.payload)),
      map(todo => new AddTodoSuccess(todo))
    );

  @Effect()
  updateTodo = this.actions$.ofType(UPDATE_TODO).pipe(
    switchMap((action: UpdateTodo) =>
      this.todoService.updateTodo(action.payload.key, action.payload.todo).map(
        () =>
          new UpdateTodoSuccess({
            key: action.payload.key,
            todo: action.payload.todo
          })
      )
    )
  );

  @Effect()
  deleteTodo = this.actions$
    .ofType(DELETE_TODO)
    .pipe(
      switchMap((action: DeleteTodo) =>
        this.todoService
          .removeTodo(action.payload)
          .map(() => new DeleteTodoSuccess(action.payload))
      )
    );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
