import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { ZONE_COMMANDS, zoneCmdTag } from 'src/app/services/zone-commands';

@Component({
  selector: 'global-cmd-plate',
  templateUrl: './global-cmd-plate.component.html',
  styleUrls: ['global-cmd-plate.css'],
})
export class GlobalCmdPlateComponent {

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<GlobalCmdPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // #region Comandi globali di zona (DB120 - FROM_HMI)
  // Le prime 18 variabili del DB120 (escluso FROM_HMI_RESET) sono i toggle delle zone,
  // sempre a coppie: State_off_ON (0=stop, 1=start) e Mode_mn_AUT (0=man, 1=AUT).
  // I comandi globali qui sotto ripetono su tutte le zone quello che i pulsanti di zona
  // fanno su una sola (vedi onZoneState/onZoneMode della dashboard): log del parametro
  // e poi scrittura del tag.
  // NOTA: il modo della zona 2.0 (Casing Room) non sta fra le prime 18 variabili
  // ma piu' avanti nel DB, a DB120.dbx3.7.

  // Le zone e i loro due bit stanno in services/zone-commands.ts: la stessa lista che
  // usano il popup "Comandi di zona" e la dashboard, cosi' un comando globale non puo'
  // agire su zone diverse da quelle che l'operatore vede nel popup.
  private get zoneStateTags(): TagsClient[] {
    if (SignalRService.tagList == null) return [];
    return ZONE_COMMANDS.map(row => zoneCmdTag(row.stateTag));
  }

  private get zoneModeTags(): TagsClient[] {
    if (SignalRService.tagList == null) return [];
    return ZONE_COMMANDS.map(row => zoneCmdTag(row.modeTag));
  }

  // Il valore del tag puo' arrivare come booleano o come stringa/numero: stesso criterio
  // dell'helper isTrue() della dashboard, allargato a 1 / "1".
  private isOn(tag: TagsClient): boolean {
    if (tag == null) return false;
    const value = tag.value;
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  private allOn(tagList: TagsClient[]): boolean {
    return tagList.length > 0 && tagList.every(tag => this.isOn(tag));
  }

  private allOff(tagList: TagsClient[]): boolean {
    return tagList.length > 0 && tagList.every(tag => !this.isOn(tag));
  }

  // I due toggle sono mutuamente esclusivi: il pulsante che corrisponde allo stato attuale
  // resta pieno, l'altro passa a "outline". Se le zone non sono tutte allineate (stato misto,
  // p.es. dopo un comando dato sulla singola zona) nessuno dei due e' in rilievo.
  get isGlobalStart(): boolean { return this.allOn(this.zoneStateTags); }
  get isGlobalStop(): boolean { return this.allOff(this.zoneStateTags); }
  get isGlobalAut(): boolean { return this.allOn(this.zoneModeTags); }
  get isGlobalMan(): boolean { return this.allOff(this.zoneModeTags); }

  // Testo di riepilogo: le zone non sono per forza allineate, perche' ognuna ha anche
  // i suoi comandi nella pagina di zona.
  get modeText(): string {
    if (this.isGlobalAut) return "Tutte le zone in AUTOMATICO";
    if (this.isGlobalMan) return "Tutte le zone in MANUALE";
    return "Zone in stato misto (manuale e automatico)";
  }

  get stateText(): string {
    if (this.isGlobalStart) return "Tutte le zone in MARCIA";
    if (this.isGlobalStop) return "Tutte le zone FERME";
    return "Zone in stato misto (in marcia e ferme)";
  }

  private setZoneBools(tagList: TagsClient[], descrizione: string, valore: boolean): void {
    tagList.forEach(tag => {
      if (tag == null) return;
      try { this.userService.logParameterTagValues(descrizione, tag, valore, "", this.appService.user); } catch (e) { }
      tag.value = valore;
    });
  }

  // Avvia tutte le zone: State_off_ON = 1
  onGlobalStart(): void {
    this.setZoneBools(this.zoneStateTags, "Comando globale: START", true);
  }

  // Ferma tutte le zone: State_off_ON = 0 (richiede conferma)
  onGlobalStop(): void {
    this.setZoneBools(this.zoneStateTags, "Comando globale: STOP", false);
  }

  // Tutte le zone in automatico: Mode_mn_AUT = 1
  onGlobalAut(): void {
    this.setZoneBools(this.zoneModeTags, "Comando globale: AUTOMATICO", true);
  }

  // Tutte le zone in manuale: Mode_mn_AUT = 0 (richiede conferma)
  onGlobalMan(): void {
    this.setZoneBools(this.zoneModeTags, "Comando globale: MANUALE", false);
  }
  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }

}
