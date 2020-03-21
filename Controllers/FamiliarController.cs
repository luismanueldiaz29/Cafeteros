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
    public class FamiliarController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FamiliarController(ApplicationDbContext context){
            _context = context;
            if (_context.Familiar.Count() == 0){
                _context.Familiar.Add(new Familiar { Nombre = "Carlos ", NumeroDocumento = "12334", FechaNacimiento = "alskas", Parentesco = "Familiar", TipoPoblacion = "Negra", NivelEducativo = "calle linda", AfiliacionSalud = "123", ProductorId = "1"});
                _context.Familiar.Add(new Familiar { Nombre = "Luis Manué", NumeroDocumento = "Dia1212z", FechaNacimiento = "sdfssdf", Parentesco = "Familiar", TipoPoblacion = "mestiza", NivelEducativo = "calle cuba", AfiliacionSalud = "123", ProductorId = "1"});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Familiar>>> GetFamiliars()
        {
            return await _context.Familiar.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Familiar>> GetFamiliar(int id)
        {
            var Familiar = await _context.Familiar.FindAsync(id);
            if (Familiar == null){
                return NotFound();
            }
            return Familiar;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Familiar>> PostFamiliar(Familiar item)
        {
            _context.Familiar.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFamiliar), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFamiliar(int id, Familiar item)
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
            var Familiar = await _context.Familiar.FindAsync(id);

            if (Familiar == null)
            {
                return NotFound();
            }

            _context.Familiar.Remove(Familiar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}