using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class ResultadoEvaluacion
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Codigo")]
        public string Codigo { get; set; }

        [JsonProperty("Hallazgo")]
        public string Hallazgo { get; set; }

        [JsonProperty("AccionPropuesta")]
        public string AccionPropuesta { get; set; }

        [JsonProperty("TiempoAcordado")]
        public string TiempoAcordado { get; set; }
        
        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }

    }
}