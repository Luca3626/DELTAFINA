using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Models;
using Models.Archives.Slicer;
using Services;
using DeltafinaWebApp.Data.Archives;

namespace DeltafinaWebApp.Controllers
{
    /// <summary>
    /// Dati di impianto degli slicer che non arrivano dal PLC ma dall'archivio.
    /// Per ora la sola voce e' il registro delle pesate casse scritto da SlicerWeighingTask.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SlicerController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public SlicerController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: pesate di una linea ("VSL" / "BSL") nell'intervallo di giornate produttive.
        // Le date arrivano come "aaaa-mm-gg", cioe' giorni interi: come in
        // GetDetailListByRange dei dosaggi passano dalla query string e non dal corpo JSON,
        // cosi' non c'e' un fuso orario di mezzo che sposti l'estremo dell'intervallo.
        [HttpGet("[action]")]
        public IEnumerable<SlicerWeighingModel> GetWeighings()
        {
            string lineCode = HttpContext.Request.Query["lineCode"].Count > 0 ? HttpContext.Request.Query["lineCode"].ToString() : "";
            string dateFrom = HttpContext.Request.Query["dateFrom"].Count > 0 ? HttpContext.Request.Query["dateFrom"].ToString() : "";
            string dateTo = HttpContext.Request.Query["dateTo"].Count > 0 ? HttpContext.Request.Query["dateTo"].ToString() : "";

            SlicerWeighingQueryModel model = new SlicerWeighingQueryModel()
            {
                LineCode = lineCode,
                StartDate = DateTime.Parse(dateFrom),
                EndDate = DateTime.Parse(dateTo)
            };

            SlicerWeighingServices serv = new SlicerWeighingServices(_anaContext);
            return serv.GetWeighings(model);
        }

    }
}
