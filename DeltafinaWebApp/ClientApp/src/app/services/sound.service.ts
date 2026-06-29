import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timer } from 'rxjs';

@Injectable()
export class SoundService {

  constructor(private http: HttpClient) { }

  myAlarmTimer;
  myAlarmTimerSubscription;
  isMyAlarmTimerOn = false;


  playAlarm() {
    if (!this.isMyAlarmTimerOn) {
      this.isMyAlarmTimerOn = true;

      this.myAlarmTimer = timer(1000, 1500);//300000 (5 minuti), 60000(1 minuto), 1000 (1 secondo)
      this.myAlarmTimerSubscription = this.myAlarmTimer.subscribe(t => {
        this.playAlarmAudio(t);
      });
    }
  }

  stopAlarm() {
    if (this.isMyAlarmTimerOn) {
      this.myAlarmTimerSubscription.unsubscribe();

      this.isMyAlarmTimerOn = false;
    }
  }

  playAlarmAudio(t: any) {
    let audio = new Audio();
    audio.src = "../../assets/audio/emergency030.wav";
    audio.load();
    audio.play();
  }

}
