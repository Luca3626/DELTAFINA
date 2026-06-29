using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.PortalFarms;

namespace Services
{
    public class PortalFarmServices
    {

        private ArchivesDbContext _ctx;
        //private string _connectionString;


        public PortalFarmServices(
            ArchivesDbContext ctx)
        {
            //_connectionString = connectionString;
            _ctx = ctx;
        }

        public IEnumerable<PortalFarmModel> GetList()
        {
            //using (var ctx = ArchivesDbContext.Create(_connectionString))
            //{
                var PortalFarms = from s in _ctx.PortalFarms
                                  join adr in _ctx.Addresses on s.AddressId equals adr.Id
                                  join cont in _ctx.Contacts on s.ContactId equals cont.Id
                                  where !s.IsDeleted
                                  select new PortalFarmModel()
                                  {
                                      Id = s.FarmId,
                                      Code = s.Code,
                                      City = adr.AddressCity,
                                      Email = cont.Email,
                                      Mobile = cont.MobilePhone,
                                      Name = s.Name,
                                      Phone = cont.Phone,
                                      TaxCode = s.TaxCode,
                                      Vat = s.Vat
                                  };

                return PortalFarms.AsEnumerable();
            //}            
        }

        public PortalFarmDetailModel GetById(Guid id)
        {
            var PortalFarms = from s in _ctx.PortalFarms
                              join adr in _ctx.Addresses on s.AddressId equals adr.Id
                              join cont in _ctx.Contacts on s.ContactId equals cont.Id
                              where s.FarmId == id
                              select new PortalFarmDetailModel()
                              {
                                  Id = s.FarmId,
                                  Code = s.Code,
                                  City = adr.AddressCity,
                                  Email = cont.Email,
                                  Mobile = cont.MobilePhone,
                                  Name = s.Name,
                                  Phone = cont.Phone,
                                  TaxCode = s.TaxCode,
                                  VAT = s.Vat,
                                  AddressCode = adr.AddressCode,
                                  Fax = cont.Fax,
                                  Location = adr.AddressLocation,
                                  Note = s.Note,
                                  State = adr.AddressState,
                                  Street = adr.AddressStreet,
                                  StreetNumber = adr.AddressNumber,
                                  Url = cont.Url
                              };

            return PortalFarms.FirstOrDefault();
        }

        public void CreateFromCustomer(Guid id)
        {
            PortalFarms PortalFarm = new PortalFarms()
            {
                FarmId = id
            };

            _ctx.PortalFarms.Add(PortalFarm);

            _ctx.SaveChanges();
        }

        public Guid Update(PortalFarmDetailModel model)
        {
            PortalFarms item = _ctx.PortalFarms.Where(x => x.FarmId.Equals(model.Id)).FirstOrDefault();

            if (item == null)
            {
                Guid portalFarmId = Guid.NewGuid();

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
                    PortalFarmId = portalFarmId
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
                    Fax = model.Fax,
                    Skype = null,
                    WathsApp = null,
                    Url = model.Url,
                    PortalFarmId = portalFarmId
                };

                _ctx.Add(userContact);

                //_ctx.SaveChanges();

                //if (model.AbsoluteUrlPicture == null || model.AbsoluteUrlPicture.Equals(""))
                //{
                //    model.ContentTypePicture = "images/jpg";
                //    model.FileNamePicture = "images.jpg";
                //    model.AbsoluteUrlPicture = "/assets/img/user/images.jpg";
                //}

                //Pictures userPicture = new Pictures()
                //{
                //    PictureId = new Guid().ToString(),
                //    ContentType = model.ContentTypePicture,
                //    FileName = model.FileNamePicture,
                //    RelativePath = "",
                //    RelativeUrlPath = model.AbsoluteUrlPicture,
                //    IsEnabled = true,
                //    CompanyId = null
                //};

                //_ctx.Add(userPicture);

                //_ctx.SaveChanges();

                item = new PortalFarms()
                {
                    FarmId = portalFarmId,
                    Code = model.Code != null ? model.Code : "",
                    Name = model.Name,
                    Note = null,
                    TaxCode = model.TaxCode,
                    Vat = model.VAT,
                    IsEnabled = true,
                    IsDeleted = false,
                    AddressId = userAddress.Id,
                    ContactId = userContact.Id
                    //PictureId = userPicture.PictureId
                };

                _ctx.Add<PortalFarms>(item);

                _ctx.SaveChanges();
            }
            else
            {
                PortalFarms portalFarm = _ctx.PortalFarms.Where(x => x.FarmId.Equals(model.Id)).FirstOrDefault();

                portalFarm.Name = model.Name;
                portalFarm.Note = null;
                portalFarm.TaxCode = model.TaxCode;
                portalFarm.Vat = model.VAT;
                portalFarm.Code = model.Code != null ? model.Code : "";

                Addresses userAddress = _ctx.Addresses.Where(x => x.Id == portalFarm.AddressId).FirstOrDefault();
                if (userAddress != null)
                {
                    userAddress.AddressCity = model.City;
                    userAddress.AddressCode = model.AddressCode;
                    userAddress.AddressLocation = model.Location;
                    userAddress.AddressNumber = model.StreetNumber;
                    userAddress.AddressState = model.State;
                    userAddress.AddressStreet = model.Street;
                    userAddress.PortalFarmId = portalFarm.FarmId;
                }

                Contacts userContacts = _ctx.Contacts.Where(x => x.Id == portalFarm.ContactId).FirstOrDefault();
                if (userContacts != null)
                {
                    userContacts.ContactTypeId = 1;
                    userContacts.Email = model.Email;
                    userContacts.MobilePhone = model.Mobile;
                    userContacts.Phone = model.Phone;
                    userContacts.Fax = model.Fax;
                    userContacts.Skype = null;
                    userContacts.WathsApp = null;
                    userContacts.Url = model.Url;
                    userContacts.PortalFarmId = portalFarm.FarmId;
                }

                //Pictures userPicture = _ctx.Pictures.Where(x => x.PictureId == item.PictureId).FirstOrDefault();
                //if (userPicture != null)
                //{
                //    userPicture.ContentType = model.ContentTypePicture;
                //    userPicture.FileName = model.FileNamePicture;
                //    userPicture.RelativePath = "";
                //    userPicture.RelativeUrlPath = model.AbsoluteUrlPicture;
                //}

                _ctx.SaveChanges();
            }

            return item.FarmId;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _ctx.PortalFarms.Where(x => !x.IsDeleted).OrderBy(x => x.Name))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.FarmId.ToString(),
                    Label = item.Name.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        public void DeletePortalFarm(Guid FarmId)
        {
            PortalFarms PortalFarm = _ctx.PortalFarms.Where(x => x.FarmId == FarmId).FirstOrDefault();
            if (PortalFarm != null)
            {
                _ctx.PortalFarms.Remove(PortalFarm);

                _ctx.SaveChanges();
            }
            else
                throw new Exception("PortalFarm not found");
        }
        
    }
}
