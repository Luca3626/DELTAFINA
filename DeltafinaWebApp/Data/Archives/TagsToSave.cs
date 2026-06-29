using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class TagsToSave
    {
        public TagsToSave()
        {
            ReportsTagsToSave = new HashSet<ReportsTagsToSave>();
            TagLogging = new HashSet<TagLogging>();
        }

        public string TagLogName { get; set; }
        public string Plcname { get; set; }
        public string ZoneName { get; set; }
        public string TagPlcname { get; set; }
        public string Descriptions { get; set; }
        public string TimeCycleDetection { get; set; }
        public int CountCycleDetection { get; set; }
        public string TimeCycleForSave { get; set; }
        public int CountCycleForSave { get; set; }
        public double HysteresisValue { get; set; }
        public string HysteresisType { get; set; }
        public double? MinValue { get; set; }
        public double? MaxValue { get; set; }
        public int? RoundDigit { get; set; }
        public bool Enabled { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public Guid? UserId { get; set; }
        public DateTime? LastLog { get; set; }
        public string ValueType { get; set; }
        public string Unit { get; set; }

        public LogHysteresisTypes HysteresisTypeNavigation { get; set; }
        public LogCycleTypes TimeCycleDetectionNavigation { get; set; }
        public LogCycleTypes TimeCycleForSaveNavigation { get; set; }
        public LogValueTypes ValueTypeNavigation { get; set; }
        public ICollection<ReportsTagsToSave> ReportsTagsToSave { get; set; }
        public ICollection<TagLogging> TagLogging { get; set; }
    }
}
