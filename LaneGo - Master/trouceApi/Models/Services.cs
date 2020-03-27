using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class Services
    {
        public int Id { get; set; }
        public int? Userid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Price { get; set; }
        public string Categories { get; set; }
        public string Notes { get; set; }
    }
}
