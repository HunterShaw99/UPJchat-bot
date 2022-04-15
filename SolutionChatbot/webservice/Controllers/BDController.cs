using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using website.Models;

namespace webservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BDController : Controller
    {

        [HttpGet]
        public String Get()
        {
            return "Hello";
        }
        /*
        [HttpPost]
        public async Task<ActionResult<QuestionModel>> PostQuestionModel(QuestionModel questionItem)
        {
            _context.QuestionItems.Add(questionItem);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { question = questionItem.question }, questionItem);
        }
        */
    }
}
