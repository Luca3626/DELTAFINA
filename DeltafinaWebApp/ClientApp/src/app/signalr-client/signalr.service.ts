import { Injectable } from '@angular/core';
//import * as signalR from '@microsoft/signalr';
import { Subject, Observable, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { TagsClient } from '../tags/tags-client';
import { TagsList } from '../tags/tags-list';

//@Injectable({
//  providedIn: 'root'
//})
@Injectable()
export class SignalRService {
  
  refreshTags: Boolean = false;
  packetsCount: number = 0;
  packetsCount_RI: number = 0;
  packetsCount_EF: number = 0;

  private message$: Subject<Array<TagsClient>>;

  public isOpened: boolean;
  private isOpening: boolean;

  public static tagList: TagsList;

  //private connection: signalR.HubConnection;
  private connection;


  constructor() {

    SignalRService.tagList = new TagsList();

    //OMRON
    SignalRService.tagList.list.forEach(obj => {
      obj.ValueChanged.on(newVal => {

        this.connection.invoke('SetTag', obj.plc_name, obj.id, newVal).then(res => {

          if (!res) {
            obj.actValue = obj.oldValue;
            //console.log("write ko id: " + obj.id.toString() + " - PLC: " + obj.plc_name);
          }
          //else
          //  console.log("write OK id: " + obj.id.toString() + " - PLC: " + obj.plc_name);

        }).catch(err => {
          obj.actValue = obj.oldValue;
        });

      });
    });

    this.message$ = new Subject<Array<TagsClient>>();

    const signalR = require("@microsoft/signalr");

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .build();

    ////this.connect();

    let mytimer = timer(1000, 5000);//300000 (5 minuti), 60000(1 minuto), 1000 (1 secondo)
    mytimer.subscribe(t => {
      this.oberserableTimer(t);
    });
  }

  oberserableTimer(t: any) {
    if (!this.isOpened)
      this.connect();

    else if (this.refreshTags) {

      this.refreshAllTags("OMRON");
      this.refreshAllTags_RI("S7_300");
      this.refreshAllTags_EF("MOXA");

      this.refreshTags = false;
    }
    else if (this.isOpened && !this.refreshTags) {

      //let dateAct: Date = new Date();
      //var yearAct = dateAct.getFullYear().toString();
      //var monthAct = dateAct.getMonth() + 1;
      //var dayAct = dateAct.getDate();
      //var hourAct = dateAct.getHours();
      //var minuteAct = dateAct.getMinutes();
      //var secondAct = dateAct.getSeconds();

      //Connessione stabilita correttamente
      //SignalRService.tagList.FROM_HMI_set_rtc_anno.value = dateAct.getFullYear() as any;
      //SignalRService.tagList.FROM_HMI_set_rtc_mese.value = dateAct.getMonth() + 1 as any;
      //SignalRService.tagList.FROM_HMI_set_rtc_giorno.value = dateAct.getDate() as any;
      //SignalRService.tagList.FROM_HMI_set_rtc_ora.value = dateAct.getHours() as any;
      //SignalRService.tagList.FROM_HMI_set_rtc_minuti.value = dateAct.getMinutes() as any;
      //SignalRService.tagList.FROM_HMI_set_rtc_secondi.value = dateAct.getSeconds() as any;
    
    }
  }

  public refreshAllTags(plcName: string) {

    for (let i = 0; i < this.packetsCount; i++) {
      this.RefreshTagsByPacketId(plcName, i);
    }
  }

  public refreshAllTags_RI(plcName: string) {

    for (let i = 0; i < this.packetsCount_RI; i++) {
      this.RefreshTagsByPacketId(plcName, i);
    }
  }

  public refreshAllTags_EF(plcName: string) {

    for (let i = 0; i < this.packetsCount_EF; i++) {
      this.RefreshTagsByPacketId(plcName, i);
    }
  }

  public RefreshTagsByPacketId(plcName: string, packetId: number) {

    this.connection.invoke('GetTagsOfPacket', plcName, packetId).then(res => {

      res.forEach(obj => {
        let temp: TagsClient = SignalRService.tagList.list.find(x => x.plc_name == obj.plC_NAME && x.id == obj.id);
        if (temp != null)
          temp.actValue = obj.value;
        else
          console.log("Tag missing id: " + obj.id.toString() + " - plc: " + plcName);
      });

      console.log("invoke ok");

    }).catch(err => {
      console.log(err);
    });//{ NumOfPacket: 1 })
    //  .done(function () {
    //    console.log('Invocation of NewContosoChatMessage succeeded');
    //  }).fail(function (error) {
    //    console.log('Invocation of NewContosoChatMessage failed. Error: ' + error);
    //});
  }

  private connect() {

    //this.isOpened = true;

    this.connection.start().then(res => {

      this.isOpened = true;

      //Recupero il numero di pacchetti per le OMRON
      this.connection.invoke('GetPacketsCount', "OMRON").then(res => {

        this.packetsCount = res;
        this.refreshTags = true;

        console.log("invoke ok");

      }).catch(err => {
        console.log(err);

        this.isOpened = false;
      });

      //Recupero il numero di pacchetti per le S7_300
      this.connection.invoke('GetPacketsCount', "S7_300").then(res => {

        this.packetsCount_RI = res;
        this.refreshTags = true;

        console.log("invoke ok");

      }).catch(err => {
        console.log(err);
      });

      //Recupero il numero di pacchetti per le MOXA
      this.connection.invoke('GetPacketsCount', "MOXA").then(res => {

        this.packetsCount_EF = res;
        this.refreshTags = true;

        console.log("invoke ok");

      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);

      this.isOpened = false;
    });

    this.connection.onclose(err => {
      ////this.connection.stop();
      ////this.connection.off("SendMessage");
      ////this.connection = null;
      //alert("CONNESSIONE CHIUSA DAL SERVER");

      this.isOpened = false;
    });

    this.connection.on('SendMessage', (message) => {
      //this.message$.next(message); this.connection.serverTimeoutInMilliseconds

      message.forEach(function (obj) {

        let temp: TagsClient;

        //if (obj.plC_NAME.toUpperCase() == "OMRON") {
        //  //OMRON
        //  temp = SignalRService.tagList.list.find(x => x.plc_name == obj.plC_NAME && x.id == obj.id);
        //  if (temp != null)
        //    temp.actValue = obj.value;
        //}
        temp = SignalRService.tagList.list.find(x => x.plc_name == obj.plC_NAME && x.id == obj.id);
        if (temp != null)
          temp.actValue = obj.value;

        if (temp == null)
          console.log("Tag missing id: " + obj.id.toString() + " - plc: " + obj.plC_NAME);

      });

    });

  }

  public getMessage(): Observable<Array<TagsClient>> {
    return this.message$;
  }

  public disconnect() {
    this.connection.stop();
  }

}
