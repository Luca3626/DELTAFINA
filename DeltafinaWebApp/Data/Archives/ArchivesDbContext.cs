using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ArchivesDbContext : DbContext
    {
        public ArchivesDbContext()
        {
        }

        public ArchivesDbContext(DbContextOptions<ArchivesDbContext> options)
            : base(options)
        {
        }

        public static ArchivesDbContext Create(string connStr)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ArchivesDbContext>();
            optionsBuilder.UseSqlServer(connStr);

            return new ArchivesDbContext(optionsBuilder.Options);

            //ctx.OnModelCreating(new ModelBuilder(Convention))
        }

        public virtual DbSet<Acks> Acks { get; set; }
        public virtual DbSet<Activities> Activities { get; set; }
        public virtual DbSet<ActivitiesFileUpload> ActivitiesFileUpload { get; set; }
        public virtual DbSet<ActivitiesMaintenances> ActivitiesMaintenances { get; set; }
        public virtual DbSet<ActivitiesNotifyTo> ActivitiesNotifyTo { get; set; }
        public virtual DbSet<ActivitiesReports> ActivitiesReports { get; set; }
        public virtual DbSet<ActivitiesUsers> ActivitiesUsers { get; set; }
        public virtual DbSet<Addresses> Addresses { get; set; }
        public virtual DbSet<AddressTypes> AddressTypes { get; set; }
        public virtual DbSet<AdviseTypes> AdviseTypes { get; set; }
        public virtual DbSet<AlarmsContacts> AlarmsContacts { get; set; }
        public virtual DbSet<AlarmsNotifications> AlarmsNotifications { get; set; }
        public virtual DbSet<AlarmsNotifyTo> AlarmsNotifyTo { get; set; }
        public virtual DbSet<AlarmsUsers> AlarmsUsers { get; set; }
        public virtual DbSet<AlternativeEmail> AlternativeEmail { get; set; }
        public virtual DbSet<As400RequestQueue> As400RequestQueue { get; set; }
        public virtual DbSet<As400Requests> As400Requests { get; set; }
        public virtual DbSet<As400Responses> As400Responses { get; set; }
        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<Batches> Batches { get; set; }
        public virtual DbSet<BatchTypes> BatchTypes { get; set; }
        public virtual DbSet<Companies> Companies { get; set; }
        public virtual DbSet<CompaniesContacts> CompaniesContacts { get; set; }
        public virtual DbSet<Contacts> Contacts { get; set; }
        public virtual DbSet<ContactTypes> ContactTypes { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<DaysOfWeek> DaysOfWeek { get; set; }
        public virtual DbSet<DevicesDetails> DevicesDetails { get; set; }
        public virtual DbSet<DosingOrdersCompleted> DosingOrdersCompleted { get; set; }
        public virtual DbSet<DosingTotalizer> DosingTotalizer { get; set; }
        public virtual DbSet<DosingWorkshiftTotalizer> DosingWorkshiftTotalizer { get; set; }
        public virtual DbSet<FileUpload> FileUpload { get; set; }
        public virtual DbSet<GraphicTypes> GraphicTypes { get; set; }
        public virtual DbSet<HistoricalParameterChange> HistoricalParameterChange { get; set; }
        public virtual DbSet<LogCycleTypes> LogCycleTypes { get; set; }
        public virtual DbSet<LogHysteresisTypes> LogHysteresisTypes { get; set; }
        public virtual DbSet<LogValueTypes> LogValueTypes { get; set; }
        public virtual DbSet<Materials> Materials { get; set; }
        public virtual DbSet<MaterialsWarehouseSettings> MaterialsWarehouseSettings { get; set; }
        public virtual DbSet<MaterialTypes> MaterialTypes { get; set; }
        public virtual DbSet<NotifyTo> NotifyTo { get; set; }
        public virtual DbSet<NotifyToTypes> NotifyToTypes { get; set; }
        public virtual DbSet<Pictures> Pictures { get; set; }
        public virtual DbSet<Plannings> Plannings { get; set; }
        public virtual DbSet<Plcs> Plcs { get; set; }
        public virtual DbSet<PlcsZones> PlcsZones { get; set; }
        public virtual DbSet<PortalFarms> PortalFarms { get; set; }
        public virtual DbSet<RecipeGlasswares> RecipeGlasswares { get; set; }
        public virtual DbSet<Recipes> Recipes { get; set; }
        public virtual DbSet<RecipesMaterials> RecipesMaterials { get; set; }
        public virtual DbSet<RecipesWarehouses> RecipesWarehouses { get; set; }
        public virtual DbSet<RecipesWarehousesGlasswares> RecipesWarehousesGlasswares { get; set; }
        public virtual DbSet<RecipeTypes> RecipeTypes { get; set; }
        public virtual DbSet<RepetitionTypes> RepetitionTypes { get; set; }
        public virtual DbSet<Reports> Reports { get; set; }
        public virtual DbSet<ReportsNotifyTo> ReportsNotifyTo { get; set; }
        public virtual DbSet<ReportsTagsToSave> ReportsTagsToSave { get; set; }
        public virtual DbSet<ReportTypes> ReportTypes { get; set; }
        public virtual DbSet<ReportValueTypes> ReportValueTypes { get; set; }
        public virtual DbSet<RequestTypes> RequestTypes { get; set; }
        public virtual DbSet<SpecialDays> SpecialDays { get; set; }
        public virtual DbSet<TagLogging> TagLogging { get; set; }
        public virtual DbSet<TagsToSave> TagsToSave { get; set; }
        public virtual DbSet<TblAlarmSettings> TblAlarmSettings { get; set; }
        public virtual DbSet<TblAllarmi> TblAllarmi { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UserTypes> UserTypes { get; set; }
        public virtual DbSet<Warehouse> Warehouse { get; set; }
        public virtual DbSet<WarehouseContent> WarehouseContent { get; set; }
        public virtual DbSet<WarehouseLinks> WarehouseLinks { get; set; }
        public virtual DbSet<WarehouseType> WarehouseType { get; set; }
        public virtual DbSet<WorkStates> WorkStates { get; set; }
        public virtual DbSet<Zones> Zones { get; set; }
        public virtual DbSet<ZoneTypes> ZoneTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(local)\\SQLEXPRESS;Database=DELTAFINA_DB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Acks>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AckDate).HasColumnType("datetime");

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Activities>(entity =>
            {
                entity.HasKey(e => e.ActivityId);

                entity.Property(e => e.ActivityId).ValueGeneratedNever();

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.RegistrationDate).HasColumnType("date");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.Activities)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK_Activities_Plannings");
            });

            modelBuilder.Entity<ActivitiesFileUpload>(entity =>
            {
                entity.HasKey(e => new { e.ActivityId, e.FileUploadId });

                entity.ToTable("Activities_FileUpload");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivitiesFileUpload)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_FileUpload_Activities");

                entity.HasOne(d => d.FileUpload)
                    .WithMany(p => p.ActivitiesFileUpload)
                    .HasForeignKey(d => d.FileUploadId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_FileUpload_FileUpload");
            });

            modelBuilder.Entity<ActivitiesMaintenances>(entity =>
            {
                entity.HasKey(e => e.ActivityId);

                entity.Property(e => e.ActivityId).ValueGeneratedNever();

                entity.HasOne(d => d.Activity)
                    .WithOne(p => p.ActivitiesMaintenances)
                    .HasForeignKey<ActivitiesMaintenances>(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ActivitiesMaintenances_Activities");
            });

            modelBuilder.Entity<ActivitiesNotifyTo>(entity =>
            {
                entity.HasKey(e => new { e.ActivityId, e.NotifyToId });

                entity.ToTable("Activities_NotifyTo");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivitiesNotifyTo)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_NotifyTo_Activities");

                entity.HasOne(d => d.NotifyTo)
                    .WithMany(p => p.ActivitiesNotifyTo)
                    .HasForeignKey(d => d.NotifyToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_NotifyTo_NotifyTo");
            });

            modelBuilder.Entity<ActivitiesReports>(entity =>
            {
                entity.HasKey(e => new { e.ReportId, e.ActivityId });

                entity.ToTable("Activities_Reports");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivitiesReports)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_Reports_Activities");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ActivitiesReports)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_Reports_Reports");
            });

            modelBuilder.Entity<ActivitiesUsers>(entity =>
            {
                entity.HasKey(e => new { e.ActivityId, e.UsersId });

                entity.ToTable("Activities_Users");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.ActivitiesUsers)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_Users_Activities");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.ActivitiesUsers)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Activities_Users_Users");
            });

            modelBuilder.Entity<Addresses>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AddressCity).HasMaxLength(200);

                entity.Property(e => e.AddressCode).HasMaxLength(100);

                entity.Property(e => e.AddressLocation).HasMaxLength(500);

                entity.Property(e => e.AddressNumber).HasMaxLength(100);

                entity.Property(e => e.AddressState).HasMaxLength(200);

                entity.Property(e => e.AddressStreet).HasMaxLength(500);

                entity.Property(e => e.AddressZone).HasMaxLength(100);
            });

            modelBuilder.Entity<AddressTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<AdviseTypes>(entity =>
            {
                entity.HasKey(e => e.AdviseTypeId);

                entity.Property(e => e.AdviseTypeId).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AlarmsContacts>(entity =>
            {
                entity.HasKey(e => new { e.AlarmId, e.ContactId });

                entity.ToTable("Alarms_Contacts");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.AlarmsContacts)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Alarms_Contacts_Contacts");
            });

            modelBuilder.Entity<AlarmsNotifications>(entity =>
            {
                entity.HasKey(e => new { e.IdAlarm, e.IdSettingAlarm });

                entity.Property(e => e.DateActiveEmailSended).HasColumnType("smalldatetime");

                entity.Property(e => e.DateDisactiveEmailSended).HasColumnType("smalldatetime");
            });

            modelBuilder.Entity<AlarmsNotifyTo>(entity =>
            {
                entity.HasKey(e => new { e.AlarmId, e.NotifyToId });

                entity.ToTable("Alarms_NotifyTo");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.NotifyTo)
                    .WithMany(p => p.AlarmsNotifyTo)
                    .HasForeignKey(d => d.NotifyToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Alarms_NotifyTo_NotifyTo");
            });

            modelBuilder.Entity<AlarmsUsers>(entity =>
            {
                entity.HasKey(e => new { e.AlarmId, e.UserId });

                entity.ToTable("Alarms_Users");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AlarmsUsers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Alarms_Users_Users");
            });

            modelBuilder.Entity<AlternativeEmail>(entity =>
            {
                entity.HasKey(e => new { e.ContactId, e.AlternativeEmail1 });

                entity.Property(e => e.AlternativeEmail1)
                    .HasColumnName("AlternativeEmail")
                    .HasMaxLength(250);

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.AlternativeEmail)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlternativeEmail_Contacts");
            });

            modelBuilder.Entity<As400RequestQueue>(entity =>
            {
                entity.HasKey(e => new { e.RequestDate, e.RequestTime, e.RequestTypeId });

                entity.ToTable("AS400_RequestQueue");

                entity.Property(e => e.LastUpdate).HasColumnType("datetime");

                entity.Property(e => e.Note)
                    .IsRequired()
                    .HasMaxLength(1000);
            });

            modelBuilder.Entity<As400Requests>(entity =>
            {
                entity.HasKey(e => new { e.RequestDate, e.RequestTime, e.RequestTypeId });

                entity.ToTable("AS400_Requests");

                entity.Property(e => e.LastUpdate).HasColumnType("smalldatetime");

                entity.Property(e => e.Note)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.SiloCode).HasMaxLength(50);

                entity.HasOne(d => d.RequestType)
                    .WithMany(p => p.As400Requests)
                    .HasForeignKey(d => d.RequestTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AS400_Requests_RequestTypes");
            });

            modelBuilder.Entity<As400Responses>(entity =>
            {
                entity.ToTable("AS400_Responses");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.LastUpdate).HasColumnType("smalldatetime");

                entity.Property(e => e.SiloCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Request)
                    .WithMany(p => p.As400Responses)
                    .HasForeignKey(d => new { d.RequestDate, d.RequestTime, d.RequestTypeId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AS400_Responses_AS400_Requests");
            });

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.ProviderKey).HasMaxLength(128);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Batches>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.InitialDate).HasColumnType("datetime");

                entity.HasOne(d => d.BatchType)
                    .WithMany(p => p.Batches)
                    .HasForeignKey(d => d.BatchTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Batches_BatchTypes");
            });

            modelBuilder.Entity<BatchTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Prefix)
                    .IsRequired()
                    .HasMaxLength(5);
            });

            modelBuilder.Entity<Companies>(entity =>
            {
                entity.HasKey(e => e.CompanyId);

                entity.Property(e => e.CompanyId).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.TaxCode).HasMaxLength(100);

                entity.Property(e => e.Vat)
                    .HasColumnName("VAT")
                    .HasMaxLength(100);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Companies_Addresses");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Companies_Contacts");

                entity.HasOne(d => d.Picture)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.PictureId)
                    .HasConstraintName("FK_Companies_Pictures");
            });

            modelBuilder.Entity<CompaniesContacts>(entity =>
            {
                entity.HasKey(e => new { e.CompanyId, e.ContactId });

                entity.ToTable("Companies_Contacts");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompaniesContacts)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Companies_Contacts_Companies");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.CompaniesContacts)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Companies_Contacts_Contacts");
            });

            modelBuilder.Entity<Contacts>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(300);

                entity.Property(e => e.Fax).HasMaxLength(200);

                entity.Property(e => e.MobilePhone).HasMaxLength(100);

                entity.Property(e => e.MobilePhone2).HasMaxLength(100);

                entity.Property(e => e.NameContact).HasMaxLength(300);

                entity.Property(e => e.Phone).HasMaxLength(100);

                entity.Property(e => e.Skype).HasMaxLength(200);

                entity.Property(e => e.Url).HasMaxLength(400);

                entity.Property(e => e.WathsApp).HasMaxLength(200);

                entity.HasOne(d => d.ContactType)
                    .WithMany(p => p.Contacts)
                    .HasForeignKey(d => d.ContactTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contacts_ContactTypes");
            });

            modelBuilder.Entity<ContactTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.CustomerId);

                entity.Property(e => e.CustomerId).ValueGeneratedNever();

                entity.HasOne(d => d.Customer)
                    .WithOne(p => p.Customers)
                    .HasForeignKey<Customers>(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customers_Companies");
            });

            modelBuilder.Entity<DaysOfWeek>(entity =>
            {
                entity.HasKey(e => e.ShortName);

                entity.Property(e => e.ShortName)
                    .HasMaxLength(3)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DevicesDetails>(entity =>
            {
                entity.HasKey(e => e.DeviceName);

                entity.ToTable("Devices_Details");

                entity.Property(e => e.DeviceName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.LastUpdate).HasColumnType("smalldatetime");
            });

            modelBuilder.Entity<DosingOrdersCompleted>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.EndDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Material)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Note).HasMaxLength(1000);

                entity.Property(e => e.Recipe)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Scale)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Silo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SiloCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Unity)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WarehouseDestionation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaterialNavigation)
                    .WithMany(p => p.DosingOrdersCompleted)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingOrdersCompleted_Materials");

                entity.HasOne(d => d.RecipeNavigation)
                    .WithMany(p => p.DosingOrdersCompleted)
                    .HasForeignKey(d => d.RecipeId)
                    .HasConstraintName("FK_DosingOrdersCompleted_Recipes");

                entity.HasOne(d => d.WarehouseScale)
                    .WithMany(p => p.DosingOrdersCompletedWarehouseScale)
                    .HasForeignKey(d => d.WarehouseScaleId)
                    .HasConstraintName("FK_DosingOrdersCompleted_Warehouse1");

                entity.HasOne(d => d.WarehouseSilo)
                    .WithMany(p => p.DosingOrdersCompletedWarehouseSilo)
                    .HasForeignKey(d => d.WarehouseSiloId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingOrdersCompleted_Warehouse");
            });

            modelBuilder.Entity<DosingTotalizer>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Material)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Silo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SiloCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Unity)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaterialNavigation)
                    .WithMany(p => p.DosingTotalizer)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingTotalizer_Materials");

                entity.HasOne(d => d.WarehouseSilo)
                    .WithMany(p => p.DosingTotalizer)
                    .HasForeignKey(d => d.WarehouseSiloId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingTotalizer_Warehouse");
            });

            modelBuilder.Entity<DosingWorkshiftTotalizer>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Material)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Silo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SiloCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Unity)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Workshift)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaterialNavigation)
                    .WithMany(p => p.DosingWorkshiftTotalizer)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingWorkshiftTotalizer_Materials");

                entity.HasOne(d => d.WarehouseSilo)
                    .WithMany(p => p.DosingWorkshiftTotalizer)
                    .HasForeignKey(d => d.WarehouseSiloId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DosingWorkshiftTotalizer_Warehouse");
            });

            modelBuilder.Entity<FileUpload>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AbsoluteUrl)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.ContentType)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DateUpload).HasColumnType("smalldatetime");

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.RelativeUrl)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.RewriteUrl).HasMaxLength(1000);
            });

            modelBuilder.Entity<GraphicTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<HistoricalParameterChange>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdate).HasColumnType("smalldatetime");

                entity.Property(e => e.NewValue)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OldValue)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Unity)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserFullName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HistoricalParameterChange)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HistoricalParameterChange_Users");
            });

            modelBuilder.Entity<LogCycleTypes>(entity =>
            {
                entity.HasKey(e => e.CycleName);

                entity.Property(e => e.CycleName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<LogHysteresisTypes>(entity =>
            {
                entity.HasKey(e => e.HysteresisName);

                entity.Property(e => e.HysteresisName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<LogValueTypes>(entity =>
            {
                entity.HasKey(e => e.ValueName);

                entity.Property(e => e.ValueName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<Materials>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.SpecificWeightUdM)
                    .HasColumnName("SpecificWeight_UdM")
                    .HasMaxLength(20);

                entity.Property(e => e.UnityOfMeasure)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.MaterialType)
                    .WithMany(p => p.Materials)
                    .HasForeignKey(d => d.MaterialTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Materials_MaterialTypes");
            });

            modelBuilder.Entity<MaterialsWarehouseSettings>(entity =>
            {
                entity.HasKey(e => new { e.MaterialId, e.WarehouseId });

                entity.ToTable("Materials_Warehouse_Settings");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.MaterialsWarehouseSettings)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Materials_Warehouse_Settings_Materials");

                entity.HasOne(d => d.Warehouse)
                    .WithMany(p => p.MaterialsWarehouseSettings)
                    .HasForeignKey(d => d.WarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Materials_Warehouse_Settings_Warehouse");
            });

            modelBuilder.Entity<MaterialTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<NotifyTo>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.NotifyToValue)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.Recipient).HasMaxLength(500);

                entity.HasOne(d => d.NotifyToType)
                    .WithMany(p => p.NotifyTo)
                    .HasForeignKey(d => d.NotifyToTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotifyTo_NotifyToTypes");
            });

            modelBuilder.Entity<NotifyToTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Pictures>(entity =>
            {
                entity.HasKey(e => e.PictureId);

                entity.Property(e => e.PictureId).ValueGeneratedNever();

                entity.Property(e => e.ContentType).HasMaxLength(200);

                entity.Property(e => e.FileName).HasMaxLength(200);
            });

            modelBuilder.Entity<Plannings>(entity =>
            {
                entity.HasKey(e => e.PlanId);

                entity.Property(e => e.PlanId).ValueGeneratedNever();

                entity.Property(e => e.DateEnd).HasColumnType("datetime");

                entity.Property(e => e.DateStart).HasColumnType("datetime");

                entity.HasOne(d => d.AdviseType)
                    .WithMany(p => p.Plannings)
                    .HasForeignKey(d => d.AdviseTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Plannings_AdviseTypes");

                entity.HasOne(d => d.RepetitionType)
                    .WithMany(p => p.Plannings)
                    .HasForeignKey(d => d.RepetitionTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Plannings_RepetitionTypes");
            });

            modelBuilder.Entity<Plcs>(entity =>
            {
                entity.ToTable("PLCs");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.IpAddress)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PlcsZones>(entity =>
            {
                entity.HasKey(e => new { e.Plcid, e.ZoneId });

                entity.ToTable("PLCs_Zones");

                entity.Property(e => e.Plcid).HasColumnName("PLCId");

                entity.HasOne(d => d.Plc)
                    .WithMany(p => p.PlcsZones)
                    .HasForeignKey(d => d.Plcid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLCs_Zones_PLCs");

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.PlcsZones)
                    .HasForeignKey(d => d.ZoneId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLCs_Zones_Zones");
            });

            modelBuilder.Entity<PortalFarms>(entity =>
            {
                entity.HasKey(e => e.FarmId);

                entity.Property(e => e.FarmId).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.TaxCode).HasMaxLength(100);

                entity.Property(e => e.Vat)
                    .HasColumnName("VAT")
                    .HasMaxLength(100);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.PortalFarms)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK_PortalFarms_Addresses");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.PortalFarms)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_PortalFarms_Contacts");
            });

            modelBuilder.Entity<RecipeGlasswares>(entity =>
            {
                entity.HasKey(e => e.RecipeId);

                entity.Property(e => e.RecipeId).ValueGeneratedNever();

                entity.HasOne(d => d.Recipe)
                    .WithOne(p => p.RecipeGlasswares)
                    .HasForeignKey<RecipeGlasswares>(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RecipeGlasswares_Recipes");
            });

            modelBuilder.Entity<Recipes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code).HasMaxLength(10);

                entity.Property(e => e.CreationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_Recipes_Materials");

                entity.HasOne(d => d.RecipeType)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.RecipeTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_RecipeTypes");
            });

            modelBuilder.Entity<RecipesMaterials>(entity =>
            {
                entity.ToTable("Recipes_Materials");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.RecipesMaterials)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_Materials_Materials");

                entity.HasOne(d => d.Recipe)
                    .WithMany(p => p.RecipesMaterials)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_Materials_Recipes");
            });

            modelBuilder.Entity<RecipesWarehouses>(entity =>
            {
                entity.ToTable("Recipes_Warehouses");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.Recipe)
                    .WithMany(p => p.RecipesWarehouses)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_Warehouses_Glassware_Recipes");

                entity.HasOne(d => d.Warehouse)
                    .WithMany(p => p.RecipesWarehouses)
                    .HasForeignKey(d => d.WarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_Warehouses_Glassware_Warehouse");
            });

            modelBuilder.Entity<RecipesWarehousesGlasswares>(entity =>
            {
                entity.HasKey(e => e.RecipeWarehouseId);

                entity.ToTable("Recipes_Warehouses_Glasswares");

                entity.Property(e => e.RecipeWarehouseId).ValueGeneratedNever();

                entity.HasOne(d => d.RecipeWarehouse)
                    .WithOne(p => p.RecipesWarehousesGlasswares)
                    .HasForeignKey<RecipesWarehousesGlasswares>(d => d.RecipeWarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recipes_Warehouses_Glasswares_Recipes_Warehouses");
            });

            modelBuilder.Entity<RecipeTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<RepetitionTypes>(entity =>
            {
                entity.HasKey(e => e.RepetitionTypeId);

                entity.Property(e => e.RepetitionTypeId).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Reports>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Body)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.CreationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.DateEnd).HasColumnType("datetime");

                entity.Property(e => e.DateStart).HasColumnType("datetime");

                entity.Property(e => e.LastSent).HasColumnType("smalldatetime");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.AdviseType)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.AdviseTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_AdviseTypes");

                entity.HasOne(d => d.RepetitionType)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.RepetitionTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_RepetitionTypes");

                entity.HasOne(d => d.ReportType)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.ReportTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_ReportTypes");
            });

            modelBuilder.Entity<ReportsNotifyTo>(entity =>
            {
                entity.HasKey(e => new { e.ReportId, e.NotifyToId });

                entity.ToTable("Reports_NotifyTo");

                entity.HasOne(d => d.NotifyTo)
                    .WithMany(p => p.ReportsNotifyTo)
                    .HasForeignKey(d => d.NotifyToId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_NotifyTo_NotifyTo");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ReportsNotifyTo)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_NotifyTo_Reports");
            });

            modelBuilder.Entity<ReportsTagsToSave>(entity =>
            {
                entity.HasKey(e => new { e.ReportId, e.TagLogName });

                entity.ToTable("Reports_TagsToSave");

                entity.Property(e => e.TagLogName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Unit)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ValueType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.GraphicType)
                    .WithMany(p => p.ReportsTagsToSave)
                    .HasForeignKey(d => d.GraphicTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_TagsToSave_GraphicTypes");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ReportsTagsToSave)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_TagsToSave_Reports");

                entity.HasOne(d => d.TagLogNameNavigation)
                    .WithMany(p => p.ReportsTagsToSave)
                    .HasForeignKey(d => d.TagLogName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_TagsToSave_TagsToSave");

                entity.HasOne(d => d.ValueTypeNavigation)
                    .WithMany(p => p.ReportsTagsToSave)
                    .HasForeignKey(d => d.ValueType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reports_TagsToSave_ReportValueTypes");
            });

            modelBuilder.Entity<ReportTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<ReportValueTypes>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<RequestTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SpecialDays>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DateCreation).HasColumnType("smalldatetime");

                entity.Property(e => e.LastUpdate).HasColumnType("smalldatetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<TagLogging>(entity =>
            {
                entity.HasKey(e => new { e.TagLogName, e.LogDate });

                entity.Property(e => e.TagLogName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LogDate).HasColumnType("datetime");

                entity.Property(e => e.Plcname)
                    .IsRequired()
                    .HasColumnName("PLCName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TagPlcname)
                    .IsRequired()
                    .HasColumnName("TagPLCName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.TagLogNameNavigation)
                    .WithMany(p => p.TagLogging)
                    .HasForeignKey(d => d.TagLogName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagLogging_TagsToSave");
            });

            modelBuilder.Entity<TagsToSave>(entity =>
            {
                entity.HasKey(e => e.TagLogName);

                entity.Property(e => e.TagLogName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreationDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Descriptions)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.HysteresisType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastLog).HasColumnType("datetime");

                entity.Property(e => e.LastUpdateDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Plcname)
                    .IsRequired()
                    .HasColumnName("PLCName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TagPlcname)
                    .IsRequired()
                    .HasColumnName("TagPLCName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TimeCycleDetection)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TimeCycleForSave)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Unit)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ValueType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ZoneName)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.HysteresisTypeNavigation)
                    .WithMany(p => p.TagsToSave)
                    .HasForeignKey(d => d.HysteresisType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagsToSave_LogHysteresisTypes");

                entity.HasOne(d => d.TimeCycleDetectionNavigation)
                    .WithMany(p => p.TagsToSaveTimeCycleDetectionNavigation)
                    .HasForeignKey(d => d.TimeCycleDetection)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagsToSave_LogCycleTypes");

                entity.HasOne(d => d.TimeCycleForSaveNavigation)
                    .WithMany(p => p.TagsToSaveTimeCycleForSaveNavigation)
                    .HasForeignKey(d => d.TimeCycleForSave)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TagsToSave_LogCycleTypes2");

                entity.HasOne(d => d.ValueTypeNavigation)
                    .WithMany(p => p.TagsToSave)
                    .HasForeignKey(d => d.ValueType)
                    .HasConstraintName("FK_TagsToSave_LogValueTypes");
            });

            modelBuilder.Entity<TblAlarmSettings>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.TagName });

                entity.ToTable("tblAlarmSettings");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TagName)
                    .HasColumnName("Tag_Name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SendSms).HasColumnName("SendSMS");

                entity.Property(e => e.TestoLang1)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.TestoLang2)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.TestoLang3)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Utenza)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Zona)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblAllarmi>(entity =>
            {
                entity.HasKey(e => e.Num);

                entity.ToTable("tblAllarmi");

                entity.Property(e => e.Num).ValueGeneratedNever();

                entity.Property(e => e.Categoria)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DataAck)
                    .HasColumnName("DataACK")
                    .HasColumnType("datetime");

                entity.Property(e => e.DataIn)
                    .HasColumnName("DataIN")
                    .HasColumnType("datetime");

                entity.Property(e => e.DataOut)
                    .HasColumnName("DataOUT")
                    .HasColumnType("datetime");

                entity.Property(e => e.PlcName)
                    .IsRequired()
                    .HasColumnName("PLC_Name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Stato)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasColumnName("Tag_Name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TestoLang1)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.TestoLang2)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.TestoLang3)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Utenza)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Zona)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.UsersId).ValueGeneratedNever();

                entity.Property(e => e.BornDate).HasColumnType("smalldatetime");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Gender).HasMaxLength(100);

                entity.Property(e => e.Job).HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.NickName).HasMaxLength(50);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Addresses");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Contacts");

                entity.HasOne(d => d.Picture)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PictureId)
                    .HasConstraintName("FK_Users_Pictures");

                entity.HasOne(d => d.PortalFarm)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PortalFarmId)
                    .HasConstraintName("FK_Users_PortalFarms1");

                entity.HasOne(d => d.UserType)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_UserTypes");
            });

            modelBuilder.Entity<UserTypes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.Warehouse)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_Warehouse_Materials");

                entity.HasOne(d => d.WarehouseType)
                    .WithMany(p => p.Warehouse)
                    .HasForeignKey(d => d.WarehouseTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Warehouse_WarehouseType");
            });

            modelBuilder.Entity<WarehouseContent>(entity =>
            {
                entity.HasKey(e => new { e.WarehouseId, e.Layer });

                entity.Property(e => e.Layer).HasColumnName("layer");

                entity.HasOne(d => d.Batch)
                    .WithMany(p => p.WarehouseContent)
                    .HasForeignKey(d => d.BatchId)
                    .HasConstraintName("FK_WarehouseContent_Batches");

                entity.HasOne(d => d.Warehouse)
                    .WithMany(p => p.WarehouseContent)
                    .HasForeignKey(d => d.WarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseContent_Warehouse");
            });

            modelBuilder.Entity<WarehouseLinks>(entity =>
            {
                entity.HasKey(e => new { e.WarehouseIdFrom, e.WarehouseIdTo });

                entity.HasOne(d => d.WarehouseIdFromNavigation)
                    .WithMany(p => p.WarehouseLinksWarehouseIdFromNavigation)
                    .HasForeignKey(d => d.WarehouseIdFrom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseLinks_Warehouse");

                entity.HasOne(d => d.WarehouseIdToNavigation)
                    .WithMany(p => p.WarehouseLinksWarehouseIdToNavigation)
                    .HasForeignKey(d => d.WarehouseIdTo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseLinks_Warehouse1");
            });

            modelBuilder.Entity<WarehouseType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WorkStates>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Zones>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.ZoneType)
                    .WithMany(p => p.Zones)
                    .HasForeignKey(d => d.ZoneTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Machines_MachineTypes");
            });

            modelBuilder.Entity<ZoneTypes>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500);
            });
        }
    }
}
