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
     public class MSController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MSController(ApplicationDbContext context){
            _context = context;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MS>>> GetMSs()
        {
            return await _context.MS.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MS>> GetMS(int id)
        {
            var MS = await _context.MS.FindAsync(id);
            if (MS == null){
                return NotFound();
            }
            return MS;
        }

               [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<MS>> GetMSPresentandoVisita(int id)
        {
            var MS = await _context.MS.ToListAsync();
            foreach (MS item in MS)
            {
                if(item.VisitaAuditoriaId == id){
                    return item;
                }
            }
            return null;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<MS>> PostCB(MS item)
        {
            _context.MS.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMS), new { id = item.id }, item);
        }      
    }
}