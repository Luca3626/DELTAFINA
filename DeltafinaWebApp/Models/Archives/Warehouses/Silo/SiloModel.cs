using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Models.Archives.Warehouse.Silo
{
    public class SiloModel : WarehouseModel
    {

        public SiloModel()
        {
            WarehouseTypeId = 1;
            WarehouseType = "SILO";
        }

    }
}