import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  SimpleChanges,
} from '@angular/core'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { Observable, interval, map } from 'rxjs'

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.css'],
})
export class RefreshButtonComponent implements OnInit, OnChanges {
  refreshIcon = faRefresh

  constructor() {}

  countDown: Observable<any> | undefined
  tick = 1000

  @Input()
  expires: Date | null = null

  @Output()
  refresh: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit() {}

  ngOnChanges() {
    if (!!this.expires) {
      this.countDown = interval(1000).pipe(
        map((x) => {
          const timer = Math.floor(
            (this.expires!.getTime() - new Date().getTime()) / 1000
          )
          if (timer == 0) {
            this.refresh.emit()
            return localStorage.clear()
          } else return timer
        })
      )
    }
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor((value % 3600) / 60)
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    )
  }
}
