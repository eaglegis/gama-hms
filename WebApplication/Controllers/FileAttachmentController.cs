using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;
using WebApplication.Data;
using Microsoft.Extensions.Logging;
using WebApplication.Core;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]

    public class FileAttachmentController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _context;

        public FileAttachmentController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET api/individual
        [HttpGet]
        public IEnumerable<FileAttachment> Index()
        {
            _logger.LogDebug(LoggingEvents.LIST_ITEMS, "FileAttachment Index");
            return _context.FileAttachments.ToList();
        }

        // GET api/individual
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "FileAttachment Get ({0})", id);

            FileAttachment fileAttachment = _context.FileAttachments.SingleOrDefault(I => I.Id == id);
            
            if(fileAttachment == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "FileAttachment not found ({0})", id);
                return new NotFoundResult();
            }

            return Json(fileAttachment);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Upload(Microsoft.AspNetCore.Http.IFormFile file)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "File Insert");

            _logger.LogDebug(file.Name);

            return Json("OK");
/*
            var postedFile = httpRequest.Files[file];
            var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
                        // NOTE: To store in memory use postedFile.InputStream
                    }

                    return Request.CreateResponse(HttpStatusCode.Created);
                }

                return Request.CreateResponse(HttpStatusCode.BadRequest);
            if(individual == null){
                _logger.LogWarning(LoggingEvents.INSERT_ITEM_INVALID, "Invalid Individual object");
                return new BadRequestResult();
            }

            _context.Individuals.Add(individual);
            _context.SaveChanges();

            return Json(individual);
*/
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Individual individual)
        {
            _logger.LogDebug(LoggingEvents.UPDATE_ITEM, "Individual Update ({0})", id);

            if(_context.Individuals.Any(I => I.Id == id) == false){
                _logger.LogError(LoggingEvents.UPDATE_ITEM_NOTFOUND, "Individual not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Individuals.Update(individual);
            _context.SaveChanges();

            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "Individual Delete ({0})", id);

            Individual individual = _context.Individuals.SingleOrDefault(I => I.Id == id);

            if(individual == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "Individual not found ({0})", id);
                return new NotFoundResult();
            }

            _context.Individuals.Remove(individual);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
