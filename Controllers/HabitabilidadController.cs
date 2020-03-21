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
    public class HabitabilidadController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HabitabilidadController(ApplicationDbContext context){
            _context = context;
            if (_context.Habitabilidad.Count() == 0){
                _context.Habitabilidad.Add(new Habitabilidad { TipoVivienda = "occidental", NumeroHabitaciones = "5", MaterialPredominante = "barro", MaterialTecho = "zinc", MaterialCosinar = "gas", EnergiaCosinar = "calle linda", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 1});
                _context.Habitabilidad.Add(new Habitabilidad { TipoVivienda = "occidental", NumeroHabitaciones = "2", MaterialPredominante = "ladrillo", MaterialTecho = "teja", MaterialCosinar = "leña", EnergiaCosinar = "calle cuba", ServicioSanitario = "123", TipoAlumbrado = "1", AspectoEconomicoId = 2});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habitabilidad>>> GetHabitabilidads()
        {
            return await _context.Habitabilidad.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habitabilidad>> GetHabitabilidad(int id)
        {
            var Habitabilidad = await _context.Habitabilidad.FindAsync(id);
            if (Habitabilidad == null){
                return NotFound();
            }
            return Habitabilidad;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Habitabilidad>> PostHabitabilidad(Habitabilidad item)
        {
            _context.Habitabilidad.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHabitabilidad), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitabilidad(int id, Habitabilidad item)
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
            var Habitabilidad = await _context.Habitabilidad.FindAsync(id);

            if (Habitabilidad == null)
            {
                return NotFound();
            }

            _context.Habitabilidad.Remove(Habitabilidad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}