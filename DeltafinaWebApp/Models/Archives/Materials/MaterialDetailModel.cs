using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Models.Archives.Materials
{
    public class MaterialDetailModel
    {
        public Guid Id { get; set; }
        public string MaterialType { get; set; }
        public int MaterialTypeId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Single? SpecificWeight { get; set; }
        public string SpecificWeight_UdM { get; set; }
        public Single? ThresholdWarningTemp { get; set; }
        public Single? ThresholdAlarmTemp { get; set; }
        public string UnityOfMeasure { get; set; }
        public bool OutTotalPercentageRecipe { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
    }
}
