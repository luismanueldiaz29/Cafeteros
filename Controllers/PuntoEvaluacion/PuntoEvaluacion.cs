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