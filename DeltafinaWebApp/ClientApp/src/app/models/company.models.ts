
export class CompanyDetailModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  fax: string = "";
  url: string = "";
  street: string = "";
  streetNumber: string = "";
  addressCode: string = "";
  location: string = "";
  city: string = "";
  state: string = "";
  note: string;
  portalFarmId: string = "";
  portalFarm: string = "";
}

export class CompanyModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  city: string = "";
}

export class CustomerDetailModel implements CompanyDetailModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  fax: string = "";
  url: string = "";
  street: string = "";
  streetNumber: string = "";
  addressCode: string = "";
  location: string = "";
  city: string = "";
  state: string = "";
  note: string;
  portalFarmId: string = "";
  portalFarm: string = "";
}

export class CustomerModel implements CompanyModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  city: string = "";
}

export class CarrierDetailModel implements CompanyDetailModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  fax: string = "";
  url: string = "";
  street: string = "";
  streetNumber: string = "";
  addressCode: string = "";
  location: string = "";
  city: string = "";
  state: string = "";
  note: string;
  portalFarmId: string = "";
  portalFarm: string = "";
}

export class CarrierModel implements CompanyModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  city: string = "";
}

export class SupplierDetailModel implements CompanyDetailModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  fax: string = "";
  url: string = "";
  street: string = "";
  streetNumber: string = "";
  addressCode: string = "";
  location: string = "";
  city: string = "";
  state: string = "";
  note: string;
  portalFarmId: string = "";
  portalFarm: string = "";
}

export class SupplierModel implements CompanyModel {
  id: string = "";
  code: string = "";
  name: string = "";
  taxCode: string = "";
  vat: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  city: string = "";
}
