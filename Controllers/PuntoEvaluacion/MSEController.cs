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
     public class MSEController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MSEController(ApplicationDbContext context){
            _context = context;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MSE>>> MSECBs()
        {
            return await _context.MSE.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MSE>> GetMSE(int id)
        {
            var MSE = await _context.MSE.FindAsync(id);
            if (MSE == null){
                return NotFound();
            }
            return MSE;
        }

        [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<MSE>> GetMSEPresentandoVisita(int id)
        {
            var MSE = await _context.MSE.ToListAsync();
            foreach (MSE item in MSE)
            {
                if(item.VisitaAuditoriaId == id){
                    return item;
                }
            }
            return null;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<MSE>> PostCB(MSE item)
        {
            _context.MSE.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMSE), new { id = item.id }, item);
        }      
    }
}