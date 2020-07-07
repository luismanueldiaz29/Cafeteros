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
    public class MAController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MAController(ApplicationDbContext context){
            _context = context;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MA>>> GetMAs()
        {
            return await _context.MA.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MA>> GetMA(int id)
        {
            var MA = await _context.MA.FindAsync(id);
            if (MA == null){
                return NotFound();
            }
            return MA;
        }

        [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<MA>> GetMAPresentandoVisita(int id)
        {
            var MA = await _context.MA.ToListAsync();
            List <MA> MAs = new List<MA>();
            foreach (MA item in MA)
            {
                if(item.VisitaAuditoriaId == id){
                    return item;
                }
            }
            return null;
        }
        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<MA>> PostMA(MA item)
        {
            _context.MA.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMA), new { id = item.id }, item);
        }      
    }
}