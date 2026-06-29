
export class LogParameter {
  id: string;
  description: string;
  tagName: string;
  oldValue: string;
  newValue: string;
  unity: string;
  userId: string;
  user: string;
  lastUpdate: Date;
}

export class UserDetailModel {
  userId: string = "";
  userType: string = "";
  userTypeId: number = 0;
  name: string = "";
  surname: string = "";
  fullName: string = "";
  job: string = "";
  gender: string = "";
  bornDate: Date = new Date(Date.now());
  labourCost: number = 0;
  email: string = "";
  phone: string = "";
  mobile: string = "";
  mobile2: string = "";
  street: string = "";
  streetNumber: string = "";
  addressCode: string = "";
  location: string = "";
  city: string = "";
  state: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  picture: string = "";
  roles: Array<RoleModel> = new Array<RoleModel>();
  portalFarmId: string = null;
  portalFarm: string = "";
  isGuest: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  isSuperUser: boolean;
  isSuperAdmin: boolean;

  constructor() {
    this.userTypeId = 1;//user
    this.picture = "/assets/img/users/images.jpg";
  }
}

export class UserModel {
  id: string = "";
  userName: string = "";
  email: string = "";
  fullName: string = "";
  userType: string = "";
  userTypeId: number;
  phone: string = "";
  mobile: string = "";
  city: string = "";
}

export class RoleModel {
  id: string = "";
  name: string = "";
  selected: boolean = false;
}
