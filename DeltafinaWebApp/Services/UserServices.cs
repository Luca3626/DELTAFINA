using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Account;
using Models.Archives;
using Models.Archives.Users;
using CommunicationLib;
using Models.Archives.Recipes.Glassware;

namespace Services
{
    public class UserServices
    {

        private ArchivesDbContext _ctx;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public string ConnectionString { get; set; }


        public UserServices(ArchivesDbContext ctx, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _ctx = ctx;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public UserServices(ArchivesDbContext ctx)
        {
            _ctx = ctx;
            //_userManager = userManager;
            //_signInManager = signInManager;
        }
        //public UserServices(string connectionString, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        //{
        //    ConnectionString = connectionString;
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}

        public IEnumerable<UserModel> GetAspNetUserList()//IEnumerable<ApplicationUser> appUsers)
        {
            List<UserModel> rValue = new List<UserModel>();

            foreach (var item in _userManager.Users)
            {
                Users usr = _ctx.Users.Where(x => x.UsersId == new Guid(item.Id)).FirstOrDefault();
                //if (usr == null)
                //    throw new Exception("Users " + item.UserName + " not found");

                if (usr != null)
                {
                    Pictures foto = usr.PictureId.HasValue ? _ctx.Pictures.Where(x => x.PictureId == usr.PictureId.Value).FirstOrDefault() : null;
                    Contacts contatti = _ctx.Contacts.Where(x => x.Id == usr.ContactId).FirstOrDefault();
                    Addresses address = _ctx.Addresses.Where(x => x.Id == usr.AddressId).FirstOrDefault();
                    UserTypes userTypes = _ctx.UserTypes.Where(x => x.Id == usr.UserTypeId).FirstOrDefault();

                    rValue.Add(new UserModel
                    {
                        Id = usr.UsersId,
                        UserName = item.UserName.ToUpper(),
                        Email = contatti.Email?.ToUpper() ?? null,
                        FullName = usr.FullName.ToUpper(),
                        UserType = userTypes.Description.ToUpper(),
                        Phone = contatti.Phone?.ToUpper() ?? null,
                        Mobile = contatti.MobilePhone?.ToUpper() ?? null,
                        City = address.AddressCity?.ToUpper() ?? null,
                        UserTypeId = userTypes.Id
                    });
                }
            }

            return rValue;
        }

        public IEnumerable<UserModel> GetAspNetUserListByPortalFarmId(Guid portalFarmId, Guid userId)//IEnumerable<ApplicationUser> appUsers)
        {
            Users user = _ctx.Users.Where(x => x.UsersId == userId).First();

            List<UserModel> rValue = new List<UserModel>();

            foreach (var item in _userManager.Users)
            {
                Users usr = _ctx.Users.Where(x => x.UsersId == new Guid(item.Id) & x.PortalFarmId == portalFarmId).FirstOrDefault();
                //if (usr == null)
                //    throw new Exception("Users " + item.UserName + " not found");

                if (usr != null && (user.UserTypeId > usr.UserTypeId | userId == usr.UsersId))
                {
                    Pictures foto = usr.PictureId.HasValue ? _ctx.Pictures.Where(x => x.PictureId == usr.PictureId.Value).FirstOrDefault() : null;
                    Contacts contatti = _ctx.Contacts.Where(x => x.Id == usr.ContactId).FirstOrDefault();
                    Addresses address = _ctx.Addresses.Where(x => x.Id == usr.AddressId).FirstOrDefault();
                    UserTypes userTypes = _ctx.UserTypes.Where(x => x.Id == usr.UserTypeId).FirstOrDefault();

                    rValue.Add(new UserModel
                    {
                        Id = usr.UsersId,
                        UserName = item.UserName.ToUpper(),
                        Email = contatti.Email?.ToUpper() ?? null,
                        FullName = usr.FullName.ToUpper(),
                        UserType = userTypes.Description.ToUpper(),
                        Phone = contatti.Phone?.ToUpper() ?? null,
                        Mobile = contatti.MobilePhone?.ToUpper() ?? null,
                        City = address.AddressCity?.ToUpper() ?? null,
                        UserTypeId = userTypes.Id
                    });
                }
            }

            return rValue;
        }

        public UserDetailModel GetById(Guid id)
        {
            Users usr = _ctx.Users.Where(x => x.UsersId == id).FirstOrDefault();
            if (usr == null)
                throw new Exception("User not found");
            else
            {
                Pictures foto = usr.PictureId.HasValue ? _ctx.Pictures.Where(x => x.PictureId == usr.PictureId.Value).FirstOrDefault() : null;
                Contacts contatti = _ctx.Contacts.Where(x => x.Id == usr.ContactId).FirstOrDefault();
                Addresses address = _ctx.Addresses.Where(x => x.Id == usr.AddressId).FirstOrDefault();
                PortalFarms portalFarms = _ctx.PortalFarms.Where(x => x.FarmId == usr.PortalFarmId).FirstOrDefault();

                ApplicationUser appUser = null;
                string username = "", email = "";
                IList<string> roles = new List<string>();
                foreach (var item in _userManager.Users)
                {
                    if (new Guid(item.Id) == id)
                    {
                        appUser = item;

                        username = item.UserName.ToUpper();
                        email = item.Email.ToUpper();

                        System.Threading.Tasks.Task.Run(async () => { roles = await _userManager.GetRolesAsync(item); }).Wait();
                    }
                }

                //Recupero tutti i ruoli
                List<RoleModel> allRoles = _ctx.AspNetRoles.Select(r => new RoleModel
                {
                    Id = r.Id,
                    Name = r.Name.ToUpper(),
                    Selected = roles.Contains(r.Name) ? true : false
                }).ToList();

                Guid? portalFarmId = null;
                if (portalFarms != null) portalFarmId = portalFarms.FarmId;

                UserDetailModel rValue = new UserDetailModel
                {
                    UserId = usr.UsersId,
                    UserTypeId = usr.UserTypeId,
                    Name = usr.Name?.ToUpper() ?? null,
                    Surname = usr.Surname?.ToUpper() ?? null,
                    Job = usr.Job?.ToUpper() ?? null,
                    BornDate = usr.BornDate,
                    Gender = usr.Gender?.ToUpper() ?? null,

                    Picture = foto != null ? foto.RelativeUrlPath : "/assets/img/user/images.jpg",
                    PictureId = foto?.PictureId ?? null,

                    Phone = contatti.Phone?.ToUpper() ?? null,
                    Mobile = contatti.MobilePhone?.ToUpper() ?? null,

                    Street = address.AddressStreet?.ToUpper() ?? null,
                    AddressCode = address.AddressCode?.ToUpper() ?? null,
                    StreetNumber = address.AddressNumber?.ToUpper() ?? null,
                    City = address.AddressCity?.ToUpper() ?? null,
                    State = address.AddressState?.ToUpper() ?? null,
                    Location = address.AddressLocation?.ToUpper() ?? null,

                    Username = username?.ToUpper() ?? null,
                    Email = email?.ToUpper() ?? null,
                    Roles = allRoles,//roles.ToList(),

                    Password = "",
                    ConfirmPassword = "",

                    PortalFarmId = portalFarmId,
                    PortalFarm = portalFarms != null ? portalFarms.Name : null
                };

                switch (usr.UserTypeId)
                {
                    case 1:
                        rValue.IsGuest = true;
                        break;
                    case 2:
                        rValue.IsStaff = true;
                        break;
                    case 3:
                        rValue.IsAdmin = true;
                        break;
                    case 4:
                        rValue.IsSuperUser = true;
                        break;
                    case 5:
                        rValue.IsSuperAdmin = true;
                        break;
                    default:
                        break;
                }

                return rValue;
            }
        }

        public UserDetailModel GetModelNoLoginDataById(Guid id)
        {
            Users usr = _ctx.Users.Where(x => x.UsersId == id).FirstOrDefault();
            if (usr == null)
                throw new Exception("User not found");
            else
            {
                Pictures foto = usr.PictureId.HasValue ? _ctx.Pictures.Where(x => x.PictureId == usr.PictureId.Value).FirstOrDefault() : null;
                Contacts contatti = _ctx.Contacts.Where(x => x.Id == usr.ContactId).FirstOrDefault();
                Addresses address = _ctx.Addresses.Where(x => x.Id == usr.AddressId).FirstOrDefault();
                PortalFarms portalFarms = _ctx.PortalFarms.Where(x => x.FarmId == usr.PortalFarmId).FirstOrDefault();

                Guid? portalFarmId = null;
                if (portalFarms != null) portalFarmId = portalFarms.FarmId;

                UserDetailModel rValue = new UserDetailModel
                {
                    UserId = usr.UsersId,
                    UserTypeId = usr.UserTypeId,
                    Name = usr.Name?.ToUpper() ?? null,
                    Surname = usr.Surname?.ToUpper() ?? null,
                    Job = usr.Job?.ToUpper() ?? null,
                    BornDate = usr.BornDate,
                    Gender = usr.Gender?.ToUpper() ?? null,
                    FullName = usr.FullName?.ToUpper() ?? null,

                    Picture = foto != null ? foto.RelativeUrlPath : "/assets/img/user/images.jpg",
                    PictureId = foto?.PictureId ?? null,

                    Phone = contatti.Phone?.ToUpper() ?? null,
                    Mobile = contatti.MobilePhone?.ToUpper() ?? null,

                    Street = address.AddressStreet?.ToUpper() ?? null,
                    AddressCode = address.AddressCode?.ToUpper() ?? null,
                    StreetNumber = address.AddressNumber?.ToUpper() ?? null,
                    City = address.AddressCity?.ToUpper() ?? null,
                    State = address.AddressState?.ToUpper() ?? null,
                    Location = address.AddressLocation?.ToUpper() ?? null,

                    //Username = username?.ToUpper() ?? null,
                    //Email = email?.ToUpper() ?? null,
                    //Roles = allRoles,//roles.ToList(),

                    Password = "",
                    ConfirmPassword = "",

                    PortalFarmId = portalFarmId,
                    PortalFarm = portalFarms != null ? portalFarms.Name : null
                };

                switch (usr.UserTypeId)
                {
                    case 1:
                        rValue.IsGuest = true;
                        break;
                    case 2:
                        rValue.IsStaff = true;
                        break;
                    case 3:
                        rValue.IsAdmin = true;
                        break;
                    case 4:
                        rValue.IsSuperUser = true;
                        break;
                    case 5:
                        rValue.IsSuperAdmin = true;
                        break;
                    default:
                        break;
                }

                return rValue;
            }
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetStaffsListByPortalFarmId(Guid portalFarmId)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _ctx.Users.Where(x => !x.IsDeleted & x.UserTypeId == 2 & x.PortalFarmId == portalFarmId).OrderBy(x => x.FullName))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.UsersId.ToString(),
                    Label = item.FullName.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetUsersListByPortalFarmId(Guid portalFarmId)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _ctx.Users.Where(x => !x.IsDeleted & x.UserTypeId == 1 & x.PortalFarmId == portalFarmId).OrderBy(x => x.FullName))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.UsersId.ToString(),
                    Label = item.FullName.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        public void AddLoginInfo(UserDetailModel model)
        {
            Users user = _ctx.Users.Where(x => x.UsersId.Equals(model.UserId)).FirstOrDefault();
            if (user == null)
                throw new Exception("User not found");
            //model.UserId = UpdateUser(model);

            bool someChange = false;
            ApplicationUser appUser = null;
            foreach (var item in _userManager.Users)
            {
                if (new Guid(item.Id) == user.UsersId)
                {
                    appUser = item;
                    break;
                }
            }

            if (appUser == null)
            {
                var newAppUser = new ApplicationUser { Id = model.UserId.Value.ToString(), UserName = model.Username, Email = model.Email };
                IdentityResult result = null;
                System.Threading.Tasks.Task.Run(async () => { result = await _userManager.CreateAsync(newAppUser, model.Password); }).Wait();
                if (result.Succeeded)
                {
                    //Aggiungo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        foreach (var role in model.Roles.Where(x => x.Selected))
                        {
                            System.Threading.Tasks.Task.Run(async () => { result = await _userManager.AddToRoleAsync(newAppUser, role.Name); }).Wait();
                            //_userManager.AddToRoleAsync(newAppUser, role.Name);
                        }
                        if (result != IdentityResult.Success)
                        {
                            StringBuilder sb = new StringBuilder();
                            foreach (var error in result.Errors)
                                sb.AppendLine(error.Code.ToUpper() + ": " + error.Description.ToUpper());

                            string ex = sb.ToString();
                            throw new Exception(ex);
                        }
                    }

                    //// For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
                    //// Send an email with this link
                    ////var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    ////var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                    ////await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                    ////    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
                    //await _signInManager.SignInAsync(newAppUser, isPersistent: false);
                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var error in result.Errors)
                        sb.AppendLine(error.Code.ToUpper() + ": " + error.Description.ToUpper());

                    string ex = sb.ToString();
                    throw new Exception(ex);
                }
            }
            else
            {
                IdentityResult result = null;

                if (model.Password?.Count() > 0 & model.ConfirmPassword?.Count() > 0)
                {
                    System.Threading.Tasks.Task.Run(async () => { result = await _userManager.ChangePasswordAsync(appUser, model.Password, model.ConfirmPassword); }).Wait();
                    someChange = true;
                }

                if (!(model.Password?.Count() > 0 & model.ConfirmPassword?.Count() > 0) || (result != null && result == IdentityResult.Success))
                {
                    //Rimuovo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        IList<string> oldRoles = new List<string>();
                        System.Threading.Tasks.Task.Run(async () => { oldRoles = await _userManager.GetRolesAsync(appUser); }).Wait();
                        System.Threading.Tasks.Task.Run(async () => { result = await _userManager.RemoveFromRolesAsync(appUser, oldRoles); }).Wait();

                        someChange = true;
                    }

                    //Aggiungo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        foreach (var role in model.Roles.Where(x => x.Selected))
                        {
                            System.Threading.Tasks.Task.Run(async () => { result = await _userManager.AddToRoleAsync(appUser, role.Name); }).Wait();
                            //_userManager.AddToRoleAsync(newAppUser, role.Name);

                            someChange = true;
                        }
                        if (someChange && result != IdentityResult.Success)
                        {
                            StringBuilder sb = new StringBuilder();
                            foreach (var error in result.Errors)
                                sb.AppendLine(error.Code.ToUpper() + ": " + error.Description.ToUpper());

                            string ex = sb.ToString();
                            throw new Exception(ex);
                        }
                    }

                    //var result = await _userManager.ChangePasswordAsync(appUser, model.Password, model.NewPassword);
                    if (someChange && !result.Succeeded)
                    {
                        StringBuilder sb = new StringBuilder();
                        foreach (var error in result.Errors)
                            sb.AppendLine(error.Code.ToUpper() + ": " + error.Description.ToUpper());

                        throw new Exception(sb.ToString());
                    }
                }
                else if (someChange)
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var error in result.Errors)
                        sb.AppendLine(error.Code.ToUpper() + ": " + error.Description.ToUpper());

                    string ex = sb.ToString();
                    throw new Exception(ex);
                }
            }
        }

        public Guid UpdateUser(UserDetailModel model)//, string returnUrl = null)
        {
            Users item = _ctx.Users.Where(x => x.UsersId.Equals(model.UserId)).FirstOrDefault();

            if (item == null)
            {
                Addresses userAddress = new Addresses()
                {
                    Id = Guid.NewGuid(),
                    AddressCity = model.City,
                    AddressCode = model.AddressCode,
                    AddressLocation = model.Location,
                    AddressNumber = model.StreetNumber,
                    AddressState = model.State,
                    AddressStreet = model.Street,
                    IsDeleted = false,
                    IsEnabled = true,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userAddress);

                //_ctx.SaveChanges();

                Contacts userContact = new Contacts()
                {
                    Id = Guid.NewGuid(),
                    ContactTypeId = 1,
                    Email = model.Email,
                    MobilePhone = model.Mobile,
                    Phone = model.Phone,
                    IsDeleted = false,
                    IsEnabled = true,
                    Fax = null,
                    Skype = null,
                    WathsApp = null,
                    Url = null,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userContact);

                //_ctx.SaveChanges();

                if (model.PictureAbsoluteUrl == null || model.PictureAbsoluteUrl.Equals(""))
                {
                    model.PictureContentType = "images/jpg";
                    model.PictureFileName = "images.jpg";
                    model.PictureAbsoluteUrl = "/assets/img/users/images.jpg";
                }

                Pictures userPicture = new Pictures()
                {
                    PictureId = Guid.NewGuid(),
                    ContentType = model.PictureContentType,
                    FileName = model.PictureFileName,
                    RelativePath = "",
                    RelativeUrlPath = model.PictureAbsoluteUrl,
                    IsEnabled = true,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userPicture);

                //_ctx.SaveChanges();

                item = new Users()
                {
                    UsersId = Guid.NewGuid(),
                    UserTypeId = 1,
                    Name = model.Name,
                    Surname = model.Surname,
                    FullName = model.Surname + " " + model.Name,
                    Job = model.Job,
                    NickName = null,
                    BornDate = model.BornDate,
                    Gender = model.Gender,
                    IsEnabled = true,
                    IsDeleted = false,
                    AddressId = userAddress.Id,
                    ContactId = userContact.Id,
                    PictureId = userPicture.PictureId,
                    PortalFarmId = model.PortalFarmId
                };

                _ctx.Add(item);

                _ctx.SaveChanges();

                return item.UsersId;
            }
            else
            {
                item.Name = model.Name;
                item.Surname = model.Surname;
                item.FullName = model.Name + " " + model.Surname;
                item.NickName = null;
                item.Job = model.Job;
                item.BornDate = model.BornDate;
                item.Gender = model.Gender;
                item.PortalFarmId = model.PortalFarmId;

                Addresses userAddress = _ctx.Addresses.Where(x => x.Id == item.AddressId).FirstOrDefault();
                if (userAddress != null)
                {
                    userAddress.AddressCity = model.City;
                    userAddress.AddressCode = model.AddressCode;
                    userAddress.AddressLocation = model.Location;
                    userAddress.AddressNumber = model.StreetNumber;
                    userAddress.AddressState = model.State;
                    userAddress.AddressStreet = model.Street;
                    userAddress.PortalFarmId = model.PortalFarmId ?? Guid.Empty;
                }

                Contacts userContacts = _ctx.Contacts.Where(x => x.Id == item.ContactId).FirstOrDefault();
                if (userContacts != null)
                {
                    userContacts.ContactTypeId = 1;
                    userContacts.Email = model.Email;
                    userContacts.MobilePhone = model.Mobile;
                    userContacts.Phone = model.Phone;
                    userContacts.Fax = null;
                    userContacts.Skype = null;
                    userContacts.WathsApp = null;
                    userContacts.Url = null;
                    userContacts.PortalFarmId = model.PortalFarmId ?? Guid.Empty;
                }

                //Pictures userPicture = _ctx.Pictures.Where(x => x.PictureId == item.PictureId).FirstOrDefault();
                //if (userPicture != null)
                //{
                //    userPicture.ContentType = model.PictureContentType;
                //    userPicture.FileName = model.PictureFileName;
                //    userPicture.RelativePath = "";
                //    userPicture.RelativeUrlPath = model.PictureAbsoluteUrl;
                //}

                _ctx.SaveChanges();

                return item.UsersId;
            }
        }

        public Guid UpdateUserWithLogin(UserDetailModel model)//, string returnUrl = null)
        {
            Users user = _ctx.Users.Where(x => x.UsersId.Equals(model.UserId)).FirstOrDefault();
            if (user == null)
            {
                Addresses userAddress = new Addresses()
                {
                    Id = Guid.NewGuid(),
                    AddressCity = model.City,
                    AddressCode = model.AddressCode,
                    AddressLocation = model.Location,
                    AddressNumber = model.StreetNumber,
                    AddressState = model.State,
                    AddressStreet = model.Street,
                    IsDeleted = false,
                    IsEnabled = true,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userAddress);

                Contacts userContact = new Contacts()
                {
                    Id = Guid.NewGuid(),
                    ContactTypeId = 1,
                    Email = model.Email,
                    MobilePhone = model.Mobile,
                    Phone = model.Phone,
                    IsDeleted = false,
                    IsEnabled = true,
                    Fax = null,
                    Skype = null,
                    WathsApp = null,
                    Url = null,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userContact);

                if (model.PictureAbsoluteUrl == null || model.PictureAbsoluteUrl.Equals(""))
                {
                    model.PictureContentType = "images/jpg";
                    model.PictureFileName = "images.jpg";
                    model.PictureAbsoluteUrl = "/assets/img/users/images.jpg";
                }

                Pictures userPicture = new Pictures()
                {
                    PictureId = Guid.NewGuid(),
                    ContentType = model.PictureContentType,
                    FileName = model.PictureFileName,
                    RelativePath = "",
                    RelativeUrlPath = model.PictureAbsoluteUrl,
                    IsEnabled = true,
                    PortalFarmId = model.PortalFarmId ?? Guid.Empty
                };

                _ctx.Add(userPicture);

                user = new Users()
                {
                    UsersId = Guid.NewGuid(),
                    UserTypeId = model.UserTypeId,
                    Name = model.Name,
                    Surname = model.Surname,
                    FullName = model.Surname + " " + model.Name,
                    Job = model.Job,
                    NickName = null,
                    BornDate = model.BornDate,
                    Gender = model.Gender,
                    IsEnabled = true,
                    IsDeleted = false,
                    AddressId = userAddress.Id,
                    ContactId = userContact.Id,
                    PictureId = userPicture.PictureId,
                    PortalFarmId = model.PortalFarmId
                };

                _ctx.Add(user);

                model.UserId = user.UsersId;
            }
            else
            {
                user.Name = model.Name;
                user.Surname = model.Surname;
                user.FullName = model.Name + " " + model.Surname;
                user.NickName = null;
                user.Job = model.Job;
                user.BornDate = model.BornDate;
                user.Gender = model.Gender;
                user.UserTypeId = model.UserTypeId;
                user.PortalFarmId = model.PortalFarmId;

                Addresses userAddress = _ctx.Addresses.Where(x => x.Id == user.AddressId).FirstOrDefault();
                if (userAddress != null)
                {
                    userAddress.AddressCity = model.City;
                    userAddress.AddressCode = model.AddressCode;
                    userAddress.AddressLocation = model.Location;
                    userAddress.AddressNumber = model.StreetNumber;
                    userAddress.AddressState = model.State;
                    userAddress.AddressStreet = model.Street;
                    userAddress.PortalFarmId = model.PortalFarmId ?? Guid.Empty;
                }

                Contacts userContacts = _ctx.Contacts.Where(x => x.Id == user.ContactId).FirstOrDefault();
                if (userContacts != null)
                {
                    userContacts.ContactTypeId = 1;
                    userContacts.Email = model.Email;
                    userContacts.MobilePhone = model.Mobile;
                    userContacts.Phone = model.Phone;
                    userContacts.Fax = null;
                    userContacts.Skype = null;
                    userContacts.WathsApp = null;
                    userContacts.Url = null;
                    userContacts.PortalFarmId = model.PortalFarmId ?? Guid.Empty;
                }
            }

            ApplicationUser appUser = null;
            foreach (var item in _userManager.Users)
            {
                if (new Guid(item.Id) == user.UsersId)
                {
                    appUser = item;
                    break;
                }
            }

            if (appUser == null)
            {
                var newAppUser = new ApplicationUser { Id = model.UserId.Value.ToString(), UserName = model.Username, Email = model.Email };
                IdentityResult result = null;
                System.Threading.Tasks.Task.Run(async () => { result = await _userManager.CreateAsync(newAppUser, model.Password); }).Wait();
                if (result.Succeeded)
                {
                    //Aggiungo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        foreach (var role in model.Roles.Where(x => x.Selected))
                        {
                            System.Threading.Tasks.Task.Run(async () => { result = await _userManager.AddToRoleAsync(newAppUser, role.Name); }).Wait();
                            //_userManager.AddToRoleAsync(newAppUser, role.Name);
                        }
                        if (result != IdentityResult.Success)
                        {
                            StringBuilder sb = new StringBuilder();
                            foreach (var error in result.Errors)
                                sb.AppendLine(error.Code + ": " + error.Description);

                            string ex = sb.ToString();
                            throw new Exception(ex);
                        }
                    }

                    //// For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
                    //// Send an email with this link
                    ////var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    ////var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                    ////await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                    ////    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
                    //await _signInManager.SignInAsync(newAppUser, isPersistent: false);
                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var error in result.Errors)
                        sb.AppendLine(error.Code + ": " + error.Description);

                    string ex = sb.ToString();
                    throw new Exception(ex);
                }
            }
            else
            {
                IdentityResult result = null;
                bool someChange = false;

                if (model.Password?.Count() > 0 & model.ConfirmPassword?.Count() > 0)
                {
                    System.Threading.Tasks.Task.Run(async () => { result = await _userManager.ChangePasswordAsync(appUser, model.Password, model.ConfirmPassword); }).Wait();
                    someChange = true;
                }

                if (!(model.Password?.Count() > 0 & model.ConfirmPassword?.Count() > 0) || (result != null && result == IdentityResult.Success))
                {
                    //Rimuovo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        IList<string> oldRoles = new List<string>();
                        System.Threading.Tasks.Task.Run(async () => { oldRoles = await _userManager.GetRolesAsync(appUser); }).Wait();
                        System.Threading.Tasks.Task.Run(async () => { result = await _userManager.RemoveFromRolesAsync(appUser, oldRoles); }).Wait();

                        someChange = true;
                    }

                    //Aggiungo i ruoli
                    if (model.Roles?.Count > 0)
                    {
                        foreach (var role in model.Roles.Where(x => x.Selected))
                        {
                            System.Threading.Tasks.Task.Run(async () => { result = await _userManager.AddToRoleAsync(appUser, role.Name); }).Wait();
                            //_userManager.AddToRoleAsync(newAppUser, role.Name);

                            someChange = true;
                        }
                        if (someChange && result != IdentityResult.Success)
                        {
                            StringBuilder sb = new StringBuilder();
                            foreach (var error in result.Errors)
                                sb.AppendLine(error.Code + ": " + error.Description);

                            string ex = sb.ToString();
                            throw new Exception(ex);
                        }
                    }

                    //var result = await _userManager.ChangePasswordAsync(appUser, model.Password, model.NewPassword);
                    if (someChange && !result.Succeeded)
                    {
                        StringBuilder sb = new StringBuilder();
                        foreach (var error in result.Errors)
                            sb.AppendLine(error.Code + ": " + error.Description);

                        throw new Exception(sb.ToString());
                    }
                }
                else if (someChange)
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var error in result.Errors)
                        sb.AppendLine(error.Code + ": " + error.Description);

                    string ex = sb.ToString();
                    throw new Exception(ex);
                }
            }

            _ctx.SaveChanges();

            return user.UsersId;
        }

        public bool ChangePassword(ChangePasswordModel model)
        {
            Users user = _ctx.Users.Where(x => x.UsersId.Equals(model.UserId)).FirstOrDefault();
            if (user == null)
                throw new Exception("User not found");

            ApplicationUser appUser = null;
            foreach (var item in _userManager.Users)
            {
                if (new Guid(item.Id) == user.UsersId)
                {
                    appUser = item;
                    break;
                }
            }

            if (appUser == null)
                throw new Exception("User not found");
            else
            {
                IdentityResult result = null;

                if (model.Password?.Count() > 0 & model.NewPassword?.Count() > 0)
                    System.Threading.Tasks.Task.Run(async () => { result = await _userManager.ChangePasswordAsync(appUser, model.Password, model.NewPassword); }).Wait();

                if (result != null && result == IdentityResult.Success)
                    return true;
                else
                {
                    StringBuilder sb = new StringBuilder();
                    foreach (var error in result.Errors)
                        sb.AppendLine(error.Code + ": " + error.Description);

                    string ex = sb.ToString();
                    throw new Exception(ex);
                }
            }
        }

        public Guid LogParameter(LogParameter model)
        {
            HistoricalParameterChange logParam = new HistoricalParameterChange
            {
                Id = Guid.NewGuid(),
                Description = model.Description,
                LastUpdate = DateTime.Now.ToUniversalTime(),
                NewValue = model.NewValue,
                OldValue = model.OldValue,
                TagName = model.TagName,
                Unity = model.Unity,
                UserFullName = model.User,
                UserId = model.UserId
            };

            _ctx.Add(logParam);

            _ctx.SaveChanges();

            return logParam.Id;
        }

        public Guid LogParameter(string description, Tags tag, string newValue, string unity, string user, Guid userId)
        {
            HistoricalParameterChange logParam = new HistoricalParameterChange
            {
                Id = Guid.NewGuid(),
                Description = description,
                LastUpdate = DateTime.Now.ToUniversalTime(),
                NewValue = newValue,
                OldValue = tag.VALUE.ToString(),
                TagName = tag.NAME,
                Unity = unity,
                UserFullName = user,
                UserId = userId
            };

            _ctx.Add(logParam);

            _ctx.SaveChanges();

            return logParam.Id;
        }

        public Guid LogParameter(string description, string tagName, string oldValue, string newValue, string unity, string user, Guid userId)
        {
            HistoricalParameterChange logParam = new HistoricalParameterChange
            {
                Id = Guid.NewGuid(),
                Description = description,
                LastUpdate = DateTime.Now.ToUniversalTime(),
                NewValue = newValue,
                OldValue = oldValue,
                TagName = tagName,
                Unity = unity,
                UserFullName = user,
                UserId = userId
            };

            _ctx.Add(logParam);

            _ctx.SaveChanges();

            return logParam.Id;
        }

        public void LogRecipeParams(RecipeGlasswareModel recipeOld, RecipeGlasswareModel recipeNew)
        {
            UserDetailModel user = GetModelNoLoginDataById(recipeNew.UserId);

            try { LogParameter("RICETTA: QUANTITA' S1", "PC_RIC_Q_S1", recipeOld == null ? "" : recipeOld.Components[0].QuantityMix.ToString(), recipeNew.Components[0].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S1", "PC_RIC_N_RIP_S1", recipeOld == null ? "" : recipeOld.Components[0].Repetition.ToString(), recipeNew.Components[0].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S2", "PC_RIC_Q_S2", recipeOld == null ? "" : recipeOld.Components[1].QuantityMix.ToString(), recipeNew.Components[1].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S2", "PC_RIC_N_RIP_S2", recipeOld == null ? "" : recipeOld.Components[1].Repetition.ToString(), recipeNew.Components[1].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S3", "PC_RIC_Q_S3", recipeOld == null ? "" : recipeOld.Components[2].QuantityMix.ToString(), recipeNew.Components[2].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S3", "PC_RIC_N_RIP_S3", recipeOld == null ? "" : recipeOld.Components[2].Repetition.ToString(), recipeNew.Components[2].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S4", "PC_RIC_Q_S4", recipeOld == null ? "" : recipeOld.Components[3].QuantityMix.ToString(), recipeNew.Components[3].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S4", "PC_RIC_N_RIP_S4", recipeOld == null ? "" : recipeOld.Components[3].Repetition.ToString(), recipeNew.Components[3].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S5", "PC_RIC_Q_S5", recipeOld == null ? "" : recipeOld.Components[4].QuantityMix.ToString(), recipeNew.Components[4].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S5", "PC_RIC_N_RIP_S5", recipeOld == null ? "" : recipeOld.Components[4].Repetition.ToString(), recipeNew.Components[4].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S6", "PC_RIC_Q_S6", recipeOld == null ? "" : recipeOld.Components[5].QuantityMix.ToString(), recipeNew.Components[5].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S6", "PC_RIC_N_RIP_S6", recipeOld == null ? "" : recipeOld.Components[5].Repetition.ToString(), recipeNew.Components[5].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S7", "PC_RIC_Q_S7", recipeOld == null ? "" : recipeOld.Components[6].QuantityMix.ToString(), recipeNew.Components[6].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S7", "PC_RIC_N_RIP_S7", recipeOld == null ? "" : recipeOld.Components[6].Repetition.ToString(), recipeNew.Components[6].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S8", "PC_RIC_Q_S8", recipeOld == null ? "" : recipeOld.Components[7].QuantityMix.ToString(), recipeNew.Components[7].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S8", "PC_RIC_N_RIP_S8", recipeOld == null ? "" : recipeOld.Components[7].Repetition.ToString(), recipeNew.Components[7].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S9", "PC_RIC_Q_S9", recipeOld == null ? "" : recipeOld.Components[8].QuantityMix.ToString(), recipeNew.Components[8].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S9", "PC_RIC_N_RIP_S9", recipeOld == null ? "" : recipeOld.Components[8].Repetition.ToString(), recipeNew.Components[8].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S10", "PC_RIC_Q_S10", recipeOld == null ? "" : recipeOld.Components[9].QuantityMix.ToString(), recipeNew.Components[9].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S10", "PC_RIC_N_RIP_S10", recipeOld == null ? "" : recipeOld.Components[9].Repetition.ToString(), recipeNew.Components[9].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S11", "PC_RIC_Q_S11", recipeOld == null ? "" : recipeOld.Components[10].QuantityMix.ToString(), recipeNew.Components[10].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S11", "PC_RIC_N_RIP_S11", recipeOld == null ? "" : recipeOld.Components[10].Repetition.ToString(), recipeNew.Components[10].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S12", "PC_RIC_Q_S12", recipeOld == null ? "" : recipeOld.Components[11].QuantityMix.ToString(), recipeNew.Components[11].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S12", "PC_RIC_N_RIP_S12", recipeOld == null ? "" : recipeOld.Components[11].Repetition.ToString(), recipeNew.Components[11].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S13", "PC_RIC_Q_S13", recipeOld == null ? "" : recipeOld.Components[12].QuantityMix.ToString(), recipeNew.Components[12].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S13", "PC_RIC_N_RIP_S13", recipeOld == null ? "" : recipeOld.Components[12].Repetition.ToString(), recipeNew.Components[12].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S14", "PC_RIC_Q_S14", recipeOld == null ? "" : recipeOld.Components[13].QuantityMix.ToString(), recipeNew.Components[13].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S14", "PC_RIC_N_RIP_S14", recipeOld == null ? "" : recipeOld.Components[13].Repetition.ToString(), recipeNew.Components[13].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S15", "PC_RIC_Q_S15", recipeOld == null ? "" : recipeOld.Components[14].QuantityMix.ToString(), recipeNew.Components[14].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S15", "PC_RIC_N_RIP_S15", recipeOld == null ? "" : recipeOld.Components[14].Repetition.ToString(), recipeNew.Components[14].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' S16", "PC_RIC_Q_S16", recipeOld == null ? "" : recipeOld.Components[15].QuantityMix.ToString(), recipeNew.Components[15].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI S16", "PC_RIC_N_RIP_S16", recipeOld == null ? "" : recipeOld.Components[15].Repetition.ToString(), recipeNew.Components[15].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' TP6", "PC_RIC_Q_TP6", recipeOld == null ? "" : recipeOld.Components[16].QuantityMix.ToString(), recipeNew.Components[16].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI TP6", "PC_RIC_N_RIP_TP6", recipeOld == null ? "" : recipeOld.Components[16].Repetition.ToString(), recipeNew.Components[16].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

            try { LogParameter("RICETTA: QUANTITA' TP6A", "PC_RIC_Q_TP6A", recipeOld == null ? "" : recipeOld.Components[17].QuantityMix.ToString(), recipeNew.Components[17].QuantityMix.ToString(), "Kg", user.FullName, recipeNew.UserId); } catch (Exception) { }
            try { LogParameter("RICETTA: RIPETIZIONI TP6A", "PC_RIC_N_RIP_TP6A", recipeOld == null ? "" : recipeOld.Components[17].Repetition.ToString(), recipeNew.Components[17].Repetition.ToString(), "N", user.FullName, recipeNew.UserId); } catch (Exception) { }

        }

    }
}
