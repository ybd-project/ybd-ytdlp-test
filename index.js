const express = require('express');
const app = express();
const fluentYTDlp = require('node-fluent-ytdlp');
const ytdlp =  new fluentYTDlp('https://youtu.be/vCthmJ9tvkM', true);
const ytdlpProcess = ytdlp.noConfig().dumpSingleJson().run(),
    start = process.hrtime();

app.get('/api/v3/test', (req, res) => {
    ytdlpProcess.stdout.setEncoding('utf-8');
    ytdlpProcess.stdout.on('data', (stdout) => {
        console.log(stdout);
    });

    ytdlpProcess.on('close', () => {
        const hrend = process.hrtime(start),
            results = 'Execution time (hr): ' + hrend[0] + ' ' + hrend[1] / 1000000;

        console.log(results);
        res.send(results);
    });
});

app.listen(3000);
