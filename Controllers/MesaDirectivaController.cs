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
    public class MesaDirectivaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MesaDirectivaController(ApplicationDbContext context){
            _context = context;
            if (_context.MesaDirectiva.Count() == 0){
                _context.MesaDirectiva.Add(new MesaDirectiva {Correo = "MesaDirectiva01@gmail.com", Identificacion = "1008689362", Contraseña="mesa1", Nombre = "Mesa directiva 01"});
                _context.MesaDirectiva.Add(new MesaDirectiva {Correo = "MesaDirectiva02@gmail.com", Identificacion = "1082826373", Contraseña="mesa2", Nombre = "Mesa directiva 02"});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MesaDirectiva>>> GetMesaDirectivas()
        {
            return await _context.MesaDirectiva.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{Correo}")]
        public async Task<ActionResult<MesaDirectiva>> GetMesaDirectiva(string Correo)
        {
            var MesaDirectiva = await _context.MesaDirectiva.FindAsync(Correo);
            if (MesaDirectiva == null){
                return NotFound();
            }
            return MesaDirectiva;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<MesaDirectiva>> PostMesaDirectiva(MesaDirectiva item)
        {
            _context.MesaDirectiva.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMesaDirectiva), new { Correo = item.Correo }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{Correo}")]
        public async Task<IActionResult> PutMesaDirectiva(string Correo, MesaDirectiva item)
        {
            if (Correo != item.Correo)
            {
            return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{Correo}")]
        public async Task<IActionResult> Delete(string Correo)
        {
            var MesaDirectiva = await _context.MesaDirectiva.FindAsync(Correo);

            if (MesaDirectiva == null)
            {
                return NotFound();
            }

            _context.MesaDirectiva.Remove(MesaDirectiva);
            await _context.SaveChangesAsync();

            return NoContent();
        }
 
    }
}