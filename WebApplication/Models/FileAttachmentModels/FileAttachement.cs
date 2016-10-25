using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApplication.Models
{
  public class FileAttachment
  {
      public int Id { get; set; }
      public string Filename { get; set; }
      public string ContentType { get; set; }
      public string Description { get; set; }
      public string FileContentsBase64 {get;set; }
  }
}
