var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to CodinGyaan",
});
const item2=new Item({
    name:"Like ,Share and Subscribe",
});
const item3=new Item({
    name:"Enjoy learning",
});
const d=[item1,item2,item3];
/*
Item.insertMany(d,function(err)
{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved items to DB");
    }
});
*/
app.get("/",function(req,res)
{
   // res.send("<h1>Hey guys!!</h1>");
   Item.find({},function(err,f)
   {
      // console.log(f);
      if(f.length===0)
      {
        Item.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved items to DB");
            }
        });
      res.redirect("/");
      }
      else{
      res.render("list",{newListItems:f});
      }
   })
  ;
})
app.post("/",function(req,res)
{
     const itemName=req.body.n;
    //console.log(i);
    //i1.push(i);
    //res.render("list",{newListItem:i});
   // res.redirect("/");
   const item=new Item({
       name:itemName
   });
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});

app.listen(3000,function()
{
    console.log("Server is listening to port 3000");
})

