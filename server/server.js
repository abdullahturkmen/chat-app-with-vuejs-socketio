const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000);

let users = [];
let messages = [];

io.on('connection', socket => {

  socket.on('new_user', (name) => {
    users.push({
      id: socket.id,
      name
    });
    const username = name;
    io.emit('username', username);
    io.emit('users', users);
    io.emit('messages', messages);
  });

  socket.on('new_message', (message) => {
    messages.push({
      name: message.name,
      message: message.message
    });
    io.emit('messages', messages);
  });

  socket.on('disconnect', () => {
    
  const index = users.findIndex((element, index) => {
      if(element.id === socket.id){
        users.splice(index, 1);
        io.emit('users', users);
        return true;
      }
      
  });
  });
});
