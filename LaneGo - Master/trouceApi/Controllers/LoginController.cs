using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using System.Threading.Tasks;
using trouceApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using System.IO;

namespace trouceApi.Controllers
{
    [Route("api/auth/login")]
    [ApiController]
    [EnableCors("*", "*", "*")]

    public class LoginController : Controller
    {
        private readonly trouceContext _context;

        public LoginController(trouceContext context)
        {
            _context = context;
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
        public async Task<ActionResult> Login()
        {
            string body = "";
            using (var reader = new StreamReader(Request.Body))
            {
                body = reader.ReadToEnd();
            }
            dynamic data = JsonConvert.DeserializeObject(body);
            string userEmail = data["email"];
            string pass = data["password"];
            pass = SHA512(pass);
            data["password"] = pass;
            string userPassword = data["password"];
            if (data == null)
            {
                return BadRequest("Invalid client request");
            }
            System.Diagnostics.Debug.WriteLine("-----------------DO QUERY----------------");
            var query = await _context.Users
                .FirstOrDefaultAsync(t => t.Email == userEmail && t.Password == userPassword);

            System.Diagnostics.Debug.WriteLine("--------------------------------------QUERY---------------------------------------");

            if (query != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("trouce.services123@"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://trouce.company:5000",
                    audience: "http://trouce.company:5000",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var userid = query.Id;
                var usertype = query.Usertype;
                query.Password = " ";
                tokeOptions.Payload["user"] = query;
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return Ok(new
                {
                    data = new
                    {
                        token = tokenString
                    },
                });
            }
            else
            {
                return Unauthorized();
            }
        }
        
    }
}