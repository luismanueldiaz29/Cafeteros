using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class VisitaPromotoria
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("FechaVisita")]
        public string FechaVisita { get; set; }

        [JsonProperty("HoraVisita")]
        public string HoraVisita { get; set; }

        [JsonProperty("FechaProxVista")]
        public string FechaProxVista { get; set; }

        [JsonProperty("ObjetivoVisita")]
        public string ObjetivoVisita { get; set; }

        [JsonProperty("SituacionEncontrada")]
        public string SituacionEncontrada { get; set; }

        [JsonProperty("IntercambioSaberes")]
        public string IntercambioSaberes { get; set; }

        [JsonProperty("Productor")]
        public Productor Productor { get; set; }

        [JsonProperty("ProductorId")]
        public string ProductorId { get; set; }

        [JsonProperty("Tecnico")]
        public Tecnico Tecnico { get; set; }

        [JsonProperty("TecnicoId")]
        public string TecnicoId { get; set; }

        public List<LaboresProgramada> LaboresProgramadas = new List<LaboresProgramada>();  

        public List<LaboresRealizada> LaboresRealizadas = new List<LaboresRealizada>();  
    }
}