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
    public class VisitaAuditoriaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VisitaAuditoriaController(ApplicationDbContext context){
            _context = context;
            // if (_context.VisitaAuditoria.Count() == 0){
            //     _context.VisitaAuditoria.Add(new VisitaAuditoria {id = "VisitaAuditoria01@gmail.com", Identificacion = "1001789362", Contraseña="tecnico1", Nombre = "Manuel Perez"});
            //     _context.VisitaAuditoria.Add(new VisitaAuditoria {id = "VisitaAuditoria02@gmail.com", Identificacion = "1002836973", Contraseña="tecnico2", Nombre = "Carlos Lopez"});
            //     _context.SaveChanges();
            // }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitaAuditoria>>> GetVisitaAuditorias()
        {
            return await _context.VisitaAuditoria.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VisitaAuditoria>> GetVisitaAuditoria(int id)
        {
            var VisitaAuditoria = await _context.VisitaAuditoria.FindAsync(id);
            if (VisitaAuditoria == null){
                return NotFound();
            }
            return VisitaAuditoria;
        }



        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<VisitaAuditoria>> PostVisitaAuditoria(VisitaAuditoria item)
        {
            _context.VisitaAuditoria.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVisitaAuditoria), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVisitaAuditoria(int id, VisitaAuditoria item)
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
            var VisitaAuditoria = await _context.VisitaAuditoria.FindAsync(id);

            if (VisitaAuditoria == null)
            {
                return NotFound();
            }

            _context.VisitaAuditoria.Remove(VisitaAuditoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}