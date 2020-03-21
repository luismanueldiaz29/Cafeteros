using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class PaticipacionComunitaria
    {
        [JsonProperty("id")]
        public int id {get; set;}

        [JsonProperty("AsistenteAsamblea")]
        public string AsistenteAsamblea {get; set;}        

        [JsonProperty("CargoAsamblea")]
        public string CargoAsamblea { get; set; }

        [JsonProperty("AistenteTrabajos")]
        public string AistenteTrabajos { get; set; }

        [JsonProperty("CargoTrabajo")]
        public string CargoTrabajo { get; set; }

        [JsonProperty("OrganizacionAparte")]
        public string OrganizacionAparte { get; set; }

        [JsonProperty("CualOrganizacion")]
        public string CualOrganizacion { get; set; }

        [JsonProperty("AspectoEconomico")]
        public AspectoEconomico AspectoEconomico { get; set; }

        [JsonProperty("AspectoEconomicoId")]
        public int AspectoEconomicoId { get; set; }
    }
}