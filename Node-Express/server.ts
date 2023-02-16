import express from 'express';
import appLogger from './middlewares/applogger';
import apiRouter from './Router/apiRouter'
import userRouter from "./Router/userRouter"

const app:express.Application = express();

const hostname:string = '127.0.0.1';
const port:number = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (request:express.Request, response:express.Response)=>{
    response.status(200).send(`<h3>Welcome to Express</h3>`)
});

app.use(appLogger)

//router config
app.use('/api', apiRouter )
app.use('/users', userRouter)

app.listen(port, hostname, ()=>{
    console.log(`Express started at http://${hostname}:${port}`)
})