using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives.Recipes;
using Services;
using Microsoft.AspNetCore.Authorization;
using Models.Archives.Recipes.Glassware;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IdentityUser _identityUser;


        public RecipeController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse CreateRecipe(RecipeGlasswareModel model)
        {
            try
            {
                RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
                serv.CreateRecipe(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = ""
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

        [HttpGet("[action]")]
        public RecipeGlasswareModel GetForNew()
        {
            RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
            return serv.GetForNew();
        }

        [HttpGet("[action]")]
        public RecipeGlasswareModel GetById()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
            return serv.GetRecipeById(new Guid(recipeId));
        }

        [HttpGet("[action]")]
        public IList<RecipeGlasswareModel> GetList()
        {
            RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
            return serv.GetRecipes();
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse UpdateRecipe(RecipeGlasswareModel model)
        {
            try
            {
                RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
                if (model.Id.HasValue)
                    serv.UpdateRecipe(model);
                else
                    serv.CreateRecipe(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = ""
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }            
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse DeleteRecipe(RecipeGlasswareModel model)
        {
            try
            {
                RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
                serv.DeleteRecipe(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = ""
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

        [HttpGet("[action]")]
        public RecipeGlasswareModel GetRecipeByProgressiveId()
        {
            string progressiveId = HttpContext.Request.Query["progressiveId"].Count > 0 ? HttpContext.Request.Query["progressiveId"].ToString() : "";

            RecipeGlasswareServices serv = new RecipeGlasswareServices(_anaContext);
            return serv.GetRecipeByProgressiveId(int.Parse(progressiveId));
        }

        [HttpGet("[action]")]
        public GenericResponse RunRecipe()//[FromHeader] string id)
        {
            try
            {
                string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";
                if (recipeId.Length > 0)
                {
                    Tasks.RecipeTask.Recipe_ID = new Guid(recipeId);
                    Tasks.RecipeTask.NewRecipe = true;

                    return new GenericResponse
                    {
                        Status = "Success",
                        Value = recipeId
                    };
                }
                else
                    return new GenericResponse
                    {
                        Status = "Failed",
                        Value = "Event id not valid"
                    };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

    }
}