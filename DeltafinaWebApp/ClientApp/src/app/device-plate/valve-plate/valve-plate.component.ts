import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'valve-plate',
  templateUrl: './valve-plate.component.html',
  styleUrls: ['valve-plate.css'],
})
export class ValvePlateComponent {

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<ValvePlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // #region Lettura dei toggle
  // I comandi sono toggle e non impulsi: il popup deve far vedere quale lato e' quello
  // attivo adesso, quindi il valore va letto oltre che scritto. Il tag puo' arrivare
  // come booleano o come stringa, come in tutte le altre letture di bit.

  isOn(tag): boolean {
    if (tag == null) return false;
    const value: any = tag.value;
    if (typeof value === "string") return value.toLowerCase() == "true" || value == "1";
    return value ? true : false;
  }

  // Cmd1: true = aperta, false = chiusa. Vale per tutte le valvole.
  get isOpen(): boolean {
    return this.isOn(this.data.valve.CMD_1);
  }

  // Cmd2: true = su, false = giu'. Solo sui martinetti idraulici.
  get isUp(): boolean {
    return this.isOn(this.data.valve.CMD_2);
  }

  // VDCC_V14_SV e BDCC_B16_SV: il flag lo mette ValveList. Solo questi due mostrano il
  // secondo toggle e il pulsante di stop; sulle altre valvole il Cmd2 non si tocca.
  get isJack(): boolean {
    return this.data.valve.IS_JACK == true;
  }
  // #endregion

  // #region Scrittura dei comandi
  // Log del parametro e poi scrittura, come in tutti gli altri popup.

  private setCmd(tag, value: boolean, label: string): void {
    if (tag == null) return;
    try {
      this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": " + label,
        tag, value ? "true" : "false", "", this.appService.user);
    } catch (e) { }
    tag.value = value;
  }

  // Apri/Chiudi sono i due lati dello stesso toggle Cmd1, non due comandi diversi.
  onOpenClick(): void {
    this.setCmd(this.data.valve.CMD_1, true, "comando 1: APRI");
  }

  onCloseClick(): void {
    this.setCmd(this.data.valve.CMD_1, false, "comando 1: CHIUDI");
  }

  // Su/Giu' sono i due lati del toggle Cmd2 del martinetto.
  onUpClick(): void {
    if (!this.isJack) return;
    this.setCmd(this.data.valve.CMD_2, true, "comando 2: SU");
  }

  onDownClick(): void {
    if (!this.isJack) return;
    this.setCmd(this.data.valve.CMD_2, false, "comando 2: GIU'");
  }

  // Stop del martinetto: spegne tutti e due i toggle.
  onStopClick(): void {
    if (!this.isJack) return;
    this.setCmd(this.data.valve.CMD_1, false, "comando 1: STOP");
    this.setCmd(this.data.valve.CMD_2, false, "comando 2: STOP");
  }
  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }
}
