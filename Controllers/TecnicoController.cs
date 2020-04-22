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
    public class TecnicoController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TecnicoController(ApplicationDbContext context){
            _context = context;
            if (_context.Tecnico.Count() == 0){
                _context.Tecnico.Add(new Tecnico {Correo = "Tecnico01@gmail.com", Identificacion = "1001789362", Contraseña="tecnico1", Nombre = "Manuel Perez"});
                _context.Tecnico.Add(new Tecnico {Correo = "Tecnico02@gmail.com", Identificacion = "1002836973", Contraseña="tecnico2", Nombre = "Carlos Lopez"});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tecnico>>> GetTecnicos()
        {
            return await _context.Tecnico.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{Correo}")]
        public async Task<ActionResult<Tecnico>> GetTecnico(string Correo)
        {
            var Tecnico = await _context.Tecnico.FindAsync(Correo);
            if (Tecnico == null){
                return NotFound();
            }
            return Tecnico;
        }



        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Tecnico>> PostTecnico(Tecnico item)
        {
            _context.Tecnico.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTecnico), new { Correo = item.Correo }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{Correo}")]
        public async Task<IActionResult> PutTecnico(string Correo, Tecnico item)
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
            var Tecnico = await _context.Tecnico.FindAsync(Correo);

            if (Tecnico == null)
            {
                return NotFound();
            }

            _context.Tecnico.Remove(Tecnico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}