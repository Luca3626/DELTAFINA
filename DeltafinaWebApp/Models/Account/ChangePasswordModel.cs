using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Account
{
    public class ChangePasswordModel
    {
        public Guid UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }

        public string ConfirmNewPassword { get; set; }

        public string Error { get; set; }
    }
}
