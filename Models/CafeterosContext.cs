using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Cafeteros.Models
{
    public class CafeterosContext : IdentityDbContext<ApplicationUser>
    {
        public CafeterosContext(DbContextOptions<CafeterosContext> options) :base(options){}

        public DbSet<Empleado> Empleados { get; set; }
    }
}
