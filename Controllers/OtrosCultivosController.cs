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
    public class OtrosCultivosController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OtrosCultivosController(ApplicationDbContext context){
            _context = context;
            // if (_context.OtrosCultivos.Count() == 0){
            //     _context.OtrosCultivos.Add(new OtrosCultivos {id = "OtrosCultivos01@gmail.com", Identificacion = "1001789362", Contraseña="tecnico1", Nombre = "Manuel Perez"});
            //     _context.OtrosCultivos.Add(new OtrosCultivos {id = "OtrosCultivos02@gmail.com", Identificacion = "1002836973", Contraseña="tecnico2", Nombre = "Carlos Lopez"});
            //     _context.SaveChanges();
            // }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OtrosCultivos>>> GetOtrosCultivoss()
        {
            return await _context.OtrosCultivos.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OtrosCultivos>> GetOtrosCultivos(int id)
        {
            var OtrosCultivos = await _context.OtrosCultivos.FindAsync(id);
            if (OtrosCultivos == null){
                return NotFound();
            }
            return OtrosCultivos;
        }

       [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<IEnumerable<OtrosCultivos>>> GetCultivosPresentandoVisita(int id)
        {
            var OtrosCultivos = await _context.OtrosCultivos.ToListAsync();
            List <OtrosCultivos> otrosCultivos = new List<OtrosCultivos>();
            foreach (OtrosCultivos item in OtrosCultivos)
            {
                if(item.VisitaAuditoriaId == id){
                    otrosCultivos.Add(item);
                }
            }
            if(otrosCultivos == null){
                return NotFound();
            }
            return otrosCultivos;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<OtrosCultivos>> PostOtrosCultivos(OtrosCultivos item)
        {
            _context.OtrosCultivos.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOtrosCultivos), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOtrosCultivos(int id, OtrosCultivos item)
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
            var OtrosCultivos = await _context.OtrosCultivos.FindAsync(id);

            if (OtrosCultivos == null)
            {
                return NotFound();
            }

            _context.OtrosCultivos.Remove(OtrosCultivos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}