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
    [Route("api/query")]
    [ApiController]
    [EnableCors("*", "*", "*")]

    public class InfoController : Controller
    {
        private readonly trouceContext _context;

        public InfoController(trouceContext context)
        {
            _context = context;
        }

        [HttpGet("instruments")]
        public async Task<ActionResult<IEnumerable<Instruments>>> GetInstruments()
        {
            var inst = await _context.Instruments.ToListAsync();
            try
            {
                return Json(new { success = true, instruments = inst });
            }
            catch (System.Exception e)
            {

                return Json(new { success = false, message = e });

            }
        }

        [HttpGet("instrumentsbyid")]
        public async Task<ActionResult<IEnumerable<Instruments>>> GetInstruments(string param)
        {
            var ins = await _context.Instruments.ToListAsync();
            System.Diagnostics.Debug.Write("GENRES: ");

            System.Diagnostics.Debug.Write(ins);
            System.Diagnostics.Debug.Write("------------------");
            try
            {
                if (param != null) 
                {
                    dynamic data = JsonConvert.DeserializeObject(param);
                    double id = data["id"];
                    var userInstruments = _context.Instruments.Where(instrum => _context.Userinstruments.Any(ug => ug.Userid == id
                            && ug.Instrument == instrum.Id)).ToList();
                    return Json(new { success = true, instruments = id > 0 ? 
                        userInstruments : ins });
                } else {
                    return Json(new { success = true, Genres = ins});
                }
            }
            catch (System.Exception e)
            {
                return Json(new { success = false, message = e });


            }
        }


        [HttpGet("genres")]
        public async Task<ActionResult<IEnumerable<Genres>>> GetGenres(string param)
        {
            var gen = await _context.Genres.ToListAsync();
            System.Diagnostics.Debug.Write("GENRES: ");

            System.Diagnostics.Debug.Write(gen);
            System.Diagnostics.Debug.Write("------------------");
            try
            {
                return Json(new { success = true, Genres = gen});
            }
            catch (System.Exception e)
            {

                return Json(new { success = false, message = e });

            }
        }

        [HttpGet("genresbyid")]
        public async Task<ActionResult<IEnumerable<Genres>>> GetGenresbyid(string param)
        {
            var gen = await _context.Genres.ToListAsync();
            System.Diagnostics.Debug.Write("GENRES: ");

            System.Diagnostics.Debug.Write(gen);
            System.Diagnostics.Debug.Write("------------------");
            try
            {
                if (param != null) 
                {
                    dynamic data = JsonConvert.DeserializeObject(param);
                    double id = data["id"];
                    var userGenres = _context.Genres.Where(genre => _context.Usergenres.Any(ug => ug.Userid == id
                            && ug.Genreid == genre.Id)).ToList();
                    return Json(new { success = true, Genres = id > 0 ? 
                        userGenres : gen });
                } else {
                    return Json(new { success = true, Genres = gen});
                }
            }
            catch (System.Exception e)
            {

                return Json(new { success = false, message = e });

            }
        }


        [HttpGet("search")]
        public JsonResult Search(string searchFilter)
        {
            try
            {
                dynamic data = JsonConvert.DeserializeObject(searchFilter);
            SearchFilter filter = new SearchFilter
            {
                SearchString = data["SearchString"],
                GenreId = data["Genre"], // id
                InstrumentId = data["Instrument"], // id
                Location = data["Location"],
            };

            IQueryable<Users> query = _context.Users.AsQueryable();

            if (filter.SearchString != null && filter.SearchString != "") {
              query = _context.Users.Where(
                    x => 
                    !string.IsNullOrEmpty(x.Name) && filter.SearchString.Trim().Contains(x.Name.Trim()) || 
                    !string.IsNullOrEmpty(x.Artistname) && filter.SearchString.Trim().Contains(x.Artistname.Trim()) || 
                    !string.IsNullOrEmpty(x.City) && filter.SearchString.Trim().Contains(x.City.Trim()) || 
                    !string.IsNullOrEmpty(x.Lastname) && filter.SearchString.Trim().Contains(x.Lastname.Trim()) || 
                    !string.IsNullOrEmpty(x.Achievements) && filter.SearchString.Trim().Contains(x.Achievements.Trim())
                );
            }

            if (!string.IsNullOrEmpty(filter.GenreId) && double.Parse(filter.GenreId) > 0) {
              query = _context.Users.Where(
                    x => _context.Usergenres.Any(y => y.Genreid == double.Parse(filter.GenreId) && x.Id == y.Userid)
                );
            }
            if (!string.IsNullOrEmpty(filter.InstrumentId) && double.Parse(filter.InstrumentId) > 0) {
              query = _context.Users.Where(
                    x => _context.Userinstruments.Any(y => y.Instrument == double.Parse(filter.InstrumentId) && x.Id == y.Userid)
                );
            }
            // var myLoc = new List<float>(2);

            // for (int i = 0; i < 2; ++i)
            //     myLoc.Add(0f);
            // myLoc[0] = float.Parse(filter.Location.Split(',').ToList()[0]);
            // myLoc[1] = float.Parse(filter.Location.Split(',').ToList()[1]);
            if (query != null && query.Count() > 0) {
                var results = query.Select(user => new {
                    user.Id,
                    user.Artistname,
                    user.Name,
                    user.Picture,
                    user.City,
                    distance = 0,// new Random().Next(2, 15),
                    thumbnailSrc = _context.Contents.Where(c => 
                            _context.Publications.Any(pub => pub.Userid == user.Id 
                            && _context.PublicationContents.Any(y => y.Pubid == pub.Id && y.Contentid == c.Id)
                            && string.Equals(c.Format, "image"))
                        ).FirstOrDefault().Src,
                    user.Phone,
                    user.Email,
                    user.Experience,
                    user.Achievements,
                    user.Contactemail,
                    user.Contactphone,
                    user.Services,
                    user.Paymentmethod,
                    user.Whatsapp,
                    genres = _context.Genres.Where(genre => _context.Usergenres.Any(ug => ug.Userid == user.Id
                        && ug.Genreid == genre.Id))
                    .Select(gen => new {gen.Id, gen.Name}).ToList(),
                    instruments = _context.Instruments.Where(instrument => _context.Userinstruments.Any(ui => ui.Userid == user.Id 
                        && ui.Instrument == instrument.Id))
                    .Select(ins => new {ins.Id, ins.Name}).ToList()
                }).ToList().Take(10);
             
                return Json(new
                {
                    data = results,
                    success = true
                });

            } else {
                return Json(new
                {
                    data = new List<dynamic>(0),
                    success = true
                });
            }
            }
            catch (System.Exception e)
            {
                return Json(new
                {
                    data = new List<dynamic>(0),
                    success = true
                });
            }

        }
        public double calculate(float x0, float x1, string location)
        {
            var y0 = float.Parse(location.Split(',')[0]);
            var y1 = float.Parse(location.Split(',')[1]);
            float dX = x1 - x0;
            float dY = y1 - y0;
            double distance = Math.Sqrt(dX * dX + dY * dY);
            return distance;
        }
    }
}