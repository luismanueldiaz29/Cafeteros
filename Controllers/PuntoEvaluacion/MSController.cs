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

        [HttpGet("RespuestaMS1/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MS>>> GetRespuestaMS1(int NumRespuesta)
        {
            var MSS = await _context.MS.ToListAsync();
            List<MS> returnMSS = new List<MS>();
            foreach (var item in MSS)
            {
                if(item.RespuestaMS1 == NumRespuesta){
                    returnMSS.Add(item);
                }
            }

            return returnMSS;
        }

        [HttpGet("RespuestaMS2/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MS>>> GetRespuestaMS2(int NumRespuesta)
        {
            var MSS = await _context.MS.ToListAsync();
            List<MS> returnMSS = new List<MS>();
            foreach (var item in MSS)
            {
                if(item.RespuestaMS2 == NumRespuesta){
                    returnMSS.Add(item);
                }
            }

            return returnMSS;
        }

        [HttpGet("RespuestaMS3/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MS>>> GetRespuestaMS3(int NumRespuesta)
        {
            var MSS = await _context.MS.ToListAsync();
            List<MS> returnMSS = new List<MS>();
            foreach (var item in MSS)
            {
                if(item.RespuestaMS3 == NumRespuesta){
                    returnMSS.Add(item);
                }
            }

            return returnMSS;
        }
        [HttpGet("RespuestaMS4/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MS>>> GetRespuestaMS4(int NumRespuesta)
        {
            var MSS = await _context.MS.ToListAsync();
            List<MS> returnMSS = new List<MS>();
            foreach (var item in MSS)
            {
                if(item.RespuestaMS4 == NumRespuesta){
                    returnMSS.Add(item);
                }
            }

            return returnMSS;
        }

        [HttpGet("RespuestaMS5/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MS>>> GetRespuestaMS5(int NumRespuesta)
        {
            var MSS = await _context.MS.ToListAsync();
            List<MS> returnMSS = new List<MS>();
            foreach (var item in MSS)
            {
                if(item.RespuestaMS5 == NumRespuesta){
                    returnMSS.Add(item);
                }
            }

            return returnMSS;
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