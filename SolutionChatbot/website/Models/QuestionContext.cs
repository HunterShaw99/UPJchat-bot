using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace website.Models
{
    public class QuestionContext : DbContext
    {
        public QuestionContext(DbContextOptions<QuestionContext> options)
            : base(options)
        {
        }

        public DbSet<QuestionModel> QuestionItems { get; set; } = null!;
    }
}