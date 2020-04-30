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
    public class LaboresRealizadaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LaboresRealizadaController(ApplicationDbContext context){
            _context = context;
            if (_context.LaboresRealizada.Count() == 0){
                // _context.LaboresRealizada.Add(new LaboresRealizada { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "barro", MaterialTecho = "zinc", MaterialCosinar = "gas", EnergiaCosinar = "calle linda", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 1});
                // _context.LaboresRealizada.Add(new LaboresRealizada { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "ladrillo", MaterialTecho = "teja", MaterialCosinar = "leña", EnergiaCosinar = "calle cuba", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 2});
                // _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LaboresRealizada>>> GetLaboresRealizadas()
        {
            return await _context.LaboresRealizada.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LaboresRealizada>> GetLaboresRealizada(int id)
        {
            var LaboresRealizada = await _context.LaboresRealizada.FindAsync(id);
            if (LaboresRealizada == null){
                return NotFound();
            }
            return LaboresRealizada;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<LaboresRealizada>> PostLaboresRealizada(LaboresRealizada item)
        {
            _context.LaboresRealizada.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLaboresRealizada), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLaboresRealizada(int id, LaboresRealizada item)
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
            var LaboresRealizada = await _context.LaboresRealizada.FindAsync(id);

            if (LaboresRealizada == null)
            {
                return NotFound();
            }

            _context.LaboresRealizada.Remove(LaboresRealizada);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("VisitaPromotoria/{id}")]
        public async Task<ActionResult<IEnumerable<LaboresRealizada>>> getVisitaLaboresRealizada(int id)
        {
            var laboresRealizadas = await _context.LaboresRealizada.ToListAsync();
            List <LaboresRealizada> LaboresRealizadas = new List<LaboresRealizada>();
            foreach (LaboresRealizada item in laboresRealizadas)
            {
                if(item.VisitaPromotoriaId == id){
                    LaboresRealizadas.Add(item);
                }
            }
            if(LaboresRealizadas == null){
                return NotFound();
            }
            return LaboresRealizadas;
        }
        
    }
}