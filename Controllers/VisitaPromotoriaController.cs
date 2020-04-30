using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Cafeteros.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Cafeteros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitaPromotoriaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VisitaPromotoriaController(ApplicationDbContext context){
            _context = context;
            if (_context.VisitaPromotoria.Count() == 0){
                // _context.VisitaPromotoria.Add(new VisitaPromotoria { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "barro", MaterialTecho = "zinc", MaterialCosinar = "gas", EnergiaCosinar = "calle linda", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 1});
                // _context.VisitaPromotoria.Add(new VisitaPromotoria { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "ladrillo", MaterialTecho = "teja", MaterialCosinar = "leña", EnergiaCosinar = "calle cuba", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 2});
                // _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitaPromotoria>>> GetVisitaPromotorias()
        {
            return await _context.VisitaPromotoria.ToListAsync();
        }

        [HttpGet("Productor/{id}")]
        public async Task<ActionResult<IEnumerable<VisitaPromotoria>>> GetProductorVisitaPromotorias(string id)
        {
            var visitas = await _context.VisitaPromotoria.ToListAsync();
            List<VisitaPromotoria> visitaPromotorias  = new List<VisitaPromotoria>();

            foreach(VisitaPromotoria item in visitas){
                if(item.ProductorId == id){
                    visitaPromotorias.Add(item);
                }
            }
            if(visitaPromotorias == null){
                return NotFound();
            }

            return visitaPromotorias;
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VisitaPromotoria>> GetVisitaPromotoria(int id)
        {
            var VisitaPromotoria = await _context.VisitaPromotoria.FindAsync(id);
            if (VisitaPromotoria == null){
                return NotFound();
            }
            return VisitaPromotoria;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<VisitaPromotoria>> PostVisitaPromotoria(VisitaPromotoria item)
        {
            _context.VisitaPromotoria.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVisitaPromotoria), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVisitaPromotoria(int id, VisitaPromotoria item)
        {
            if (id != item.id)
            {
            return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var VisitaPromotoria = await _context.VisitaPromotoria.FindAsync(id);

            if (VisitaPromotoria == null)
            {
                return NotFound();
            }

            _context.VisitaPromotoria.Remove(VisitaPromotoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}