using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApplication.Models;

namespace WebApplication.Data
{
    public class IndividualDbContext : DbContext
    {
        public IndividualDbContext(DbContextOptions<IndividualDbContext> options)
            : base(options)
        { }

        public DbSet<Individual> Individuals { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Role> Roles { get; set; }

        public IConfigurationRoot Configuration { get; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlite(Configuration.GetConnectionString("IndividualsConnection"));
        }
    }

}
