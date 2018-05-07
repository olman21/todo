import { ToDo } from "../../models/todo";
import * as fromActions from "../actions/todo.actions";

export interface TodoState {
  data: ToDo[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TodoState = {
  data: [],
  loaded: false,
  loading: false
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
        loaded: false
      };
    }
    case fromActions.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false
      };
    }

    case fromActions.LOAD_TODOS_FAILED: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    default:
      return state;
  }
}
