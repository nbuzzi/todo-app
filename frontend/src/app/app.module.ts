import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { appRoutes } from "./app.routing";
import { TimerComponent } from "./timer/timer.component";
import { TaskComponent } from "./task/task.component";
import { TaskService } from "./task.service";
import { NewTaskComponent } from "./new-task/new-task.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    TaskComponent,
    NewTaskComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
