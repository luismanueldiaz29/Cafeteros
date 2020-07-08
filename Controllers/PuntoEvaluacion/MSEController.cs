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


        [HttpGet("RespuestaMSE1/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MSE>>> GetRespuestaMSE1(int NumRespuesta)
        {
            var MSES = await _context.MSE.ToListAsync();
            List<MSE> returnMSES = new List<MSE>();
            foreach (var item in MSES)
            {
                if(item.RespuestaMSE1 == NumRespuesta){
                    returnMSES.Add(item);
                }
            }

            return returnMSES;
        }

        [HttpGet("RespuestaMSE2/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MSE>>> GetRespuestaMSE2(int NumRespuesta)
        {
            var MSES = await _context.MSE.ToListAsync();
            List<MSE> returnMSES = new List<MSE>();
            foreach (var item in MSES)
            {
                if(item.RespuestaMSE2 == NumRespuesta){
                    returnMSES.Add(item);
                }
            }

            return returnMSES;
        }

        [HttpGet("RespuestaMSE3/{NumRespuesta}")]
        public async Task<ActionResult<IEnumerable<MSE>>> GetRespuestaMSE3(int NumRespuesta)
        {
            var MSES = await _context.MSE.ToListAsync();
            List<MSE> returnMSES = new List<MSE>();
            foreach (var item in MSES)
            {
                if(item.RespuestaMSE3 == NumRespuesta){
                    returnMSES.Add(item);
                }
            }

            return returnMSES;
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