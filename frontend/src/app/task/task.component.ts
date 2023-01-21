import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as moment from "moment";
import { Task } from "../models/task";
import { TaskService } from "../task.service";

@Component({
  selector: "task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() onComplete = new EventEmitter<Task>();
  @Output() onStopped = new EventEmitter<Task>();

  constructor(protected taskService: TaskService) {}

  public playButtonClass = "button play";
  public stopped = true;
  public paused = false;
  public started = false;

  public get cardClass() {
    return this.task.completed ? "card bg-success text-light" : "card";
  }

  public get isCompleted() {
    return this.task.completed;
  }

  handleOnComplete() {
    this.onComplete.emit(this.task);
  }

  handleOnChange(time: number) {
    this.task.timeSpent = time;
  }

  onStart() {
    this.started = true;
    this.paused = false;
    this.stopped = false;
  }

  onPause() {
    this.paused = true;
    this.stopped = false;
    this.started = false;
    this.onStopped.emit(this.task);
  }

  getTimeSpent() {
    return moment.utc(this.task.timeSpent * 1000).format("HH:mm:ss");
  }
}
