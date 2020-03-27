using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class Publications
    {
        public int Id { get; set; }
        public int? Userid { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
    }
}
