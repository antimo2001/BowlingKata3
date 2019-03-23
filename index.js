import app from "./server";
import listener from "./config/listener";
import dbconnect from "./tools/dbconnect";

function listen() {
  if (app.get('env') === 'test') {
    return;
  }
  app.listen(app.get('port'), listener);
}

function connect() {
  dbconnect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
}

connect();