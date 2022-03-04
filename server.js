let express=require('express')
let app=express();
const http=require('http').createServer(app);

app.use(express.static('public'))


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/src/pages/index.html")
})

const port=3000;
http.listen(port,(err)=>{
  console.log(`server listening at port ${port}................`);
})
//socket.io


const io=require('socket.io')(http);

 io.on('connection',(socket)=>{
   
   console.log('connected......');
   
   socket.on('message',(msg)=>{
     socket.broadcast.emit('message',msg);
     console.log(msg);
     
   })
 })









