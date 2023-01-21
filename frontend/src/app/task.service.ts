import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { Task } from "./models/task";

@Injectable()
export class TaskService {
  constructor(public httpClient: Http) {}

  getTasks() {
    return this.httpClient.get(`${environment.apiUrl}/tasks`);
  }

  getTask(id: string) {
    return this.httpClient.get(`${environment.apiUrl}/tasks/${id}`);
  }

  createTask(task: Task) {
    return this.httpClient.post(`${environment.apiUrl}/tasks`, task);
  }

  updateTask(task: Task) {
    return this.httpClient.put(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}
