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

        [HttpGet("RespuestaMA1/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MA>>> GetRespuestaMA1(int NumRespuesta)
        {
            var MAS = await _context.MA.ToListAsync();
            List<MA> returnMAS = new List<MA>();
            foreach (var item in MAS)
            {
                if(item.RespuestaMA1 == NumRespuesta){
                    returnMAS.Add(item);
                }
            }

            return returnMAS;
        }

        [HttpGet("RespuestaMA2/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MA>>> GetRespuestaMA2(int NumRespuesta)
        {
            var MAS = await _context.MA.ToListAsync();
            List<MA> returnMAS = new List<MA>();
            foreach (var item in MAS)
            {
                if(item.RespuestaMA2 == NumRespuesta){
                    returnMAS.Add(item);
                }
            }

            return returnMAS;
        }

        [HttpGet("RespuestaMA3/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MA>>> GetRespuestaMA3(int NumRespuesta)
        {
            var MAS = await _context.MA.ToListAsync();
            List<MA> returnMAS = new List<MA>();
            foreach (var item in MAS)
            {
                if(item.RespuestaMA3 == NumRespuesta){
                    returnMAS.Add(item);
                }
            }

            return returnMAS;
        }

        [HttpGet("RespuestaMA4/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MA>>> GetRespuestaMA4(int NumRespuesta)
        {
            var MAS = await _context.MA.ToListAsync();
            List<MA> returnMAS = new List<MA>();
            foreach (var item in MAS)
            {
                if(item.RespuestaMA4 == NumRespuesta){
                    returnMAS.Add(item);
                }
            }

            return returnMAS;
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