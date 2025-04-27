const express  = require("express");
const app = express();
const path = require("path");// for using path variable in fetching path . 
const fs = require('fs');
const { log } = require("console");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));
//__dirname --> path batata hai current lfolder ka and join krdiya iska mtlb ustk means public wli folder tk ka path.
app.set("views engine " , "ejs"); // iski help se hum seedha seedha ejs file bhej skte hai apne route mai.
                                 //ejs file ki jop bhi css , js , image hogi wo publiuc wle folder mai hogi,jo hum link kr chuke hai ejs mai.



app.get('/profile/:username' ,function(req,res)
{
    fs.readdir(`./files`,function(err , files) {
        res.render("index.ejs" , {files:files} )
    }); // isme jaise hi run karoge res index.ejs file search krega
                               //  views mai agr milta hai toh fetch krdena data warna givs errors

    // res.send("gandu");
})


app.get('/files/:filename' ,function(req,res)
{
   fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,filedata)
   {
        res.render("show.ejs" , {filename:req.params.filename , filedata:filedata});    
   })
})






app.get('/edit/:filename' ,function(req,res)
{
    res.render("edit.ejs" ,{filename:req.params.filename} );    
})


app.post('/edit' ,function(req,res)
{ 
    fs.rename(`./files/${req.body.prev}` , `./files/${req.body.new}`,function(err)
    {
      res.redirect(`/profile/${req.body.username}`)
    })
    
       
})


app.post('/create' ,function(req,res)
{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details,function(err){
        res.redirect('/profile/:username')
    })
    
})

app.listen(3000,function()
{
    console.log("it's running");
    
    
});


