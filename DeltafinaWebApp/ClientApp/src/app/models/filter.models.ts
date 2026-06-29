export class UserFilterModel {
  constructor(public userName: string,
    public email: string,
    public fullName: string,
    public userType: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class CompanyFilterModel {
  constructor(public code: string,
    public name: string,
    public taxCode: string,
    public vat: string,
    public email: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class CustomerFilterModel implements CompanyFilterModel {
  constructor(public code: string,
    public name: string,
    public taxCode: string,
    public vat: string,
    public email: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class CarrierFilterModel implements CompanyFilterModel {
  constructor(public code: string,
    public name: string,
    public taxCode: string,
    public vat: string,
    public email: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class SupplierFilterModel implements CompanyFilterModel {
  constructor(public code: string,
    public name: string,
    public taxCode: string,
    public vat: string,
    public email: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class PortalFarmFilterModel {
  constructor(public code: string,
    public name: string,
    public taxCode: string,
    public vat: string,
    public email: string,
    public phone: string,
    public mobile: string,
    public city: string) { }
}
export class ContactFilterModel {
  constructor(public code: string,
    public name: string,
    public company: string,
    public phone: string,
    public mobile: string,
    public email: string,
    public fax: string) { }
}
export class LocationFilterModel {
  constructor(public description: string,
    public note: string) { }
}
export class MaintenanceFilterModel {
  constructor(public description: string,
    public locations: string,
    public managers: string,
    public operators: string,
    public contacts: string,
    public keywords: string) { }
}
export class MaintenanceActivityFilterModel {
  constructor(public description: string,
    public state: string,
    public fromDate: string,
    public toDate: string,
    public repetitionType: string,
    public adviseType: string,
    public users: string,
    public contacts: string) { }
}
export class TagClientFilterModel {
  constructor(public id: string,
    public name: string,
    public address: string,
    public plcName: string,
    public sequence: string,
    public date: string,
    public type: string,
    public value: string) { }
}
export class MaterialFilterModel {
  constructor(public id: string,
    public code: string = "",
    public name: string = "",
    public materialTypeId: string = "",
    public materialType: string = "") { }
}
export class AcceptanceFilterModel {
  constructor(public id: string = "",
    public code: string = "",
    public supplier: string = "",
    public carrier: string = "",
    public material: string = "",
    public acceptanceState: string = "",
    public quantity: string = "",
    public batch: string = "",
    public acceptanceDate: string = "") { }
}
export class RecycleFilterModel {
  constructor(public id: string = "",
    public recycleDateStart: string = "",
    public recycleDateEnd: string = "",
    public recycleState: string = "",
    public destination: string = "",
    public source: string = "",
    public productionPath: string = "",
    public material: string = "",
    public requestedQuantity: string = "",
    public finalQuantity: string = "") { }
}

export class LuxPPRecipeFilterModel {
  constructor(public name: string,
    public zones: string,
    public lastUpdateDate: string,
    public user: string) { }
}

export class LuxPLRecipeFilterModel {
  constructor(public name: string,
    public zones: string,
    public lastUpdateDate: string,
    public user: string) { }
}

export class TrendFilterModel {
  constructor(public tagLogName: string,
    public plcName: string,
    public zoneName: string,
    public tagPlcName: string,
    public description: string,
    public timeCycleForSave: string,
    public countCycleForSave: string,
    public enabled: string,
    public lastLog: string,
    public valueType: string,
    public unit: string) { }
}

export class LogTrendFilterModel {
  constructor(public zoneName: string,
    public plcName: string,
    public tagPlcName: string,
    public description: string,
    public logDate: string,
    public logValue: string,
    public unit: string) { }
}

export class AlarmSettingFilterModel {
  constructor(public text: string,
    public zone: string,
    public plcName: string,
    public tagName: string,
    public alarmNotifyToUserOnAlarm: string,
    public alarmNotifyToOnAlarm: string,
    public alarmNotifyToUserOnReset: string,
    public alarmNotifyToOnReset: string) { }
}

export class CalendarContractOilMillFilterModel {
  constructor(public code: string,
    public customer: string,
    public workState: string,
    public start: string,
    public end: string,
    public oliveWeightExpected: string,
    public oliveWeight: string,
    public oilWeight: string,
    public returnPercent: string,
    public oilReady: string,
    public workable: string,
    public invoiced: string,
    public cultivar: string) { }
}

export class RecipeFilterModel {
  constructor(public code: string,
    public name: string,
    public note: string) { }
}

export class SiloFilterModel {
  constructor(public id: string,
    public code: string = "",
    public name: string = "",
    public materialCode: string = "",
    public material: string = "") { }
}

