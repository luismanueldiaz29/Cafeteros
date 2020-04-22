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
    public class PaticipacionComunitariaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaticipacionComunitariaController(ApplicationDbContext context){
            _context = context;
            if (_context.PaticipacionComunitaria.Count() == 0){
                _context.PaticipacionComunitaria.Add(new PaticipacionComunitaria { AsistenteAsamblea = "NO", CargoAsamblea = "", AistenteTrabajos = "NO", CargoTrabajo = "NO", OrganizacionAparte = "NO", CualOrganizacion = "", AspectoEconomicoId = 1});
                _context.PaticipacionComunitaria.Add(new PaticipacionComunitaria { AsistenteAsamblea = "SI", CargoAsamblea = "Presidente", AistenteTrabajos = "SI", CargoTrabajo = "Agricultura", OrganizacionAparte = "SI", CualOrganizacion = "UPC", AspectoEconomicoId = 2});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaticipacionComunitaria>>> GetPaticipacionComunitarias()
        {
            return await _context.PaticipacionComunitaria.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaticipacionComunitaria>> GetPaticipacionComunitaria(int id)
        {
            var PaticipacionComunitaria = await _context.PaticipacionComunitaria.FindAsync(id);
            if (PaticipacionComunitaria == null){
                return NotFound();
            }
            return PaticipacionComunitaria;
        }

        [HttpGet("AspectoEconomico/{id}")]
        public async Task<ActionResult<PaticipacionComunitaria>> GetAspectoParticipacionCom(int id)
        {
            var PaticipacionComunitarias = await _context.PaticipacionComunitaria.ToListAsync();
            foreach (PaticipacionComunitaria item in PaticipacionComunitarias)
            {
                if(item.AspectoEconomicoId == id){
                    return item;
                }
            }
            return NotFound();
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<PaticipacionComunitaria>> PostPaticipacionComunitaria(PaticipacionComunitaria item)
        {
            _context.PaticipacionComunitaria.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPaticipacionComunitaria), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaticipacionComunitaria(int id, PaticipacionComunitaria item)
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
            var PaticipacionComunitaria = await _context.PaticipacionComunitaria.FindAsync(id);

            if (PaticipacionComunitaria == null)
            {
                return NotFound();
            }

            _context.PaticipacionComunitaria.Remove(PaticipacionComunitaria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}