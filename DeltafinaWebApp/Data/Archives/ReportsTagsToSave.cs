using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ReportsTagsToSave
    {
        public Guid ReportId { get; set; }
        public string TagLogName { get; set; }
        public int GraphicTypeId { get; set; }
        public string ValueType { get; set; }
        public string Unit { get; set; }
        public double UnitConverterFactor { get; set; }
        public byte? RoundDigit { get; set; }

        public GraphicTypes GraphicType { get; set; }
        public Reports Report { get; set; }
        public TagsToSave TagLogNameNavigation { get; set; }
        public ReportValueTypes ValueTypeNavigation { get; set; }
    }
}
