
namespace Models.Productions
{
    public class ProductionPathModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SourceId { get; set; }
        public string Source { get; set; }
        public int DestinationId { get; set; }
        public string Destination { get; set; }
        public int ProcessTypeId { get; set; }
        public string ProcessType { get; set; }
        public float CycleNumber { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }

    }
}