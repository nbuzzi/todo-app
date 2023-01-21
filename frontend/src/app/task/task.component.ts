import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../models/task";
import { TaskService } from "../task.service";
import * as moment from "moment";

declare var Swal: any;

@Component({
  selector: "task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() onComplete = new EventEmitter<Task>();
  @Output() onStopped = new EventEmitter<Task>();

  public playButtonClass = "button play";
  public stopped = true;
  public paused = false;
  public started = false;
  public initialTimeSpent: number;
  public originalCounter: number;
  public done = false;

  constructor(protected taskService: TaskService) {}

  ngOnInit() {
    this.initialTimeSpent = this.task.timeSpent || 0;
  }

  public get cardClass() {
    return this.task.completed
      ? "card bg-success text-light mb-4"
      : "card bg-dark text-white mb-4";
  }

  public get isCompleted() {
    return this.task.completed;
  }

  public get timeSpent() {
    return moment.utc(this.initialTimeSpent * 1000).format("HH:mm:ss");
  }

  public get formattedTimeSpent() {
    return this.task.timeSpent
      ? moment.utc(this.task.timeSpent * 1000).format("HH:mm:ss")
      : "00:00:00";
  }

  handleOnComplete() {
    this.onComplete.emit(this.task);
  }

  handleOnChange(time: number) {
    this.initialTimeSpent = time;
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
    this.task.timeSpent = (this.task.timeSpent || 0) + this.initialTimeSpent;
    this.onStopped.emit(this.task);
  }

  confirm() {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      html: "You want to mark this task as completed?",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Confirm!',
      confirmButtonAriaLabel: "Thumbs up, task done!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
      cancelButtonAriaLabel: "Thumbs down",
    }).then(
      (result: {
        isConfirmed: boolean;
        isDismissed: boolean;
        isDenied: boolean;
      }) => {
        if (result.isConfirmed) {
          this.task.completed = true;
          this.task.timeSpent =
            (this.task.timeSpent || 0) + this.initialTimeSpent;
          this.taskService
            .updateTask(this.task)
            .subscribe(() => (this.done = true));
        }

        if (result.isDismissed || result.isDenied) {
          this.done = false;
        }
      }
    );
  }
}
