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
    public class EvaluacionCompromisoController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluacionCompromisoController(ApplicationDbContext context){
            _context = context;
            // if (_context.EvaluacionCompromiso.Count() == 0){
            //     _context.EvaluacionCompromiso.Add(new EvaluacionCompromiso {id = "EvaluacionCompromiso01@gmail.com", Identificacion = "1001789362", Contraseña="tecnico1", Nombre = "Manuel Perez"});
            //     _context.EvaluacionCompromiso.Add(new EvaluacionCompromiso {id = "EvaluacionCompromiso02@gmail.com", Identificacion = "1002836973", Contraseña="tecnico2", Nombre = "Carlos Lopez"});
            //     _context.SaveChanges();
            // }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvaluacionCompromiso>>> GetEvaluacionCompromisos()
        {
            return await _context.EvaluacionCompromiso.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EvaluacionCompromiso>> GetEvaluacionCompromiso(int id)
        {
            var EvaluacionCompromiso = await _context.EvaluacionCompromiso.FindAsync(id);
            if (EvaluacionCompromiso == null){
                return NotFound();
            }
            return EvaluacionCompromiso;
        }



        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<EvaluacionCompromiso>> PostEvaluacionCompromiso(EvaluacionCompromiso item)
        {
            _context.EvaluacionCompromiso.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEvaluacionCompromiso), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvaluacionCompromiso(int id, EvaluacionCompromiso item)
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
            var EvaluacionCompromiso = await _context.EvaluacionCompromiso.FindAsync(id);

            if (EvaluacionCompromiso == null)
            {
                return NotFound();
            }

            _context.EvaluacionCompromiso.Remove(EvaluacionCompromiso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}