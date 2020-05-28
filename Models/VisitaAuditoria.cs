using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Cafeteros.Models
{
    public class VisitaAuditoria
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RecibeVisita")]
        public string RecibeVisita { get; set; }

        [JsonProperty("OportunidadMejora")]
        public string OportunidadMejora { get; set; }

        [JsonProperty("DecicionFinal")]
        public string DecicionFinal { get; set; }

        [JsonProperty("FechaFinal")]
        public string FechaFinal { get; set; }

        
        [JsonProperty("Productor")]
        public Productor Productor { get; set; }

        [JsonProperty("ProductorId")]
        public string ProductorId { get; set; }

        [JsonProperty("CultivosPresentandos")]
        public List<CultivosPresentandos> CultivosPresentandos = new List<CultivosPresentandos>();     

        [JsonProperty("OtrosCultivos")]
        public List<OtrosCultivos> OtrosCultivos = new List<OtrosCultivos>();     
        
        [JsonProperty("EvaluacionCompromiso")]
        public List<EvaluacionCompromiso> EvaluacionCompromiso = new List<EvaluacionCompromiso>();     

        //punto de evaluacion

        [JsonProperty("CB")]
        public CB CB {get; set;}

        [JsonProperty("MA")]
        public MA MA {get; set;}

        [JsonProperty("MSE")]
        public MSE MSE {get; set;}
        
        [JsonProperty("MIES")]
        public MIES MIES {get; set;}
        
        [JsonProperty("MS")]
        public MS MS {get; set;}

    }
}
