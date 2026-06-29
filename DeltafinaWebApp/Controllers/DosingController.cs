using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Archives.Dosing;
using Services;
using DeltafinaWebApp.Data.Archives;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DosingController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public DosingController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region Metodi Dosaggi

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingDetailModel> GetLastDetail()
        {
            string take = HttpContext.Request.Query["take"].Count > 0 ? HttpContext.Request.Query["take"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetLastDetail(int.Parse(take));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingDetailModel> GetDetailListByYear()
        {
            string year = HttpContext.Request.Query["year"].Count > 0 ? HttpContext.Request.Query["year"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetDetailListByYear(int.Parse(year));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingDetailModel> GetDetailListByDate()
        {
            string date = HttpContext.Request.Query["date"].Count > 0 ? HttpContext.Request.Query["date"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetDetailListByDate(DateTime.Parse(date));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingDetailModel> GetDetailListByRange()
        {
            string dateFrom = HttpContext.Request.Query["dateFrom"].Count > 0 ? HttpContext.Request.Query["dateFrom"].ToString() : "";
            string dateTo = HttpContext.Request.Query["dateTo"].Count > 0 ? HttpContext.Request.Query["dateTo"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetDetailListByRange(DateTime.Parse(dateFrom), DateTime.Parse(dateTo));
        }

        #endregion


        #region Metodi Totali Giornalieri Dosaggi

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingTotalizerModel> GetLastTotalizer()
        {
            string take = HttpContext.Request.Query["take"].Count > 0 ? HttpContext.Request.Query["take"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetLastTotalizer(int.Parse(take));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingTotalizerModel> GetTotalizerListByYear()
        {
            string year = HttpContext.Request.Query["year"].Count > 0 ? HttpContext.Request.Query["year"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetTotalizerListByYear(int.Parse(year));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingTotalizerModel> GetTotalizerListByDate()
        {
            string date = HttpContext.Request.Query["date"].Count > 0 ? HttpContext.Request.Query["date"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetTotalizerListByDate(DateTime.Parse(date));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingTotalizerModel> GetTotalizerListByRange()
        {
            string dateFrom = HttpContext.Request.Query["dateFrom"].Count > 0 ? HttpContext.Request.Query["dateFrom"].ToString() : "";
            string dateTo = HttpContext.Request.Query["dateTo"].Count > 0 ? HttpContext.Request.Query["dateTo"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetTotalizerListByRange(DateTime.Parse(dateFrom), DateTime.Parse(dateTo));
        }

        #endregion


        #region Metodi Totali Di Turno dei Dosaggi

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingWorkshiftTotalizerModel> GetLastWorkshiftTotalizer()
        {
            string take = HttpContext.Request.Query["take"].Count > 0 ? HttpContext.Request.Query["take"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetLastWorkshiftTotalizer(int.Parse(take));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByYear()
        {
            string year = HttpContext.Request.Query["year"].Count > 0 ? HttpContext.Request.Query["year"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetWorkshiftTotalizerListByYear(int.Parse(year));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByDate()
        {
            string date = HttpContext.Request.Query["date"].Count > 0 ? HttpContext.Request.Query["date"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetWorkshiftTotalizerListByDate(DateTime.Parse(date));
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByRange()
        {
            string dateFrom = HttpContext.Request.Query["dateFrom"].Count > 0 ? HttpContext.Request.Query["dateFrom"].ToString() : "";
            string dateTo = HttpContext.Request.Query["dateTo"].Count > 0 ? HttpContext.Request.Query["dateTo"].ToString() : "";

            DosingServices serv = new DosingServices(_anaContext);
            return serv.GetWorkshiftTotalizerListByRange(DateTime.Parse(dateFrom), DateTime.Parse(dateTo));
        }

        #endregion

    }
}