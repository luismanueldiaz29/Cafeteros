using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class LoginUser
    {
        public string id { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        
    }
}