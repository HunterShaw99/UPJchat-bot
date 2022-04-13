using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webservice.Controllers
{
    public class BDController : Controller
    {
        // GET: BDController
        public ActionResult Index()
        {
            return View();
        }

        // GET: BDController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BDController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BDController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BDController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BDController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BDController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BDController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
