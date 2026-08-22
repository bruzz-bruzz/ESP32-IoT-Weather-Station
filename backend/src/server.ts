import express,{Request,Response} from 'express'
import {rateLimit} from 'express-rate-limit'
import {createClient} from '@supabase/supabase-js'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()
type responseType = {
    data:any,
    ok:boolean
}
const app = express()
const supabase = createClient(process.env.supabaseURL as string,process.env.supabaseKey as string)
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.'
})
app.use(express.json())
app.use(rateLimiter)
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:false
}))
app.use(helmet())
app.get('/getData',async(req:Request,res:Response<responseType>)=>{
    const {data,error} = await supabase.from('sensor').select("*")
    if(error === null){
        return res.json({data:data,ok:true})
    }else {
        return res.json({data:[],ok:false})
    }
})
app.listen(3000,()=>{
    console.log("Listening on port 3000.")
})