using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Acks
    {
        public Guid Id { get; set; }
        public string TagName { get; set; }
        public DateTime AckDate { get; set; }
    }
}
