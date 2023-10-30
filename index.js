const express = require('express'),
    app = express(),
    FluentYtdlp = require('node-fluent-ytdlp');

app.get('/', (req, res) => {
    const start = process.hrtime(),
        ytdlp = new FluentYtdlp(req.query.url || 'https://youtu.be/5RmEzmhWeeA', true),
        ytdlpProcess = ytdlp.dumpSingleJson().noConfig().run();

    let json = '';

    ytdlpProcess.stdout.setEncoding('utf-8');
    ytdlpProcess.stdout.on('data', (stdout) => {
        json += stdout;
    });

    ytdlpProcess.stderr.setEncoding('utf-8');
    ytdlpProcess.stderr.on('data', (stderr) => {
        console.error(stderr);
    });

    ytdlpProcess.on('close', (code) => {
        const end = process.hrtime(start);

        res.json({
            ok: true,
            message: '処理が終了しました。',
            exitStatus: code,
            processTime: end[0] + end[1] / 1000000000 + '秒',
            returnedData: JSON.parse(json)
        });
    });
});

app.listen(3000, () => {
    console.log('OK');
});
