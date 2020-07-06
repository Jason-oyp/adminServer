const express = require('express');
const axios = require('axios');
const app = express();
const url = 'http://localhost:3001';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('*', async (req, res) => {
    res.send(await axios.get(url + req.url, {
        headers: {
            authorization: req.headers.authorization
        }
    }).then(data => data.data));
});

app.post('*', async (req, res) => {
    res.send(await axios.post(url + req.url, {
        ...req.body
    }, {
        headers: {
            authorization: req.headers.authorization ? req.headers.authorization:""
        }
    }
    ).then(data => data.data));
});

app.listen(12306, _ => {
    console.log('adminServer is running');
});