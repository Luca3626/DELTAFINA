using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Account
{
    public class LoginModel
    {
        //[Required]
        //[EmailAddress]
        public string Email { get; set; }

        //[Required]
        //[DataType(DataType.Password)]
        public string Password { get; set; }

        /*[Display(Name = "Remember me?")]*/
        public bool RememberMe { get; set; }

        /*[Display(Name = "Remember me?")]*/
        public string Error { get; set; }
    }
}
