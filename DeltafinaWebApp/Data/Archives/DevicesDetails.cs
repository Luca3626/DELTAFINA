using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class DevicesDetails
    {
        public string DeviceName { get; set; }
        public double ActualPressure { get; set; }
        public int? ActualState { get; set; }
        public bool? ActualLoadEnabled { get; set; }
        public bool ActualPlcState { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}
