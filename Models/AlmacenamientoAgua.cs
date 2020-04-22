using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class AlmacenamientoAgua
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("TipoAlmacenamiento")]
        public string TipoAlmacenamiento {get; set;}

        [JsonProperty("Volumen")]
        public string Volumen {get; set;}

        [JsonProperty("NumeroUsuario")]
        public int NumeroUsuario {get; set;}

        [JsonProperty("EstudioAgua")]
        public string EstudioAgua {get; set;}

        [JsonProperty("ExisteDesperdicio")]
        public string ExisteDesperdicio {get; set;}
        
        [JsonProperty("Mantenimiento")]
        public string Mantenimiento {get; set;}            

        [JsonProperty("Productor")]
        public Productor Productor { get; set; }

        [JsonProperty("ProductorId")]
        public string ProductorId { get; set; }
    }
}