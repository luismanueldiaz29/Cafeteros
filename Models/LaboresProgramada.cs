using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class LaboresProgramada
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Actividad")]
        public string Actividad { get; set; }

        [JsonProperty("Fecha")]
        public string Fecha { get; set; }

        [JsonProperty("VisitaPromotoria")]
        public VisitaPromotoria VisitaPromotoria { get; set; }

        [JsonProperty("VisitaPromotoriaId")]
        public int VisitaPromotoriaId { get; set; }
        
    }
}