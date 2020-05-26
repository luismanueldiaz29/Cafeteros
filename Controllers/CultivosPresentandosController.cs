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
    public class CultivosPresentandosController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CultivosPresentandosController(ApplicationDbContext context){
            _context = context;
            // if (_context.CultivosPresentandos.Count() == 0){
            //     _context.CultivosPresentandos.Add(new CultivosPresentandos {id = "CultivosPresentandos01@gmail.com", Identificacion = "1001789362", Contraseña="tecnico1", Nombre = "Manuel Perez"});
            //     _context.CultivosPresentandos.Add(new CultivosPresentandos {id = "CultivosPresentandos02@gmail.com", Identificacion = "1002836973", Contraseña="tecnico2", Nombre = "Carlos Lopez"});
            //     _context.SaveChanges();
            // }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CultivosPresentandos>>> GetCultivosPresentandoss()
        {
            return await _context.CultivosPresentandos.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CultivosPresentandos>> GetCultivosPresentandos(int id)
        {
            var CultivosPresentandos = await _context.CultivosPresentandos.FindAsync(id);
            if (CultivosPresentandos == null){
                return NotFound();
            }
            return CultivosPresentandos;
        }



        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<CultivosPresentandos>> PostCultivosPresentandos(CultivosPresentandos item)
        {
            _context.CultivosPresentandos.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCultivosPresentandos), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCultivosPresentandos(int id, CultivosPresentandos item)
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
        public async Task<IActionResult> Delete(string id)
        {
            var CultivosPresentandos = await _context.CultivosPresentandos.FindAsync(id);

            if (CultivosPresentandos == null)
            {
                return NotFound();
            }

            _context.CultivosPresentandos.Remove(CultivosPresentandos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}