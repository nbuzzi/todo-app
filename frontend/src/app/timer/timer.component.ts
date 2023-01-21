import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent {
  @ViewChild("timer") timer: ElementRef;

  @Output() onCompleted = new EventEmitter();
  @Output() onChange = new EventEmitter<number>();

  @Input() time: number;
  @Input() started = false;
  @Input() paused = false;
  @Input() stopped = true;

  public currentTime = 0;
  public limit: number;

  constructor() {
    const now = new Date();
    // const countDown = moment(now).add(30, "minutes");
    const countDown = moment(now).add(1, "minute");
    this.limit = moment(countDown).diff(now, "seconds") + 1;
  }

  ngOnChanges() {
    if (this.started) {
      this.drawLoader();
    }
  }

  public drawLoader(): void {
    const π = Math.PI;
    const that = this;

    let loader = this.timer.nativeElement.querySelector("#loader");
    let border = this.timer.nativeElement.querySelector("#border");
    let svg = this.timer.nativeElement.querySelector("#svg");
    let isCompleted = false;

    (function draw() {
      if (isCompleted) {
        that.onCompleted.emit();
        return;
      }

      that.currentTime++;
      that.currentTime %= that.limit;
      let r = (that.currentTime * π) / (that.limit / 2),
        x = Math.sin(r) * 125,
        y = Math.cos(r) * -125,
        mid = that.currentTime > that.limit / 2 ? 1 : 0,
        anim = "M 0 0 v -125 A 125 125 1 " + mid + " 1 " + x + " " + y + " z";

      loader.setAttribute("d", anim);
      border.setAttribute("d", anim);
      svg.setAttribute("viewBox", "0 0 250 250");

      that.onChange.emit(that.currentTime);
      if (!that.paused && !that.stopped) {
        if (that.currentTime === that.limit - 1) {
          isCompleted = true;
        }

        setTimeout(draw, 1000);
      }
    })();
  }
}
