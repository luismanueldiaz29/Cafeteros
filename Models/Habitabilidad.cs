using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class Habitabilidad
    {
        [JsonProperty("id")]
        public int id {get; set;}

        [JsonProperty("TipoVivienda")]
        public string TipoVivienda {get; set;}

        [JsonProperty("NumeroHabitaciones")]
        public int NumeroHabitaciones { get; set; }

        [JsonProperty("MaterialPredominante")]
        public string MaterialPredominante { get; set; }

        [JsonProperty("MaterialTecho")]
        public string MaterialTecho { get; set; }

        [JsonProperty("MaterialCosinar")]
        public string MaterialCosinar { get; set; }

        [JsonProperty("EnergiaCosinar")]
        public string EnergiaCosinar { get; set; }

        [JsonProperty("ServicioSanitario")]
        public string ServicioSanitario { get; set; }

        [JsonProperty("TipoAlumbrado")]
        public string TipoAlumbrado { get; set; }

        [JsonProperty("AspectoEconomicoId")]
        public int AspectoEconomicoId { get; set; }

        [JsonProperty("AspectoEconomico")]
        public AspectoEconomico AspectoEconomico { get; set; }


    }
}