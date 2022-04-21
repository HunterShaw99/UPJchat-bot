#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using website.Models;

namespace webservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionModelsController : ControllerBase
    {
        private readonly QuestionContext _context;

        public QuestionModelsController(QuestionContext context)
        {
            _context = context;
        }

        // GET: api/QuestionModels
        // https://localhost:7115/api/QuestionModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> GetQuestionItems()
        {
            return await _context.Questions.ToListAsync();
        }

        // GET: api/QuestionModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionModel>> GetQuestionModel(int id)
        {
            var questionModel = await _context.Questions.FindAsync(id);

            if (questionModel == null)
            {
                return NotFound();
            }

            return questionModel;
        }

        // PUT: api/QuestionModels/5
        // https://localhost:7115/api/QuestionModels/1
        /*
         * {
         *  "id": 1,
         *  "answeredCorrectly": true,
         *   "question": "edited string"
         *  }
         */
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionModel(int id, QuestionModel questionModel)
        {
            if (id != questionModel.qID)
            {
                return BadRequest();
            }

            _context.Entry(questionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/QuestionModels
        // https://localhost:7115/api/QuestionModels
        /* 
         * {
         *  "answeredCorrectly": true,
         *  "question": "string"
         * }
         */
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuestionModel>> PostQuestionModel(QuestionModel questionModel)
        {
            _context.Questions.Add(questionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestionModel), new { id = questionModel.qID }, questionModel);
        }

        // DELETE: api/QuestionModels/5
        // https://localhost:7115/api/QuestionModels/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionModel(int id)
        {
            var questionModel = await _context.Questions.FindAsync(id);
            if (questionModel == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(questionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionModelExists(int id)
        {
            return _context.Questions.Any(e => e.qID == id);
        }
    }
}
