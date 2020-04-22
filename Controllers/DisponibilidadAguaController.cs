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
    public class DisponibilidadAguaController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DisponibilidadAguaController(ApplicationDbContext context){
            _context = context;
            if (_context.DisponibilidadAgua.Count() == 0){
                _context.DisponibilidadAgua.Add(new DisponibilidadAgua { Fuente = "Carlos ", UsoDomestico = true, UsoAgricola = false, Disponibilidad = "DisponibilidadAgua", ProductorId = "1"});
                _context.DisponibilidadAgua.Add(new DisponibilidadAgua { Fuente = "Luis Manué", UsoDomestico = false, UsoAgricola = true, Disponibilidad = "DisponibilidadAgua", ProductorId = "1"});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisponibilidadAgua>>> GetDisponibilidadAguas()
        {
            return await _context.DisponibilidadAgua.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DisponibilidadAgua>> GetDisponibilidadAgua(int id)
        {
            var DisponibilidadAgua = await _context.DisponibilidadAgua.FindAsync(id);
            if (DisponibilidadAgua == null){
                return NotFound();
            }
            return DisponibilidadAgua;
        }

        [HttpGet("Productor/{id}")]
        public async Task<ActionResult<IEnumerable<DisponibilidadAgua>>> getDisponibilidadAguaProductor(string id)
        {
            var DisponibilidadAgua = await _context.DisponibilidadAgua.ToListAsync();
            List <DisponibilidadAgua> DisponibilidadAguaes = new List<DisponibilidadAgua>();
            foreach (DisponibilidadAgua item in DisponibilidadAgua)
            {
                if(item.ProductorId == id){
                    DisponibilidadAguaes.Add(item);
                }
            }
            if(DisponibilidadAguaes == null){
                return NotFound();
            }
            return DisponibilidadAguaes;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<DisponibilidadAgua>> PostDisponibilidadAgua(DisponibilidadAgua item)
        {
            _context.DisponibilidadAgua.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDisponibilidadAgua), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisponibilidadAgua(int id, DisponibilidadAgua item)
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
            var DisponibilidadAgua = await _context.DisponibilidadAgua.FindAsync(id);

            if (DisponibilidadAgua == null)
            {
                return NotFound();
            }

            _context.DisponibilidadAgua.Remove(DisponibilidadAgua);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}