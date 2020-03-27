using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class Genres
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Src { get; set; }
        public string Description { get; set; }
        public int? Amountofusers { get; set; }
    }
}
