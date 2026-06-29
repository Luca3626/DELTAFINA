using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Account
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public bool AccountAgreed { get; set; }
        //public string Password { get; set; }
        //public string ConfirmPassword { get; set; }
        public PasswordGroup PasswordGroup { get; set; }

    }

    public class PasswordGroup
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
