import { Injectable } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { ToDo } from "../models/todo";
import { map, take, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TodoService {
  constructor(private db: AngularFireDatabase) {}

  todoList = this.db.list("todos");

  getTodos(): Observable<ToDo[]> {
    return this.todoList
      .snapshotChanges()
      .pipe(
        map(t =>
          t.map(todo => {
            const payload = todo.payload.toJSON();
            return {
              id: payload["id"] as number,
              name: payload["name"] as string,
              isDone: payload["isDone"] as boolean,
              $key: todo.key
            };
          })
        ),
        take(1)
      );
  }

  addTodo(todo: ToDo) {
    this.todoList.push(todo);
  }

  updateTodo(key: string, todo: ToDo) {
    delete(todo.$key);
    this.todoList.update(key, todo);
  }
}
