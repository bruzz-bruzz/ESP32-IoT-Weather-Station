import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {createClient} from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL as string,process.env.SUPABASE_KEY as string)
async function getNews(){
    try{
        const {data,error} = await supabase.from("sensor").select("*")
        if(error !== null){
            return []
        }
        return data
    }catch(e){
        return []
    }
}
export default async function handler(req:express.Request,res:express.Response){
    const authHeader = req.headers['authorization']
    if(authHeader !== `Bearer ${process.env.CRON_SECRET}`){
        return res.status(401).json({msg:"Unauthorized"})
    }
    const newData = await getNews()
    try {
        const {data,error} = await supabase.from("sensorarchive").upsert(newData,{
            onConflict:"id"
        })
        if(error !== null){
            return res.status(500).json({msg:"Error updating data"})
        }
        return res.status(200).json({msg:"Data updated successfully"})
    }catch(e){
        return res.status(500).json({msg:"An error occured."})
    }
}