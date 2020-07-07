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
     public class MIESController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MIESController(ApplicationDbContext context){
            _context = context;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MIES>>> GetMIESs()
        {
            return await _context.MIES.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MIES>> GetMIES(int id)
        {
            var MIES = await _context.MIES.FindAsync(id);
            if (MIES == null){
                return NotFound();
            }
            return MIES;
        }

       [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<MIES>> GetMIESPresentandoVisita(int id)
        {
            var MIES = await _context.MIES.ToListAsync();
            foreach (MIES item in MIES)
            {
                if(item.VisitaAuditoriaId == id){
                    return item;
                }
            }
            return null;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<MIES>> PostCB(MIES item)
        {
            _context.MIES.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMIES), new { id = item.id }, item);
        }      
    }
}