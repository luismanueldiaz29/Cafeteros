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
    public class LoginUserController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginUserController(ApplicationDbContext context){
            _context = context;
            // if (_context.LoginUser.Count() == 0){
               
            // }
        }
   
        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<LoginUser>> PostLoginUser(LoginUser item)
        {
            
            var Tecnico = await _context.Tecnico.FindAsync(item.User);
            if(Tecnico != null){
                if(Tecnico.Contraseña == item.Password){
                    item.User = "Tec";
                    item.Password = "Tec";
                    item.id = Tecnico.Correo;
                    return item;
                }
            }

            var MesaDireactiva = await _context.MesaDirectiva.FindAsync(item.User);

            if(MesaDireactiva != null){
                if(MesaDireactiva.Contraseña == item.Password){
                    item.id = MesaDireactiva.Correo;
                    item.User = "Mes";
                    item.Password = "Mesa";
                    return item;
                }
            }
            
            return null;
        }
        

    }
}