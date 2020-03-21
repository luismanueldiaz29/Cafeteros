using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class Familiar 
    {
        [JsonProperty("id")]
        public int id {get; set;}

        [JsonProperty("Nombre")]
        public string Nombre {get; set;}

        [JsonProperty("NumeroDocumento")]
        public string NumeroDocumento {get; set;}

        [JsonProperty("FechaNacimiento")]
        public string FechaNacimiento {get; set;}

        [JsonProperty("Parentesco")]
        public string Parentesco {get; set;}    

        [JsonProperty("TipoPoblacion")]
        public string TipoPoblacion {get; set;}

        [JsonProperty("AfiliacionSalud")]
        public string AfiliacionSalud {get; set;}

        [JsonProperty("NivelEducativo")]
        public string NivelEducativo {get; set;}

        [JsonProperty("ProductorId")]
        public string ProductorId {get; set;}

        [JsonProperty("Productor")]
        public Productor Productor {get; set;}        
    }
}