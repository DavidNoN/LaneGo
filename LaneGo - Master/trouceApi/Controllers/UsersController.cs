using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using System.Threading.Tasks;
using trouceApi.Models;
using System;
using System.IO;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Globalization;

namespace TodoApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    [EnableCors("*", "*", "*")]

    public class UsersController : Controller
    {

        private readonly trouceContext _context;

        public UsersController(trouceContext context)
        {
            _context = context;
        }

        // GET: api/providers
        [HttpGet("clients")]
        public async Task<ActionResult<IEnumerable<Users>>> GetClients()
        {

            return await _context.Users
            .Where(t => t.Usertype == 0).ToListAsync();
        }

        [HttpGet("providers")]
        public async Task<ActionResult<IEnumerable<Users>>> GetServiceProviders()
        {
            return await _context.Users
           .Where(t => t.Usertype == 1).ToListAsync();
        }
         public static string SHA512(string input)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(input);
            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new System.Text.StringBuilder(128);
                foreach (var b in hashedInputBytes)
                    hashedInputStringBuilder.Append(b.ToString("X2"));
                return hashedInputStringBuilder.ToString();
            }
        }
        // GET: api/users/register?form  
        [HttpPost("register")]
        public async Task<ActionResult<Users>> RegisterUser()
        {
            try
            {
                System.Diagnostics.Debug.WriteLine("WORKING REGISTER");
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEnd();
                    dynamic data = JsonConvert.DeserializeObject(body);
                    Users newUser = new Users();
                    newUser.Name = data["fullName"];
                    newUser.Email = data["email"];
                    string pass = data["password"];
                    pass = SHA512(pass);
                    data["password"] = pass;
                    newUser.Password = data["password"];
                    _context.Users.Add(newUser);
                    await _context.SaveChangesAsync();
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("trouce.services123@"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://trouce.company:5000",
                        audience: "http://trouce.company:5000",
                        claims: new List<Claim>(),
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Json(new { success = true, token = tokenString });
                }
            }
            catch (System.Exception e)
            {
                System.Diagnostics.Debug.Write(e);
                return Json(new
                {
                    success = false,
                    message = "Could not add user to the Data Base"
                });
            }

        }

        [HttpPost("refreshtoken")]
        public async Task<ActionResult<Users>> RefreshToken()
        {
            try
            {
                System.Diagnostics.Debug.WriteLine("WORKING");
                using (var reader = new StreamReader(Request.Body))
                {
                    var stringParams = reader.ReadToEnd();
                    dynamic data = JsonConvert.DeserializeObject(stringParams);
                    var id = (int)data["userId"];
                    var user = _context.Users.FirstOrDefault(x => x.Id == id);
                    if (user != null) {
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("trouce.services123@"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                            issuer: "http://trouce.company:5000",
                            audience: "http://trouce.company:5000",
                            claims: new List<Claim>(),
                            expires: DateTime.Now.AddMinutes(5),
                            signingCredentials: signinCredentials
                        );
                        tokeOptions.Payload["user"] = user;
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return Json(new { success = true, data = new {token = tokenString }});
                    } else {
                        return Json(new { success = false});
                    }

                }
            }
            catch (System.Exception e)
            {
                System.Diagnostics.Debug.Write(e);
                return Json(new
                {
                    success = false,
                    message = "Could not add user to the Data Base"
                });
            }

        }
        
        [HttpPost("updateinfo")]
        public async Task<ActionResult<Users>> UpdateInfo()
        {
            try
            {
                
                
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEnd();
                    System.Diagnostics.Debug.WriteLine(body);
                    dynamic bodyString = JsonConvert.DeserializeObject(body);
                    var bodyParams = bodyString["params"];
                    var formString = bodyParams["form"];
                    System.Diagnostics.Debug.WriteLine("WORKING");
                    // System.Diagnostics.Debug.WriteLine(formString);
                    System.Diagnostics.Debug.WriteLine("-----------");

                    var data = JsonConvert.DeserializeObject(formString.Value);
                    
                    int userid = (int)data["id"];
                    string delqueryid = data["id"];
                    string delquery = "DELETE FROM Usergenres WHERE userid =" + delqueryid;
                    _context.Database.ExecuteSqlCommand(delquery);
                    foreach (var g in data["genres"])
                    {   
                        Usergenres newG = new Usergenres ();
                        newG.Userid = userid;
                        newG.Genreid = g;
                        _context.Usergenres.Add(newG);
                    }
                    delquery = "DELETE FROM Userinstruments WHERE userid =" + delqueryid;
                    _context.Database.ExecuteSqlCommand(delquery);
                    foreach (var i in data["instruments"])
                    {   
                        Userinstruments newI = new Userinstruments ();
                        newI.Userid = userid;
                        newI.Instrument = i;
                        _context.Userinstruments.Add(newI);
                    }

                    var query = _context.Users.
                        FirstOrDefault(t => t.Id == userid);
                    if (query != null)
                    {
                        query.Artistname = data["artistname"];
                        query.Name = data["name"];
                        query.Lastname = data["lastName"];
                        query.Creationdate = data["creationdate"];
                        query.City = data["originCity"];
                        query.Whatsapp = (int)data["whatsapp"];
                        query.Experience = data["experience"];
                        query.Achievements = data["achievements"];
                        query.Services = data["services"];
                        query.Contactemail = data["contactemail"];
                        query.Phone = data["phone"];
                        query.Contactphone = data["contactphone"];
                        query.Picture = data["picture"];
                        query.Sharelocation = data["shareLocation"];
                        query.Location = data["location"];
                        if(data["password"] != "notchanged"){
                            string  hashedPassword = SHA512(data["password"]);
                            data["password"] = "¿De que me hablas viejo?";
                            query.Password = hashedPassword;  
                        }
                        await _context.SaveChangesAsync();
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("trouce.services123@"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                            issuer: "http://trouce.company:5000",
                            audience: "http://trouce.company:5000",
                            claims: new List<Claim>(),
                            expires: DateTime.Now.AddMinutes(5),
                            signingCredentials: signinCredentials
                        );
                        tokeOptions.Payload["user"] = query;
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return Json(new
                        {
                            success = true,
                            id = userid,
                            userInfo = query,
                            token = tokenString
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            success = false,
                            message = "Could not modify user's information"
                        });
                    }
                }
            }
            catch (System.Exception e)
            {

                System.Diagnostics.Debug.Write(e);
                return Json(new
                {
                    success = false,
                    message = "Could not modify user's information"
                });
            }

        }

        [HttpGet("getinfo")]
        public async Task<ActionResult<Users>> GetUserInfo(int id)
        {
            var query = await _context.Users
                .FirstOrDefaultAsync(t => t.Id == id);
            return Json(new { userinfo = query });

        }
        // [HttpGet("search")]
        // public async Task<ActionResult<Users>> SearchService(string searchFilter)
        // {
        //     var result = Json(new
        //     {
        //         success = false
        //     });
        //     try
        //     {
        //         dynamic data = JsonConvert.DeserializeObject(searchFilter);
        //         SearchFilter filter = new SearchFilter
        //         {
        //             SearchString = data["SearchString"],
        //             Category = data["Category"]
        //         };
        //         using (var business = new SearchBusiness(_context))
        //         {
        //             var searchResults = business.search(filter);
        //             return Json(new
        //             {
        //                 data = searchResults,
        //                 success = true
        //             });
        //         }
        //     }
        //     catch (Exception e)
        //     {
        //         System.Diagnostics.Debug.WriteLine(e);
        //         return result;
        //     }
        // }

        // [HttpGet("searchCategory")]
        // public async Task<ActionResult<Users>> SearchServiceByCategory(string service)
        // {
        //     var query = await _context.Users
        //         .Where(t => t.Categories.Trim().Contains(service))
        //         .ToListAsync();

        //     return Json(new
        //     {
        //         data = query,
        //         success = true
        //     });
        // }
        static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
       
    }

}