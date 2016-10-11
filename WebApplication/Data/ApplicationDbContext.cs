using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication.Models;

namespace WebApplication.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public DbSet<Individual> Individuals { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<FileAttachment> FileAttachments { get; set; }

        public DbSet<WorkPlace> WorkPlaces { get; set; }
        public DbSet<Crew> Crews { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<Individual>()
            //     .HasOne(i => i.Organisation);
        }
    }
}
