using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafeteros.Models
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }

        public DbSet<Empleado> Empleado { get; set; }

        public DbSet<Productor> Productor { get; set; }

        public DbSet<Familiar> Familiar { get; set; }

        public DbSet<Habitabilidad> Habitabilidad { get; set; }

        public DbSet<PaticipacionComunitaria> PaticipacionComunitaria { get; set; }

        public DbSet<AspectoEconomico> AspectoEconomico { get; set; }

    }
}
