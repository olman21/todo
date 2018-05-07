import * as fromTodos from "./todo.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer
};
