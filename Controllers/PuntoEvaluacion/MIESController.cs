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

        [HttpGet("RespuestaMIES1/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MIES>>> GetRespuestaMIES1(int NumRespuesta)
        {
            var MIESS = await _context.MIES.ToListAsync();
            List<MIES> returnMIESS = new List<MIES>();
            foreach (var item in MIESS)
            {
                if(item.RespuestaMIES1 == NumRespuesta){
                    returnMIESS.Add(item);
                }
            }

            return returnMIESS;
        }

        [HttpGet("RespuestaMIES2/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MIES>>> GetRespuestaMIES2(int NumRespuesta)
        {
            var MIESS = await _context.MIES.ToListAsync();
            List<MIES> returnMIESS = new List<MIES>();
            foreach (var item in MIESS)
            {
                if(item.RespuestaMIES2 == NumRespuesta){
                    returnMIESS.Add(item);
                }
            }

            return returnMIESS;
        }

        [HttpGet("RespuestaMIES3/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MIES>>> GetRespuestaMIES3(int NumRespuesta)
        {
            var MIESS = await _context.MIES.ToListAsync();
            List<MIES> returnMIESS = new List<MIES>();
            foreach (var item in MIESS)
            {
                if(item.RespuestaMIES3 == NumRespuesta){
                    returnMIESS.Add(item);
                }
            }

            return returnMIESS;
        }
        [HttpGet("RespuestaMIES4/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MIES>>> GetRespuestaMIES4(int NumRespuesta)
        {
            var MIESS = await _context.MIES.ToListAsync();
            List<MIES> returnMIESS = new List<MIES>();
            foreach (var item in MIESS)
            {
                if(item.RespuestaMIES4 == NumRespuesta){
                    returnMIESS.Add(item);
                }
            }

            return returnMIESS;
        }

        [HttpGet("RespuestaMIES5/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MIES>>> GetRespuestaMIES5(int NumRespuesta)
        {
            var MIESS = await _context.MIES.ToListAsync();
            List<MIES> returnMIESS = new List<MIES>();
            foreach (var item in MIESS)
            {
                if(item.RespuestaMIES5 == NumRespuesta){
                    returnMIESS.Add(item);
                }
            }

            return returnMIESS;
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