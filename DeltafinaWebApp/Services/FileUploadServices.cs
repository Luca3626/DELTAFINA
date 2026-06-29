using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Models.Account;
using Models.Archives;
using Models.Archives.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using DeltafinaWebApp.Data.Archives;
using Models;

namespace Services
{
    public class FileUploadServices
    {

        private ArchivesDbContext _anaContext;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private IHostingEnvironment _environment;


        public FileUploadServices(ArchivesDbContext anaContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IHostingEnvironment environment)
        {
            _anaContext = anaContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _environment = environment;
        }

        #region Maintenance Activities

        public async Task<Task> UploadMoreFileMaintenanceActivities(Guid activityId, IFormFileCollection files)
        {
            foreach (var item in files)
            {
                var httpPostedFile = item;

                var uploads = Path.Combine(_environment.WebRootPath, "Repository\\ActivityMaintenances\\" + activityId);

                string filePath = Path.Combine(uploads, httpPostedFile.FileName);

                // Associo l'url all'ordine
                FileUpload fu = new FileUpload()
                {
                    AbsoluteUrl = "/Repository/ActivityMaintenances/" + activityId + "/" + httpPostedFile.FileName,
                    ContentType = httpPostedFile.ContentType,
                    DateUpload = DateTime.Now,
                    FileLength = httpPostedFile.Length,
                    FileName = filePath,
                    Id = Guid.NewGuid(),
                    Name = httpPostedFile.FileName,
                    RelativeUrl = "Repository/ActivityMaintenances/" + activityId + "/" + httpPostedFile.FileName,
                    RewriteUrl = null
                };

                _anaContext.FileUpload.Add(fu);

                ActivitiesFileUpload mainFU = new ActivitiesFileUpload()
                {
                    FileUploadId = fu.Id,
                    ActivityId = activityId
                };

                _anaContext.ActivitiesFileUpload.Add(mainFU);

                _anaContext.SaveChanges();

                bool folderExists = Directory.Exists(uploads);
                if (!folderExists)
                    Directory.CreateDirectory(uploads);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await httpPostedFile.CopyToAsync(fileStream);
            }

            return Task.CompletedTask;
        }

        public Guid DeleteMoreFileMaintenanceActivities(Guid fileUploadId)//, string returnUrl = null)
        {
            FileUpload fu = _anaContext.FileUpload.Where(x => x.Id == fileUploadId).FirstOrDefault();
            if (fu != null)
            {
                var results = _anaContext.ActivitiesFileUpload.Where(x => x.FileUploadId == fileUploadId);
                _anaContext.ActivitiesFileUpload.RemoveRange(results);

                _anaContext.FileUpload.Remove(fu);

                _anaContext.SaveChanges();

                if (File.Exists(fu.FileName))
                    File.Delete(fu.FileName);

                return fu.Id;
            }
            else
                throw new Exception("File not found");
        }

        #endregion

    }
}
