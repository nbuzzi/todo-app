import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "../models/task";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(protected taskService: TaskService) {}

  public get pending() {
    return this.tasks.filter((t) => !t.completed && t.timeSpent === 0);
  }

  public get completed() {
    return this.tasks.filter((t) => t.completed);
  }

  public get inProgress() {
    return this.tasks.filter((t) => !t.completed && t.timeSpent > 0);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((response) => {
      this.tasks = response.json();
    });
  }

  handleOnComplete(task: Task) {
    const currentTask = this.tasks.find((t) => t.id === task.id);
    currentTask.completed = true;
    // currentTask.timeSpent = (currentTask.timeSpent || 0) + task.timeSpent;
    this.taskService.updateTask(currentTask).subscribe();
  }

  handleOnStopped(task: Task) {
    const currentTask = this.tasks.find((t) => t.id === task.id);
    // currentTask.timeSpent = (currentTask.timeSpent || 0) + task.timeSpent;
    this.taskService.updateTask(currentTask).subscribe();
  }

  onNewTaskCreated(task: Task) {
    this.tasks.push(task);
  }
}
