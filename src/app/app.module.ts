import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { ListTodosComponent } from './todos/components/list-todos/list-todos.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { TodoService } from './todos/services/todo.service';
import { EditTodoComponent } from './todos/components/edit-todo/edit-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTodosComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'todo'),
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
