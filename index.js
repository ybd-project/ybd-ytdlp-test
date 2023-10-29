const fluentYTDlp = require('node-fluent-ytdlp');
const ytdlp =  new fluentYTDlp('https://youtu.be/vCthmJ9tvkM', true);

const ytdlpProcess = ytdlp.noConfig().dumpSingleJson().run(),
    start = process.hrtime();

ytdlpProcess.stdout.setEncoding('utf-8');
ytdlpProcess.stdout.on('data', (stdout) => {
    console.log(stdout);
});

ytdlpProcess.on('close', (code) => {
    const hrend = process.hrtime(start);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
});