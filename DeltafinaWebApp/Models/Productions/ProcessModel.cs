using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MANGANELLI_Database.Models.Productions
{
    public class MyProcessModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //public ProcessModel(EnumProcesses value)
        //{
        //    switch (value)
        //    {
        //        case EnumProcesses.Acceptance:
        //            Id = 1;
        //            Name = "Acceptance";
        //            break;
        //        case EnumProcesses.Recycle:
        //            Id = 2;
        //            Name = "Recycle";
        //            break;
        //        case EnumProcesses.Bulk:
        //            Id = 3;
        //            Name = "Bulk";
        //            break;
        //        case EnumProcesses.Shipping:
        //            Id = 4;
        //            Name = "Shipping";
        //            break;
        //        case EnumProcesses.Correction:
        //            Id = 5;
        //            Name = "Correction";
        //            break;
        //        default:
        //            break;
        //    }
        //}
    }
}