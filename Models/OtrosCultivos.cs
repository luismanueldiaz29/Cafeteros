using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Cafeteros.Models
{
    public class OtrosCultivos
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("Cultivo")]
        public string Cultivo { get; set; }

        [JsonProperty("Area")]
        public int Area { get; set; }

        [JsonProperty("TipoOrganico")]
        public string TipoOrganico { get; set; }

        [JsonProperty("Uso")]
        public string Uso { get; set; }

        [JsonProperty("Riesgo")]
        public string Riesgo { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }

    }
}
