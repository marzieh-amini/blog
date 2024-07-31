import { api } from "../api";


export const getPosts = ()=>api.get("/posts")
export const getPostById = (id:Number)=>api.get(`/posts/${id}`)
export const createNewPost =(data:any)=> api.post("/posts",data)