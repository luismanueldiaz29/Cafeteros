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
    public class ResultadoEvaluacionController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResultadoEvaluacionController(ApplicationDbContext context){
            _context = context;
            // if (_context.ResultadoEvaluacion.Count() == 0){
            //     _context.ResultadoEvaluacion.Add(new ResultadoEvaluacion {TipoAlmacenamiento = "tanque", Volumen = "1000", NumeroUsuario = 12, EstudioAgua= "Ninguno", ExisteDesperdicio="Ninguno", Mantenimiento="Mantenimiento", ProductorId = "1"});
            //     _context.ResultadoEvaluacion.Add(new ResultadoEvaluacion { TipoAlmacenamiento = "tanque", Volumen = "1000", NumeroUsuario = 12, EstudioAgua= "Ninguno", ExisteDesperdicio="Ninguno", Mantenimiento="Mantenimiento" ,ProductorId = "2"});
            //     _context.SaveChanges();
            // }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultadoEvaluacion>>> GetResultadoEvaluacions()
        {
            return await _context.ResultadoEvaluacion.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResultadoEvaluacion>> GetResultadoEvaluacion(int id)
        {
            var ResultadoEvaluacion = await _context.ResultadoEvaluacion.FindAsync(id);
            if (ResultadoEvaluacion == null){
                return NotFound();
            }
            return ResultadoEvaluacion;
        }

       [HttpGet("VisitaAuditoria/{id}")]
        public async Task<ActionResult<IEnumerable<ResultadoEvaluacion>>> GetCultivosPresentandoVisita(int id)
        {
            var ResultadoEvaluacion = await _context.ResultadoEvaluacion.ToListAsync();
            List <ResultadoEvaluacion> resultadoEvaluacions = new List<ResultadoEvaluacion>();
            foreach (ResultadoEvaluacion item in ResultadoEvaluacion)
            {
                if(item.VisitaAuditoriaId == id){
                    resultadoEvaluacions.Add(item);
                }
            }
            if(resultadoEvaluacions == null){
                return NotFound();
            }
            return resultadoEvaluacions;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<ResultadoEvaluacion>> PostResultadoEvaluacion(ResultadoEvaluacion item)
        {
            _context.ResultadoEvaluacion.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetResultadoEvaluacion), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResultadoEvaluacion(int id, ResultadoEvaluacion item)
        {
            if (id != item.id)
            {
            return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ResultadoEvaluacion = await _context.ResultadoEvaluacion.FindAsync(id);

            if (ResultadoEvaluacion == null)
            {
                return NotFound();
            }

            _context.ResultadoEvaluacion.Remove(ResultadoEvaluacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}