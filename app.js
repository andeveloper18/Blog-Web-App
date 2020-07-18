var express  =require('express'),
    app     = express(),
expressSanitizer=require("express-sanitizer"),
    overrideMethod=require('method-override'),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose');

    //connect database to mongo namong the db to "blog_app"
mongoose.connect("mongodb://localhost:27017/blog_app",{ useNewUrlParser: true });

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(overrideMethod("_method"));

app.use(expressSanitizer());        //only reuirement is only after body-parser
//MONGOOOSE CONFIRGRATION
//creating the blog app schema
var blogSchema=new mongoose.Schema(
    {
        title:String,
        image:String,
        body:String,
        created : {type:Date,default:Date.now}

    }
);

//creating model for our Blog-App
var Blog=mongoose.model("blog",blogSchema);

// Blog.create({
//     title :"Doremon",
//     image :"data:image/jpeg;base64,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",
//     body  :"Hello Dora!"
// });

//** Abut to add routes and nd index.ejs inside views folder*/

//ROUTES

app.get("/",function(req,res){
    res.redirect("/blogs");        //redirecting the "/" to "/blogs" 

});

app.get("/blogs",function(req,res){
   Blog.find({},function(err,blogs){
       if(err){ console.log(err)}
       else{
        res.render("index",{blogs:blogs});        //index.ejs 
       }
   })

});
//NEW -RESTful routes
app.get("/blogs/new",function(req,res){
    res.render("new");
});
//CREATE-RESTful route
app.post("/blogs/new",function(req,res){
req.body.blog.body=req.sanitize(req.body.blog.body);
//create blog
Blog.create(req.body.blog,function(err,newBlog){
    if(err){console.log(err);}
    else{
        //doing something with data vars
        //to rrirect to blog page
        res.redirect("/blogs");
    }
})
});

//SHOW -RESTful routes
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{

            res.render("show",{blogDetail :foundBlog});
        }
    });

});

//EDIT-RESTful routes
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,oldBlog){
        if(err){console.log(err); res.redirect("/blogs");}
        else{
            res.render("edit",{oldBlog:oldBlog});
        }
    })

});
//UPDATE-RESTful route 
app.put("/blogs/:id",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
            if(err){console.log(err); res.redirect("/blogs");}
            else{
                res.redirect("/blogs/"+req.params.id);
            }
    })
});
//DELETE-RESTFul route

app.delete("/blogs/:id",function(req,res){
    //delete some blog
    //ten redirect somewhere
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){console.log(err); res.redirect("/blogs");}
        else{
            res.redirect("/blogs");
        }

    });});


//Blog-App is listening to requests with call back function
app.listen(3000,process.env.IP,function(){
    console.log("Blog server Started !");
});