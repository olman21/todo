import { Action } from '@ngrx/store';
import { ToDo } from '../../models/todo';

export const LOAD_TODOS = "LOAD_TODOS";
export const LOAD_TODOS_FAILED = "LOAD_TODOS_FAIL";
export const LOAD_TODOS_SUCCESS = "LOADED_TODOS";

export class LoadTodos implements Action {
    readonly type = LOAD_TODOS;
}

export class LoadTodosFailed implements Action {
    readonly type = LOAD_TODOS_FAILED;
}

export class LoadTodosSuccess implements Action {
    readonly type = LOAD_TODOS_SUCCESS;

    constructor(public payload: ToDo[]){};
}

export type todoActions = LoadTodos | LoadTodosFailed | LoadTodosSuccess;