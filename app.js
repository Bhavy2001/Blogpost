//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash=require("lodash");

const homeStartingContent = "Hello Blogger, this is a blogging app where u can write blogs on whichever topic u want.I wish u will love writing your blog here. Good luck ,have a great experience and HAPPY BLOGGING :)";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts=[];
var blog;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render("home",{subtext:homeStartingContent,posts:posts});
});
app.get("/about",function(req,res){
  res.render("about",{subtext2:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{subtext3:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.get("/posts/:post",function(req,res){

  for(var i=0;i<posts.length;i++)
  {
    var address= lodash.kebabCase(posts[i].title);
    var inbar=lodash.kebabCase(req.params.post);
    if(address === inbar)
    {
      res.render("post",{title:posts[i].title,para:posts[i].post});
    }
  }
});
app.post("/compose",function(req,res){
  var input={
    title: req.body.titlesubmit,
    post: req.body.postbody
  };
  posts.push(input);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
