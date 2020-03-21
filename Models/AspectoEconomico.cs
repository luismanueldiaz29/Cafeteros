using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class AspectoEconomico
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("TenenciaTierra")]
        public string TenenciaTierra { get; set; }

        [JsonProperty("Legalidad")]
        public string Legalidad {get; set;}

        [JsonProperty("Productor")]
        public Productor Productor { get; set; }

        [JsonProperty("ProductorId")]
        public string ProductorId { get; set; }

        [JsonProperty("Habitabilidad")]
        public Habitabilidad Habitabilidad { get; set; }

        [JsonProperty("PaticipacionComunitaria")]
        public PaticipacionComunitaria PaticipacionComunitaria { get; set; }
    }
}