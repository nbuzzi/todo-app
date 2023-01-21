import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../task.service";
import { Task } from "../models/task";

@Component({
  selector: "new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.css"],
})
export class NewTaskComponent {
  public form: FormGroup;
  @Output() onCreated = new EventEmitter<Task>();

  constructor(protected taskService: TaskService) {
    this.form = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl("", [Validators.required]),
      completed: new FormControl(false),
    });
  }

  createTask() {
    if (this.form.valid) {
      const task: Task = this.form.value;
      // TODO: As improvement we can configure a datepicker to choose the current time spent and set it here.
      task.timeSpent = 0;
      this.taskService.createTask(task).subscribe(() => {
        this.onCreated.emit(task);
        this.form.reset();
      });
    }
  }
}
