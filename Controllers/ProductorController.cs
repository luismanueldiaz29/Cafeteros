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
    public class ProductorController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductorController(ApplicationDbContext context){
            _context = context;
            if (_context.Productor.Count() == 0){
                _context.Productor.Add(new Productor { id = "1",  Nombre = "Carlos ", CodigoCafetero = "12334", NombrePredio = "alskas", CodigoSica = "Productor", Municipio = "Valledupar", Vereda = "calle linda", NumeroTelefono = "123", AfiliacionSalud = "1", ActvidadesDedican = "1", Estado = false});
                _context.Productor.Add(new Productor {  id = "2", Nombre = "Luis Manué", CodigoCafetero = "Dia1212z", NombrePredio = "sdfssdf", CodigoSica = "Productor", Municipio = "la paz", Vereda = "calle cuba", NumeroTelefono = "123", AfiliacionSalud = "1", ActvidadesDedican  = "1", Estado = true});
                _context.SaveChanges();
            }
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productor>>> GetProductors()
        {
            return await _context.Productor.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Productor>> GetProductor(string id)
        {
            var Productor = await _context.Productor.FindAsync(id);
            if (Productor == null){
                return NotFound();
            }
            return Productor;
        }

        //con este metodo puedo obtener los productores segun el estado ya sea aprobado en ese caso
        //el atributo Estado debe ser true y en caso de que no haya sido aprobado tendria que ser false
        [HttpGet("Estado/{Estado}")]
        public async Task<ActionResult<IEnumerable<Productor>>> GetProductorEstado(bool Estado)
        {
            var Productores = await _context.Productor.ToListAsync();
            List<Productor> productores = new List<Productor>();
            foreach (Productor item in Productores)
            {
                if(item.Estado == Estado) {productores.Add(item);}
            }

            if(productores == null){
                return NotFound();
            }else{
                return productores;
            }
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Productor>> PostProductor(Productor item)
        {
            _context.Productor.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductor), new { id = item.id }, item);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductor(string id, Productor item)
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
            var Productor = await _context.Productor.FindAsync(id);

            if (Productor == null)
            {
                return NotFound();
            }

            _context.Productor.Remove(Productor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}