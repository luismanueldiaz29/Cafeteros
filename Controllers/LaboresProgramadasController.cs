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
    public class LaboresProgramadaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LaboresProgramadaController(ApplicationDbContext context){
            _context = context;
            if (_context.LaboresProgramada.Count() == 0){
                // _context.LaboresProgramada.Add(new LaboresProgramada { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "barro", MaterialTecho = "zinc", MaterialCosinar = "gas", EnergiaCosinar = "calle linda", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 1});
                // _context.LaboresProgramada.Add(new LaboresProgramada { TipoVivienda = "occidental", NumeroHabitaciones = 5, MaterialPredominante = "ladrillo", MaterialTecho = "teja", MaterialCosinar = "leña", EnergiaCosinar = "calle cuba", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 2});
                // _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LaboresProgramada>>> GetlaboresProgramadas()
        {
            return await _context.LaboresProgramada.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LaboresProgramada>> GetLaboresProgramada(int id)
        {
            var LaboresProgramada = await _context.LaboresProgramada.FindAsync(id);
            if (LaboresProgramada == null){
                return NotFound();
            }
            return LaboresProgramada;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<LaboresProgramada>> PostLaboresProgramada(LaboresProgramada item)
        {
            _context.LaboresProgramada.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLaboresProgramada), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLaboresProgramada(int id, LaboresProgramada item)
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
            var LaboresProgramada = await _context.LaboresProgramada.FindAsync(id);

            if (LaboresProgramada == null)
            {
                return NotFound();
            }

            _context.LaboresProgramada.Remove(LaboresProgramada);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("VisitaPromotoria/{id}")]
        public async Task<ActionResult<IEnumerable<LaboresProgramada>>> getVisitaLaboresProgramada(int id)
        {
            var LaboresProgramada = await _context.LaboresProgramada.ToListAsync();
            List <LaboresProgramada> laboresProgramadas = new List<LaboresProgramada>();
            foreach (LaboresProgramada item in LaboresProgramada)
            {
                if(item.VisitaPromotoriaId == id){
                    laboresProgramadas.Add(item);
                }
            }
            if(laboresProgramadas == null){
                return NotFound();
            }
            return laboresProgramadas;
        }
        
    }
}