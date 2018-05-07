import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { EditTodoComponent } from './todos/components/edit-todo/edit-todo.component';
import { ListTodosComponent } from './todos/components/list-todos/list-todos.component';
import { TodoService } from './todos/services/todo.service';
import { reducers } from './todos/store';
import { effects } from './todos/store/effects';

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
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
