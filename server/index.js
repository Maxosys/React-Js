process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


const app 	= require('./app');
var https 	= require('https');
var fs 		= require('fs');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

/*var options = {
  key: fs.readFileSync('./sslconf/file.pem'),
  cert: fs.readFileSync('./sslconf/file.crt')
};
var serverPort = 9000;
var server = https.createServer(options, app);

server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
});*/
