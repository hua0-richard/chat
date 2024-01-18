import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

var users = 0;
var ID_Pokemon_Map_Dict = {};
var PokemonIDList = new Array(101).fill(0);
var messageHistory = []; 

function genRandomID() {
  for (let i = 0; i < 100; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    if (PokemonIDList[randomNum] === 0) {
      PokemonIDList[randomNum] = 1;
      return randomNum;
    }
  }
  return -1;
}

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // assign a unique pokemon name
  fetch(`https://pokeapi.co/api/v2/pokemon/${genRandomID()}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      users++;
      const upper = data.name[0].toUpperCase() + data.name.slice(1);
      ID_Pokemon_Map_Dict[socket.id] = upper;
      io.emit("userConnected", {
        user: socket.id,
        pokemon: ID_Pokemon_Map_Dict[socket.id],
      });
      io.emit("userCount", users);
    });
    
  // send message in chat
  socket.on("message", (data) => {
    let message = {
      user: socket.id,
      pokemon: ID_Pokemon_Map_Dict[socket.id],
      time: new Date(),
      data: data,
    };
    console.log(message);
    io.emit("message", message);
  });

  // user disconnect
  socket.on("disconnect", (data) => {
    users--;
    io.emit("userDisconnected", {
      user: socket.id,
      pokemon: ID_Pokemon_Map_Dict[socket.id],
    });
    io.emit("userCount", users);
  });
});

httpServer.listen(3500, () => console.log("listening on port 3500"));
