using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            TypewriterServer server = new TypewriterServer();
            server.Start();
            Console.WriteLine("Input 'exit' to close the server");
            Console.ReadLine();
        }
    }
}
