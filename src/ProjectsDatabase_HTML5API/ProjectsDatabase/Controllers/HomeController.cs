using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectsDatabase.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProjectsGrid()
        {
            return View();
        }
        public ActionResult ConsultantsGrid()
        {
            return View();
        }
        public ActionResult ConsultantsGridWebWorker()
        {
            return View();
        }
        public ActionResult Client()
        {
            return View();
        }
    }
}
