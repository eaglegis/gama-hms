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

        [HttpGet("{id}")]
        public FileResult Get(int id)
        {
            _logger.LogDebug(LoggingEvents.GET_ITEM, "FileAttachment Get ({0})", id);

            FileAttachment fileAttachment = _context.FileAttachments.SingleOrDefault(I => I.Id == id);
            
            if(fileAttachment == null){
                _logger.LogError(LoggingEvents.GET_ITEM_NOTFOUND, "FileAttachment not found ({0})", id);
                return null;
                //return new NotFoundResult();
            }

            HttpContext.Response.ContentType = fileAttachment.ContentType;
            FileContentResult result = new FileContentResult(Convert.FromBase64String(fileAttachment.FileContentsBase64), fileAttachment.ContentType);

            return result;
        }


        // POST api/values
        [HttpPost]
        public IActionResult Upload(Microsoft.AspNetCore.Http.IFormFile file)
        {
            _logger.LogDebug(LoggingEvents.INSERT_ITEM, "File Insert");
            _logger.LogDebug(file.FileName);
            _logger.LogDebug(string.Format("{0} bytes", file.Length));

            FileAttachment fileAttachment = new FileAttachment();

            fileAttachment.Filename = file.FileName;
            fileAttachment.ContentType = file.ContentType;

            if(file.Length>0){
                using (var fileStream = file.OpenReadStream())
                using (var ms = new System.IO.MemoryStream())
                {
                    fileStream.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    fileAttachment.FileContentsBase64  = Convert.ToBase64String(fileBytes);
                }

                _context.FileAttachments.Add(fileAttachment);
                _context.SaveChanges();

                return Json(fileAttachment.Id);
            } else{
                _logger.LogWarning(string.Format("File attachment {0} was empty", file.FileName));
                return new BadRequestResult();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogDebug(LoggingEvents.DELETE_ITEM, "FileAttachment Delete ({0})", id);

            FileAttachment fileAttachment = _context.FileAttachments.SingleOrDefault(I => I.Id == id);

            if(fileAttachment == null){
                _logger.LogError(LoggingEvents.DELETE_ITEM_NOT_FOUND, "FileAttachment not found ({0})", id);
                return new NotFoundResult();
            }

            _context.FileAttachments.Remove(fileAttachment);
            _context.SaveChanges();

            return new OkResult();
        }
    }
}
