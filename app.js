const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const path = require('path');
const mongoose = require("mongoose");

const Post = require("./database/db");

const homeStartingContent = "Blog writing is a dynamic and influential form of online expression that allows individuals, businesses, and professionals to share their insights, experiences, and expertise on a wide range of topics. Through the medium of a blog, writers can engage with a global audience, fostering discussions, educating readers, and building a sense of community. Effective blog writing involves a blend of informative content, captivating storytelling, and clear communication. Well-structured articles with attention-grabbing headlines draw readers in, while a thoughtful mix of text, images, and possibly multimedia enhances the overall reading experience. Blogs cater to diverse interests, from technology and lifestyle to health and travel, making them a versatile platform for conveying information and perspectives. As an ever-evolving medium, blog writing encourages creativity, research, and continuous improvement, driving writers to refine their craft while forming meaningful connections with their readers.";
const aboutContent = "Hello , myself Gaurav Singh, a passionate B.Tech student majoring in Computer Science, embodies the spirit of a true coding enthusiast. With a keen mind and a strong determination, I delves into the intricate world of programming, consistently demonstrating my affinity for the digital realm. Proficient in languages like Java, JavaScript, and the MERN (MongoDB, Express.js, React, Node.js) stack, I showcases a diverse skill set that spans both front-end and back-end development. My love for coding goes beyond mere syntax, as I thrives on the challenges presented by complex algorithms and logical problem-solving. My commitment to continuous learning is evident through mine active engagement with the evolving tech landscape, staying updated with the latest trends and tools. As I forges my path in the world of computer science.";


const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",(req,res)=>{

  Post.find({})
  .then((posts)=>{
    res.render("home",{
        someContent:homeStartingContent,
         posts:posts
       });
  })
  .catch((err)=>{
    console.log("error in getting data from db" +err)
  })  
})
app.get('/about',(req,res)=>{
  res.render('about',{aboutContent:aboutContent })

})
app.get('/compose',(req,res)=>{
  res.render('compose')
})
app.post('/compose',(req,res)=>{
  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  })
  post.save();
  res.redirect("/");
  
  
})
app.get('/posts/:postId',(req,res)=>{
   const requestId = req.params.postId;

   Post.findOne({_id:requestId})
   .then((post)=>{
    res.render('post',{
             title:post.title,
             content:post.content});
          
   })
   .catch((err)=>{
    console.log(err);
   })
})

mongoose.connect("mongodb+srv://thakurshahab1809:aL1kZWeHMI7ZDDz6@cluster0.0zlmvbe.mongodb.net/blog?retryWrites=true&w=majority")
.then(()=>{
  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
})
.catch(err=>{console.log("error in connecting"+err);})



