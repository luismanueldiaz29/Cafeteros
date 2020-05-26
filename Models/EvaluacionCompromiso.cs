using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class EvaluacionCompromiso
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Codigo")]
        public string Codigo { get; set; }

        [JsonProperty("AccionCorrectiva")]
        public string AccionCorrectiva { get; set; }

        [JsonProperty("Completado")]
        public string Completado { get; set; }

        [JsonProperty("Razones")]
        public string Razones { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
        
    }
}