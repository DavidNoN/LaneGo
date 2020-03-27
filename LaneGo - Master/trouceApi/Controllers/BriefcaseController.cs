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
    [Route("api/briefcase")]
    [ApiController]
    [EnableCors("*", "*", "*")]

    public class BriefcaseController : Controller
    {

        private readonly trouceContext _context;

        public BriefcaseController(trouceContext context)
        {
            _context = context;
        }

        
        [HttpPost("add")]
        public async Task<ActionResult<Users>> AddPublication()
        {
            try
            {
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEnd();
                    dynamic data = JsonConvert.DeserializeObject(body);
                    Publications publication = new Publications();
                    publication.Date = data["date"];
                    publication.Description = data["description"];
                    publication.Userid = data["userId"];
                    _context.Publications.Add(publication);
                    await _context.SaveChangesAsync();

                    var files = data["files"];
                    
                    foreach (var file in files)
                    {
                        Contents content = new Contents();
                        content.Format = file["format"];
                        content.Src = file["src"];
                        _context.Contents.Add(content);
                        await _context.SaveChangesAsync();
                        var contentId = content.Id;

    
                        PublicationContents publicationContent = new PublicationContents();
                        publicationContent.Contentid = contentId;
                        publicationContent.Pubid = publication.Id;
                        _context.PublicationContents.Add(publicationContent);                    
                        await _context.SaveChangesAsync();
                        
                    }

                    return Json(new { success = true, pubId = publication.Id});
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
    
        [HttpGet("get")]
        public JsonResult GetPortfolio(int userId) {
            var pubs = _context.Publications.Where(
                x => x.Userid == userId
            )
            .Select(x => new {
                x.Id,
                x.Description,
                x.Date,
                showedFileIndex = 0,
                files = _context.Contents.Where(c => 
                    _context.PublicationContents.Any(pc => pc.Pubid == x.Id && pc.Contentid == c.Id)
                ).ToList()

            })
            .OrderBy(x => x.Date)
            .ToList();
            return Json(new
            {
                success = true,
                publications = pubs
            });
        }

        [HttpGet("delete")]
        public JsonResult DeletePub(int id) {
            var pub = _context.Publications.FirstOrDefault(x => x.Id == id);
            var pubContents = _context.PublicationContents
                .Where(x => x.Pubid == id).ToList();
            var contents = _context.Contents.Where(c => 
                    _context.PublicationContents.Any(pc => pc.Pubid == id && pc.Contentid == c.Id)
                ).ToList();

            if (pub != null) {
                _context.Publications.Remove(pub);
            }

            if (pubContents != null) {
                _context.PublicationContents.RemoveRange(pubContents); 
            }

            if (contents != null) {
                _context.Contents.RemoveRange(contents); 
            }
            
            _context.SaveChanges();

            return Json(new
            {
                success = true
            });
        }
    }
}