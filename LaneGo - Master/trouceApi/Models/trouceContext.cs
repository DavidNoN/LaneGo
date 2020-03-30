using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace trouceApi.Models
{
    public partial class trouceContext : DbContext
    {
        public trouceContext()
        {
        }

        public trouceContext(DbContextOptions<trouceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contents> Contents { get; set; }
        public virtual DbSet<Genres> Genres { get; set; }
        public virtual DbSet<Instruments> Instruments { get; set; }
        public virtual DbSet<PublicationContents> PublicationContents { get; set; }
        public virtual DbSet<Publications> Publications { get; set; }
        public virtual DbSet<Usergenres> Usergenres { get; set; }
        public virtual DbSet<Userinstruments> Userinstruments { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Clients> Clients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;database=trouce;user=root;pwd=1m2v3r4p;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contents>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Format)
                    .HasColumnName("format")
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Src)
                    .HasColumnName("src")
                    .HasColumnType("longtext");
            });

            modelBuilder.Entity<Genres>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Amountofusers)
                    .HasColumnName("amountofusers")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("longtext");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Src)
                    .HasColumnName("src")
                    .HasColumnType("longtext");
            });

            modelBuilder.Entity<Instruments>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Amountofusers)
                    .HasColumnName("amountofusers")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("longtext");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Src)
                    .HasColumnName("src")
                    .HasColumnType("longtext");
            });

            modelBuilder.Entity<PublicationContents>(entity =>
            {
                entity.HasKey(e => new { e.Pubid, e.Contentid })
                    .HasName("PRIMARY");

                entity.Property(e => e.Pubid)
                    .HasColumnName("pubid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Contentid)
                    .HasColumnName("contentid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Publications>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(800)");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Usergenres>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Genreid })
                    .HasName("PRIMARY");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Genreid)
                    .HasColumnName("genreid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Userinstruments>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Instrument })
                    .HasName("PRIMARY");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Instrument)
                    .HasColumnName("instrument")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Clients>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Clienttype)
                    .HasColumnName("clienttype")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nit)
                    .HasColumnName("nit")
                    .HasColumnType("int(15)");

                entity.Property(e => e.Companyname)
                    .HasColumnName("companyname")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Representativename)
                    .HasColumnName("representativename")
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(60)");

                entity.Property(e => e.Contactnumber)
                    .HasColumnName("contactnumber")
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasColumnType("varchar(30)");


                entity.Property(e => e.Comercialactivity)
                    .HasColumnName("comercialactivity")
                    .HasColumnType("longtext");


                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Achievements)
                    .HasColumnName("achievements")
                    .HasColumnType("longtext");

                entity.Property(e => e.Artistname)
                    .HasColumnName("artistname")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Contactemail)
                    .HasColumnName("contactemail")
                    .HasColumnType("varchar(60)");

                entity.Property(e => e.Contactphone)
                    .HasColumnName("contactphone")
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.Creationdate)
                    .HasColumnName("creationdate")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(60)");

                entity.Property(e => e.Experience)
                    .HasColumnName("experience")
                    .HasColumnType("longtext");

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasColumnType("text");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasColumnType("text");

                entity.Property(e => e.Paymentmethod)
                    .HasColumnName("paymentmethod")
                    .HasColumnType("longtext");

                entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasColumnType("varchar(20)");

                entity.Property(e => e.Picture)
                    .HasColumnName("picture")
                    .HasColumnType("longtext");

                entity.Property(e => e.Services)
                    .HasColumnName("services")
                    .HasColumnType("longtext");

                entity.Property(e => e.Sharelocation)
                    .HasColumnName("sharelocation")
                    .HasColumnType("int(1)");

                entity.Property(e => e.Usertype)
                    .HasColumnName("usertype")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Whatsapp)
                    .HasColumnName("whatsapp")
                    .HasColumnType("int(1)");
            });
        }
    }
}
