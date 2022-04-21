using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace website.Models
{
    
    public class QuestionModel
    {
        public string? question { get; set; }
        [Key]
        public int qID { get; set; }
        public int helpful { get; set; }
        public int nonhelpful { get; set; }
    }
}
