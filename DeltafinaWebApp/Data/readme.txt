DeltafinaWebApp.Data.Anagrafiche


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

//public DeltafinaGestCoreanagraficheContext()
//{
//}

//public DeltafinaGestCoreanagraficheContext(DbContextOptions<DeltafinaGestCoreanagraficheContext> options)
//    : base(options)
//{
//}

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Initial Catalog=DELTAFINA_DB;Data Source=__DB_SERVER__\\SQL2012;uid=__DB_USER__;pwd=__DB_PASSWORD__");
//            }
//        }








