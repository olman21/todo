import { Injectable } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
  AngularFireAction
} from "angularfire2/database";
import { ToDo } from "../models/todo";
import { map, take, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/Observable/fromPromise";
import { DataSnapshot } from "@firebase/database-types";

@Injectable()
export class TodoService {
  constructor(private db: AngularFireDatabase) {}

  private todoList = this.db.list("todos");

  getTodos(): Observable<ToDo[]> {
    return this.todoList
      .snapshotChanges()
      .pipe(map(this.convertToDoList), take(1));
  }

  addTodo(todo: ToDo): Observable<ToDo> {
    delete todo.$key;
    return Observable.create(observer => {
      this.todoList.push(todo).then(newTodo => {
        todo.$key = newTodo.key;
        observer.next(todo);
        observer.complete();
      });
    });
  }

  updateTodo(key: string, todo: ToDo): Observable<ToDo> {
    delete todo.$key;
    return Observable.create(observer => {
      this.todoList.update(key, todo).then(() => {
        todo.$key = key;
        observer.next(todo);
        observer.complete();
      });
    });
  }

  removeTodo(key: string): Observable<any> {
    return Observable.create(observer => {
      this.todoList.remove(key).then(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  private convertToDoList(t: AngularFireAction<DataSnapshot>[]) {
    return t.map(todo => {
      const payload = todo.payload.toJSON();
      return {
        id: payload["id"] as number,
        name: payload["name"] as string,
        isDone: payload["isDone"] as boolean,
        $key: todo.key
      };
    });
  }
}
