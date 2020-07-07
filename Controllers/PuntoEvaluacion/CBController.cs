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
    public class CBController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CBController(ApplicationDbContext context){
            _context = context;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CB>>> GetCBs()
        {
            return await _context.CB.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CB>> GetCB(int id)
        {
            var CB = await _context.CB.FindAsync(id);
            if (CB == null){
                return NotFound();
            }
            return CB;
        }

        [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<CB>> GetCBPresentandoVisita(int id)
        {
            var CB = await _context.CB.ToListAsync();
            List <CB> cBs = new List<CB>();
            foreach (CB item in CB)
            {
                if(item.VisitaAuditoriaId == id){
                    return item;
                }
            }
            return null;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<CB>> PostCB(CB item)
        {
            _context.CB.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCB), new { id = item.id }, item);
        }      
    }
}