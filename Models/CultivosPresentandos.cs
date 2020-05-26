using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class CultivosPresentandos
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Cultivo")]
        public string Cultivo { get; set; }

        [JsonProperty("Area")]
        public int Area { get; set; }

        [JsonProperty("ProduccionObtenida")]
        public string ProduccionObtenida { get; set; }

        [JsonProperty("ProduccionEstimada")]
        public string ProduccionEstimada { get; set; }

        [JsonProperty("SustanciaNoPermitida")]
        public string SustanciaNoPermitida { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
        
    }
}