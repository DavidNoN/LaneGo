using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class ServiceProviders
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Phone { get; set; }
        public string Businessname { get; set; }
        public string Businessdescription { get; set; }
        public string Address { get; set; }
        public string Services { get; set; }
        public string Categories { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
