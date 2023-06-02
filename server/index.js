import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import postsRoute from "./routes/posts.js"

require('dotenv').config();
const CONNECTION_URL = process.env.CONNECTION_URL;


/* 
EXPRESS
is a node framwork allowing routing to be made easier
CORS
is a package in node which allows our frontend to interact with the backend
basically the frontend will be on a different server than the backend which will not work
if we want them to work together so we are using cors to enable cross origin ressource sharing
possible.
So two appilcations that share a different origin can interact with each other thanks
to Cors
BODYPARSER
If we want to haondle POST requests from USERS we want to have a bodyparser
it extracts the entire body of the request
so we can use request.body easily to get the information for our backend
MONGOOSE
enables use to interact with a mongodb database more easily
we can define models and interact with those models in our backend code
*/








const app = express()
app.use(cors())
//limit makes sure that the entires dont go over 30mb and extended makes it so that
//all the entries from the reqrest arent just string. They can be numbers or boleans aswell
//with urleconded we can get bodies from urls
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())


const PORT = process.env.PORT || 5000

app.use("/posts", postsRoute )



mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT,() => console.log(`Server running on PORT:${PORT}`)))
.catch(error => {console.log(error.message)})
 


