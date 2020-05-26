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
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

        public DbSet<Empleado> Empleado { get; set; }

        public DbSet<Productor> Productor { get; set; }

        public DbSet<Familiar> Familiar { get; set; }

        public DbSet<Habitabilidad> Habitabilidad { get; set; }

        public DbSet<PaticipacionComunitaria> PaticipacionComunitaria { get; set; }

        public DbSet<AspectoEconomico> AspectoEconomico { get; set; }

        public DbSet<VisitaPromotoria> VisitaPromotoria { get; set; }

        public DbSet<LaboresProgramada> LaboresProgramada { get; set; }

        public DbSet<LaboresRealizada> LaboresRealizada { get; set; }

        public DbSet<DisponibilidadAgua> DisponibilidadAgua { get; set; }
        
        public DbSet<AlmacenamientoAgua> AlmacenamientoAgua { get; set; }

        public DbSet<MesaDirectiva> MesaDirectiva { get; set; }

        public DbSet<Tecnico> Tecnico { get; set; }

        public DbSet<VisitaAuditoria> VisitaAuditoria { get; set; }

        public DbSet<OtrosCultivos> OtrosCultivos { get; set; }

        public DbSet<CultivosPresentandos> CultivosPresentandos { get; set; }

        public DbSet<EvaluacionCompromiso> EvaluacionCompromiso { get; set; }

        public DbSet<CB> CB { get; set; }

        public DbSet<MA> MA { get; set; }

        public DbSet<MSE> MSE { get; set; }

        public DbSet<MIES> MIES { get; set; }

        public DbSet<MS> MS { get; set; }
    }
}
