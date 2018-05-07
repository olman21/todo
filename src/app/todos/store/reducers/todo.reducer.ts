import { ToDo } from "../../models/todo";
import * as fromActions from "../actions/todo.actions";

export interface TodoState {
  data: ToDo[];
  loaded: boolean;
  loading: boolean;
  selected: ToDo;
}

export const initialState: TodoState = {
  data: [],
  loaded: false,
  loading: false,
  selected: undefined
};

export function reducer(
  state = initialState,
  action: fromActions.todoActions
): TodoState {
  switch (action.type) {
    case fromActions.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        data: []
      };
    }
    case fromActions.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload
      };
    }

    case fromActions.LOAD_TODOS_FAILED: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case fromActions.SELECT_TODO: {
      return {
        ...state,
        selected: action.payload
      };
    }
    case fromActions.ADD_TODO: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.ADD_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload]
      };
    }
    case fromActions.UPDATE_TODO: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.UPDATE_TODO_SUCCESS: {
      const todoIndex = state.data.findIndex(
        e => e.$key === action.payload.key
      );
      if (todoIndex === -1) return state;
      return {
        ...state,
        data: [
          ...state.data.slice(0, todoIndex),
          action.payload.todo,
          ...state.data.slice(todoIndex + 1)
        ],
        loading: false
      };
    }
    case fromActions.DELETE_TODO: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.DELETE_TODO_SUCCESS: {
      const todoIndex = state.data.findIndex(e => e.$key === action.payload);
      if (todoIndex === -1) return state;
      return {
        ...state,
        data: [
          ...state.data.slice(0, todoIndex),
          ...state.data.slice(todoIndex + 1)
        ],
        loading: false
      };
    }
    default:
      return state;
  }
}
