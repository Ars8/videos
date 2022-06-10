import {Request, Response} from "express";
import cors from 'cors';
import bodyParser from "body-parser";

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!')
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const result = videos.find(p => p.id === id)
    res.send(result)
})
app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const videosNewArr = videos.filter(item => {
        return item.id != id
    })
    console.log(videosNewArr)
    res.send(videosNewArr)
})
app.put('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    let videoUpdate = videos.find(item => item.id === id)
    if (videoUpdate) {
        videoUpdate.title = req.body.title
        res.send(videos)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})