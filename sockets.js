
let server=new require('ws').Server
let s= new server({port:5500})
s.on('connection',function(socket){
    console.log(`${s.clients.size} client connected`)
socket.on('message',function(message)  {
console.log("i am working")

message=JSON.parse(message)
if(message.type =="name"){
socket.personName=message.data
return
}

    console.log(`Message Recieved `+ message.data)
    s.clients.forEach(function e(client) {
        if(client != socket){
        client.send(JSON.stringify({
            name: socket.personName,
            data: message.data

        }))}
    });
    // socket.send(message)
})
socket.on("close",function(){

console.log(`${s.clients.size} clients left`)

})

})