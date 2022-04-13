namespace website.Models
{
    public class QuestionModel
    {
        public long Id { get; set; }
        public bool AnsweredCorrectly { get; set; }
        public string? Question { get; set; }
    }
}
