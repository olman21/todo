import { Action } from '@ngrx/store';
import { ToDo } from '../../models/todo';

export const LOAD_TODOS = "LOAD_TODOS";
export const LOAD_TODOS_FAILED = "LOAD_TODOS_FAIL";
export const LOAD_TODOS_SUCCESS = "LOADED_TODOS";
export const SELECT_TODO = "SELECT_TODO";
export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";

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

export class SelectTodo implements Action {
    readonly type = SELECT_TODO;

    constructor(public payload: ToDo){};
}
export class AddTodoSuccess implements Action {
    readonly type = ADD_TODO_SUCCESS;
    constructor(public payload: ToDo){};
}

export class AddTodo implements Action {
    readonly type = ADD_TODO;
    constructor(public payload: ToDo){};
}

export class UpdateTodoSuccess implements Action {
    readonly type = UPDATE_TODO_SUCCESS;
    constructor(public payload: { key: string, todo: ToDo }){};
}

export class UpdateTodo implements Action {
    readonly type = UPDATE_TODO;
    constructor(public payload: { key: string, todo: ToDo }){};
}


export class DeleteTodoSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;
    constructor(public payload: string){};
}

export class DeleteTodo implements Action {
    readonly type = DELETE_TODO;
    constructor(public payload: string){};
}


export type todoActions = LoadTodos | LoadTodosFailed | LoadTodosSuccess | SelectTodo | AddTodo | AddTodoSuccess | UpdateTodo | UpdateTodoSuccess | DeleteTodoSuccess | DeleteTodo;