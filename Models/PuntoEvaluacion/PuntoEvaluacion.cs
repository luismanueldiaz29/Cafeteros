using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cafeteros.Models
{
    public class PuntoEvaluacion{


    }

    public class CB
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RespuestaCB1")]
        public string RespuestaCB1 { get; set; }

        [JsonProperty("JustificacionCB1")]
        public string JustificacionCB1 { get; set; }

        [JsonProperty("RespuestaCB2")]
        public string RespuestaCB2 { get; set; }

        [JsonProperty("JustificacionCB2")]
        public string JustificacionCB2 { get; set; }

        [JsonProperty("ComentarioCB")]
        public string ComentarioCB { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
    }

    public class MA{

        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RespuestaMA1")]
        public string RespuestaCB1 { get; set; }

        [JsonProperty("JustificacionMA1")]
        public string JustificacionCB1 { get; set; }

        [JsonProperty("RespuestaMA2")]
        public string RespuestaMA2 { get; set; }

        [JsonProperty("JustificacionMA2")]
        public string JustificacionMA2 { get; set; }

        [JsonProperty("RespuestaMA3")]
        public string RespuestaMA3 { get; set; }

        [JsonProperty("JustificacionMA3")]
        public string JustificacionMA3 { get; set; }

        [JsonProperty("RespuestaMA4")]
        public string RespuestaMA4 { get; set; }       

        [JsonProperty("JustificacionMA4")]
        public string JustificacionMA4 { get; set; }

        [JsonProperty("ComentarioMA")]
        public string ComentarioMA { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
    }

    public class MSE{
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RespuestaMSE1")]
        public string RespuestaMSE1 { get; set; }

        [JsonProperty("JustificacionMSE1")]
        public string JustificacionMSE1 { get; set; }

        [JsonProperty("RespuestaMSE2")]
        public string RespuestaMSE2 { get; set; }

        [JsonProperty("JustificacionMSE2")]
        public string JustificacionMSE3 { get; set; }

        [JsonProperty("RespuestaMSE3")]
        public string RespuestaMSE3 { get; set; }

        [JsonProperty("JustificacionMSE3")]
        public string JustificacionMA3 { get; set; }

        [JsonProperty("ComentarioMSE")]
        public string ComentarioMSE { get; set; }
        
        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
    }

    public class MIES{
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RespuestaMIES1")]
        public string RespuestaMIES1 { get; set; }

        [JsonProperty("JustificacionMIES1")]
        public string JustificacionMIES1 { get; set; }

        [JsonProperty("RespuestaMIES2")]
        public string RespuestaMIES2 { get; set; }

        [JsonProperty("JustificacionMIES2")]
        public string JustificacionMIES2 { get; set; }

        [JsonProperty("RespuestaMIES3")]
        public string RespuestaMIES3 { get; set; }

        [JsonProperty("JustificacionMIES3")]
        public string JustificacionMIES3 { get; set; }

        [JsonProperty("RespuestaMIES4")]
        public string RespuestaMIES4 { get; set; }       

        [JsonProperty("JustificacionMIES4")]
        public string JustificacionMIES4 { get; set; }

        [JsonProperty("RespuestaMIES5")]
        public string RespuestaMIES5 { get; set; }       

        [JsonProperty("JustificacionMIES5")]
        public string JustificacionMIES5 { get; set; }

        [JsonProperty("ComentarioMIES")]
        public string ComentarioMIES { get; set; }

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
    }

    public class MS{
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("RespuestaMS1")]
        public string RespuestaMS1 { get; set; }

        [JsonProperty("JustificacionMS1")]
        public string JustificacionMS1 { get; set; }

        [JsonProperty("RespuestaMS2")]
        public string RespuestaMS2 { get; set; }

        [JsonProperty("JustificacionMS2")]
        public string JustificacionMS2 { get; set; }

        [JsonProperty("RespuestaMS3")]
        public string RespuestaMS3 { get; set; }

        [JsonProperty("JustificacionMS3")]
        public string JustificacionMS3 { get; set; }

        [JsonProperty("RespuestaMS4")]
        public string RespuestaMS4 { get; set; }       

        [JsonProperty("JustificacionMS4")]
        public string JustificacionMS4 { get; set; }

        [JsonProperty("RespuestaMS5")]
        public string RespuestaMS5 { get; set; }       

        [JsonProperty("JustificacionMS5")]
        public string JustificacionMS5 { get; set; }

        [JsonProperty("ComentarioMS")]
        public string ComentarioMS { get; set; }       

        [JsonProperty("VisitaAuditoria")]
        public VisitaAuditoria VisitaAuditoria { get; set; }

        [JsonProperty("VisitaAuditoriaId")]
        public int VisitaAuditoriaId { get; set; }
    }
}