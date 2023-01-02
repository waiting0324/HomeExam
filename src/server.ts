import express from 'express';

const app = express()

app.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send('請求成功111');
})

app.listen(8080, () => {
    console.log("server start....");
})