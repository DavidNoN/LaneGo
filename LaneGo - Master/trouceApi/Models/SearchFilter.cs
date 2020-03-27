using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class SearchFilter
    {
        public string SearchString { get; set; }
        public string GenreId { get; set; }
        public string InstrumentId { get; set; }
        public string Location { get; set; }

        // public locationModel location {get; set;} 
    }
}
