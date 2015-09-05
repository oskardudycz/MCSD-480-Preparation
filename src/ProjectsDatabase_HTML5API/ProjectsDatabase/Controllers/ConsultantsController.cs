using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectsDatabase.Models;

namespace ProjectsDatabase.Controllers
{
    public class ConsultantsController : ApiController
    {
        private static List<Consultant> Consultants = new List<Consultant>() {
            new Consultant() { Id = 1, ProjectsInvolved = "1,2" },
            new Consultant() { Id = 2, ProjectsInvolved = "3,4" },
            new Consultant() { Id = 3, ProjectsInvolved = "1,5" }
        };
        public IEnumerable<Consultant> Get()
        {
            return Consultants;
        }

        // GET api/projects/5
        public Consultant Get(int id)
        {
            return Consultants.FirstOrDefault(x => x.Id == id);
        }
    }
}
