using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class Tecnico
    {
        [JsonProperty("Correo")][Key]
        public string Correo { get; set; }

        [JsonProperty("Identificacion")]
        public string Identificacion { get; set; }

        [JsonProperty("Contraseña")]
        public string Contraseña { get; set; }

        [JsonProperty("Nombre")]
        public string Nombre { get; set; }

        [JsonProperty("Productores")]
        public List<Productor> Productores = new List<Productor>();

        [JsonProperty("VisitaPromotorias")]
        public List<VisitaPromotoria> VisitaPromotorias = new List<VisitaPromotoria>();
    }
}