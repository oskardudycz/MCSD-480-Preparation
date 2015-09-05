using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectsDatabase.Models;

namespace ProjectsDatabase.Controllers
{
    public class ProjectsController : ApiController
    {
        // GET api/projects
        private static List<Project> Projects = new List<Project>() {
            new Project() { Id = 1, Number = "A0001" },
            new Project() { Id = 2, Number = "A0002" },
            new Project() { Id = 3, Number = "A0003" },
            new Project() { Id = 4, Number = "A0022" },
            new Project() { Id = 5, Number = "A0311" },
            new Project() { Id = 6, Number = "A3222" }
        };
        public IEnumerable<Project> Get()
        {
            return Projects;
        }

        // GET api/projects/5
        public Project Get(int id)
        {
            return Projects.FirstOrDefault(x => x.Id == id);
        }
    }
}