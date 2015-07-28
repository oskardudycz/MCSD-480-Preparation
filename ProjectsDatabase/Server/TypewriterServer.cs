using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Server
{
    class TypewriterServer
    {
        public void UpdateTime(List<IWebSocketConnection> sockets) {
            Timer timer = new Timer();
            timer.Interval = 3000;
            timer.Elapsed += new ElapsedEventHandler((sender, e) => sockets.ToList().ForEach(s => s.Send("Current time: " + DateTime.Now.ToLocalTime())));
            timer.Enabled = true;
        }
        public void Start()
        {
            List<IWebSocketConnection> sockets = new List<IWebSocketConnection>();
            WebSocketServer server = new WebSocketServer("ws://127.0.0.1:60000");

            server.Start(socket =>
            {
                socket.OnOpen = () => { Console.WriteLine("Connection opened"); sockets.Add(socket); UpdateTime(sockets); };
                socket.OnClose = () => { Console.WriteLine("Connection closed"); sockets.Remove(socket); };
                socket.OnMessage = message => { Console.WriteLine("Message from client: " + message); sockets.ToList().ForEach(s => s.Send("Message received: " + message)); };
            });

        }
    }
}
