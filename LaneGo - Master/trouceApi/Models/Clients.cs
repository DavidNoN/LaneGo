using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class Clients
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Nit { get; set; }
        public int? Clienttype { get; set; }
        public string Companyname { get; set; }
        public string Representativename { get; set; }
        public string Email { get; set; }
        public string Contactnumber { get; set; }
        public string City { get; set; }
        public string Comercialactivity { get; set; }
        
        public string Password { get; set; }
    }
}
