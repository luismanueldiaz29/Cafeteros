using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class DisponibilidadAgua
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Fuente")]
        public string Fuente {get; set;}

        [JsonProperty("UsoDomestico")]
        public bool UsoDomestico {get; set;}

        [JsonProperty("UsoAgricola")]
        public bool UsoAgricola {get; set;}

        [JsonProperty("Disponibilidad")]
        public string Disponibilidad {get; set;}

        [JsonProperty("Productor")]
        public Productor Productor { get; set; }

        [JsonProperty("ProductorId")]
        public string ProductorId { get; set; }
    }
}