using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Company;

namespace Services
{
    public class CompanyServices
    {

        private ArchivesDbContext _anaContext;


        public CompanyServices(
            ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }

        public IEnumerable<CompanyModel> GetList()
        {
            var Companies = from s in _anaContext.Companies
                            join comp in _anaContext.Companies on s.CompanyId equals comp.CompanyId
                            join adr in _anaContext.Addresses on comp.AddressId equals adr.Id
                            join cont in _anaContext.Contacts on comp.ContactId equals cont.Id
                            where !comp.IsDeleted
                            select new CompanyModel()
                            {
                                Id = s.CompanyId,
                                Code = comp.Code,
                                City = adr.AddressCity,
                                Email = cont.Email,
                                Mobile = cont.MobilePhone,
                                Name = comp.Name,
                                Phone = cont.Phone,
                                TaxCode = comp.TaxCode,
                                VAT = comp.Vat
                            };

            return Companies.AsEnumerable();
        }

        public IEnumerable<CompanyModel> GetListByPortalFarmId(Guid portalFarmId)
        {
            var Companies = from s in _anaContext.Companies
                            join comp in _anaContext.Companies on s.CompanyId equals comp.CompanyId
                            join adr in _anaContext.Addresses on comp.AddressId equals adr.Id
                            join cont in _anaContext.Contacts on comp.ContactId equals cont.Id
                            where !comp.IsDeleted & s.PortalFarmId == portalFarmId
                            select new CompanyModel()
                            {
                                Id = s.CompanyId,
                                Code = comp.Code,
                                City = adr.AddressCity,
                                Email = cont.Email,
                                Mobile = cont.MobilePhone,
                                Name = comp.Name,
                                Phone = cont.Phone,
                                TaxCode = comp.TaxCode,
                                VAT = comp.Vat
                            };

            return Companies.AsEnumerable();
        }

        public CustomerDetailModel GetById(Guid id)
        {
            var Companies = from s in _anaContext.Companies
                            join comp in _anaContext.Companies on s.CompanyId equals comp.CompanyId
                            join adr in _anaContext.Addresses on comp.AddressId equals adr.Id
                            join cont in _anaContext.Contacts on comp.ContactId equals cont.Id
                            where s.CompanyId == id
                            select new CustomerDetailModel()
                            {
                                Id = s.CompanyId,
                                Code = comp.Code,
                                City = adr.AddressCity,
                                Email = cont.Email,
                                Mobile = cont.MobilePhone,
                                Name = comp.Name,
                                Phone = cont.Phone,
                                TaxCode = comp.TaxCode,
                                VAT = comp.Vat,
                                AddressCode = adr.AddressCode,
                                Fax = cont.Fax,
                                Location = adr.AddressLocation,
                                Note = comp.Note,
                                State = adr.AddressState,
                                Street = adr.AddressStreet,
                                StreetNumber = adr.AddressNumber,
                                Url = cont.Url
                            };

            return Companies.FirstOrDefault();
        }

        public Guid Update(CustomerDetailModel model)
        {
            Companies item = _anaContext.Companies.Where(x => x.CompanyId.Equals(model.Id)).FirstOrDefault();

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
                    PortalFarmId = model.PortalFarmId
                };

                _anaContext.Add(userAddress);

                //_anaContext.SaveChanges();

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
                    PortalFarmId = model.PortalFarmId
                };

                _anaContext.Add(userContact);

                //_anaContext.SaveChanges();

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

                //_anaContext.Add(userPicture);

                //_anaContext.SaveChanges();

                item = new Companies()
                {
                    CompanyId = Guid.NewGuid(),
                    Code = model.Code != null ? model.Code : "",
                    Name = model.Name,
                    Note = null,
                    TaxCode = model.TaxCode,
                    Vat = model.VAT,
                    IsEnabled = true,
                    IsDeleted = false,
                    AddressId = userAddress.Id,
                    ContactId = userContact.Id,
                    //PictureId = userPicture.PictureId
                    PortalFarmId = model.PortalFarmId
                };

                _anaContext.Add<Companies>(item);

                _anaContext.SaveChanges();
            }
            else
            {
                Companies portalFarm = _anaContext.Companies.Where(x => x.CompanyId.Equals(model.Id)).FirstOrDefault();

                portalFarm.Name = model.Name;
                portalFarm.Note = null;
                portalFarm.TaxCode = model.TaxCode;
                portalFarm.Vat = model.VAT;
                portalFarm.Code = model.Code != null ? model.Code : "";

                Addresses userAddress = _anaContext.Addresses.Where(x => x.Id == portalFarm.AddressId).FirstOrDefault();
                if (userAddress != null)
                {
                    userAddress.AddressCity = model.City;
                    userAddress.AddressCode = model.AddressCode;
                    userAddress.AddressLocation = model.Location;
                    userAddress.AddressNumber = model.StreetNumber;
                    userAddress.AddressState = model.State;
                    userAddress.AddressStreet = model.Street;
                    userAddress.PortalFarmId = model.PortalFarmId;
                }

                Contacts userContacts = _anaContext.Contacts.Where(x => x.Id == portalFarm.ContactId).FirstOrDefault();
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
                    userContacts.PortalFarmId = model.PortalFarmId;
                }

                //Pictures userPicture = _anaContext.Pictures.Where(x => x.PictureId == item.PictureId).FirstOrDefault();
                //if (userPicture != null)
                //{
                //    userPicture.ContentType = model.ContentTypePicture;
                //    userPicture.FileName = model.FileNamePicture;
                //    userPicture.RelativePath = "";
                //    userPicture.RelativeUrlPath = model.AbsoluteUrlPicture;
                //}

                _anaContext.SaveChanges();
            }

            return item.CompanyId;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _anaContext.Companies.Where(x => !x.IsDeleted).OrderBy(x => x.Name))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.CompanyId.ToString(),
                    Label = item.Name.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();


            //var Companies = from s in _anaContext.Companies
            //                where !s.IsDeleted
            //                select new ResultValueLabelDisabledModel()
            //                {
            //                    Value = s.CompanyId.ToString(),
            //                    Label = s.Name,
            //                    Disabled = false
            //                };

            //return Companies.OrderBy(x => x.Label).AsEnumerable();
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledListByPortalFarmId(Guid portalFarmId)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _anaContext.Companies.Where(x => !x.IsDeleted & x.PortalFarmId == portalFarmId).OrderBy(x => x.Name))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.CompanyId.ToString(),
                    Label = item.Name.ToUpper() + " " + item.TaxCode + " " + item.Vat,
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();


            //var Companies = from s in _anaContext.Companies
            //                where !s.IsDeleted
            //                select new ResultValueLabelDisabledModel()
            //                {
            //                    Value = s.CompanyId.ToString(),
            //                    Label = s.Name,
            //                    Disabled = false
            //                };

            //return Companies.OrderBy(x => x.Label).AsEnumerable();
        }

        public void DeleteCompany(Guid CompanyId)
        {
            Companies Company = _anaContext.Companies.Where(x => x.CompanyId == CompanyId).FirstOrDefault();
            if (Company != null)
            {
                _anaContext.Companies.Remove(Company);

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Company not found");               
        }
        
    }
}
