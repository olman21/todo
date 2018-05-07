import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToDo } from "../../models/todo";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.component.html",
  styleUrls: ["./edit-todo.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTodoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({ id: 0,name: "", isDone: false, $key: "" });
  @Input()
  set todo(value: ToDo) {
    if(!value) return;
    this.form.patchValue({
      id: value.id,
      name: value.name,
      isDone: value.isDone,
      $key: value.$key
    });
  }

  @Output() itemSaved = new EventEmitter<ToDo>();

  ngOnInit() {}

  submit(){
    return this.itemSaved.emit(this.form.value);
  }

  clearForm(){
    this.form.patchValue({ id: 0,name: "", isDone: false, $key: "" });
  }
}
