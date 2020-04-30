using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class Productor
    {
        [JsonProperty("id")][Key]
        public string id { get; set; }

        [JsonProperty("Nombre")]
        public string Nombre { get; set; }

        [JsonProperty("CodigoCafetero")]
        public string CodigoCafetero { get; set; }

        [JsonProperty("NombrePredio")]
        public string NombrePredio {get; set;}

        [JsonProperty("CodigoSica")]
        public string CodigoSica {get; set;}

        [JsonProperty("Municipio")]
        public string Municipio {get; set;}

        [JsonProperty("Vereda")]
        public string Vereda {get; set;}

        [JsonProperty("NumeroTelefono")]
        public string NumeroTelefono {get; set;}  

        [JsonProperty("FechaRegistro")]
        public string FechaRegistro {get; set;}  
        
        [JsonProperty("FechaAsociacion")]
        public string FechaAsociacion {get; set;}  
         
        [JsonProperty("FechaNoAsociacion")]
        public string FechaNoAsociacion {get; set;}  

        [JsonProperty("AfiliacionSalud")]
        public string AfiliacionSalud {get; set;}

        [JsonProperty("ActvidadesDedican")]
        public string ActvidadesDedican {get; set;}

        [JsonProperty("Estado")]
        public int Estado {get; set;}

        [JsonProperty("Familiares")]
        public List<Familiar> Familiares = new List<Familiar>();

        [JsonProperty("VisitaPromotorias")]
        public List<VisitaPromotoria> VisitaPromotorias = new List<VisitaPromotoria>();     

        [JsonProperty("DisponibilidadAgua")]
        public List<DisponibilidadAgua> DisponibilidadAgua = new List<DisponibilidadAgua>();     

        [JsonProperty("AspectoEconomico")]
        public AspectoEconomico AspectoEconomico {get; set;}

        [JsonProperty("AlmacenamientoAgua")]
        public AlmacenamientoAgua AlmacenamientoAgua {get; set;}

    }
}