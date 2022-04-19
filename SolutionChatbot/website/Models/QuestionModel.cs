using Microsoft.EntityFrameworkCore;

namespace website.Models
{
    [Keyless]
    public class QuestionModel
    {
        public string? question { get; set; }
        public int qID { get; set; }
        public int helpful { get; set; }
        public int nonhelpful { get; set; }
    }
}
