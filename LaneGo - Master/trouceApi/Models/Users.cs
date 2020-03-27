using System;
using System.Collections.Generic;

namespace trouceApi.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public int? Usertype { get; set; }
        public string Artistname { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Phone { get; set; }
        public string Contactphone { get; set; }
        public string Creationdate { get; set; }
        public string City { get; set; }
        public int? Whatsapp { get; set; }
        public string Experience { get; set; }
        public string Achievements { get; set; }
        public string Services { get; set; }
        public string Paymentmethod { get; set; }
        public string Contactemail { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Picture { get; set; }
        public string Location { get; set; }
        public int? Sharelocation { get; set; }
    }
}
