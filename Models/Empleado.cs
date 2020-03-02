using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Cafeteros.Models{
    public class Empleado{
        
        [JsonProperty("id")][Key]
        public string id {get; set;}

        [JsonProperty("Nombres")]
        public string Nombres { get; set; }

        [JsonProperty("Apellidos")]
        public string Apellidos { get; set; }

        [JsonProperty("UserName")]
        public string UserName { get; set; }

        [JsonProperty("Password")]
        public string Password { get; set; }
    }
}