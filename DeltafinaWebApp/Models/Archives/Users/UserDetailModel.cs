using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Users
{
    public class UserDetailModel
    {
        public Guid? UserId { get; set; }
        public int UserTypeId { get; set; }
        public string UserType { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FullName { get; set; }
        public string NickName { get; set; }
        public string Job { get; set; }
        public DateTime? BornDate { get; set; }
        public string Gender { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Mobile2 { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string AddressCode { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public Guid? PictureId { get; set; }
        public string Picture { get; set; }
        public string PictureContentType { get; set; }
        public string PictureFileName { get; set; }
        public string PictureAbsoluteUrl { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Error { get; set; }
        public List<RoleModel> Roles { get; set; }
        public Guid? PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
        public bool IsGuest { get; set; }
        public bool IsStaff { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsSuperUser { get; set; }
        public bool IsSuperAdmin { get; set; }
    }
}
