using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Models.FileUpload;

namespace Models.Archives.Comunication
{
    public enum AS400RequestTypesEnum
    {
        CheckSilos,
        EnableLoadSilo,
        DisableAllSilos,
        DisableSilo
    }

    public class AS400RequestTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AS400RequestTypesEnum Type { get; set; }

        public AS400RequestTypeModel(AS400RequestTypesEnum type)
        {
            switch (type)
            {
                case AS400RequestTypesEnum.CheckSilos:
                    Id = 1;
                    Name = "CHECK SILOS";
                    break;
                case AS400RequestTypesEnum.EnableLoadSilo:
                    Id = 2;
                    Name = "ENABLE SILO";
                    break;
                case AS400RequestTypesEnum.DisableAllSilos:
                    Id = 3;
                    Name = "DISABLE ALL SILOS";
                    break;
                case AS400RequestTypesEnum.DisableSilo:
                    Id = 4;
                    Name = "DISABLE SILO";
                    break;
                default:
                    break;
            }
        }

        public AS400RequestTypeModel(int id)
        {
            switch (id)
            {
                case 1:
                    Id = 1;
                    Name = "CHECK SILOS";
                    Type = AS400RequestTypesEnum.CheckSilos;
                    break;
                case 2:
                    Id = 2;
                    Name = "ENBLED SILO";
                    Type = AS400RequestTypesEnum.EnableLoadSilo;
                    break;
                case 3:
                    Id = 3;
                    Name = "DISABLE ALL SILOS";
                    Type = AS400RequestTypesEnum.DisableAllSilos;
                    break;
                case 4:
                    Id = 4;
                    Name = "DISABLE SILO";
                    Type = AS400RequestTypesEnum.DisableSilo;
                    break;
                default:
                    break;
            }
        }

    }
}
