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
    public class AlmacenamientoAguaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AlmacenamientoAguaController(ApplicationDbContext context){
            _context = context;
            if (_context.AlmacenamientoAgua.Count() == 0){
                _context.AlmacenamientoAgua.Add(new AlmacenamientoAgua {TipoAlmacenamiento = "tanque", Volumen = "1000", NumeroUsuario = 12, EstudioAgua= "Ninguno", ExisteDesperdicio="Ninguno", Mantenimiento="Mantenimiento", ProductorId = "1"});
                _context.AlmacenamientoAgua.Add(new AlmacenamientoAgua { TipoAlmacenamiento = "tanque", Volumen = "1000", NumeroUsuario = 12, EstudioAgua= "Ninguno", ExisteDesperdicio="Ninguno", Mantenimiento="Mantenimiento" ,ProductorId = "2"});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlmacenamientoAgua>>> GetAlmacenamientoAguas()
        {
            return await _context.AlmacenamientoAgua.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlmacenamientoAgua>> GetAlmacenamientoAgua(int id)
        {
            var AlmacenamientoAgua = await _context.AlmacenamientoAgua.FindAsync(id);
            if (AlmacenamientoAgua == null){
                return NotFound();
            }
            return AlmacenamientoAgua;
        }

        [HttpGet("Productor/{id}")]
        public async Task<ActionResult<AlmacenamientoAgua>> getAlmacenamientoAguaProductor(string id)
        {
            var AlmacenamientoAgua = await _context.AlmacenamientoAgua.ToListAsync();
            foreach (AlmacenamientoAgua item in AlmacenamientoAgua)
            {
                if(item.ProductorId == id){
                    return item;
                }
            }
            return NotFound();
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<AlmacenamientoAgua>> PostAlmacenamientoAgua(AlmacenamientoAgua item)
        {
            _context.AlmacenamientoAgua.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAlmacenamientoAgua), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlmacenamientoAgua(int id, AlmacenamientoAgua item)
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
            var AlmacenamientoAgua = await _context.AlmacenamientoAgua.FindAsync(id);

            if (AlmacenamientoAgua == null)
            {
                return NotFound();
            }

            _context.AlmacenamientoAgua.Remove(AlmacenamientoAgua);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}