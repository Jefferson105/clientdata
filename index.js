const express = require("express");
const next = require("next");
const https = require("https");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    const server = express();

    server.get("/getdata", (req, res) => {
        https.get("https://storage.googleapis.com/dito-questions/events.json", (resp) => {
            let data = "";

            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {
                res.json(JSON.parse(data));
            });
        })
    });

    server.get("*", (req, res) => handle(req, res));

    const port = 3001;

    server.listen(process.env.PORT || port, (err) => {
        if(err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});

module.exports = app;