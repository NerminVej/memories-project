import { response } from "express"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
    
}



export const createPost = async (req,res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).end()
    }
    catch(error){
        res.status(400).json({ message: error.message})
    }

}

export const deletePost = async (req,res) =>{
    const id = req.params.id
    try {
    const result = await PostMessage.findByIdAndDelete(id)
    res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = async (req,res) =>{
    try {
    const id = req.params.id
    const update = req.body
    const result = await PostMessage.findByIdAndUpdate(id,update)
    res.send(result)
    } catch (error) {
    console.log(error.message)
    }
}