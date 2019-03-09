import app from "./server";
import listener from "./config/listener";
import config from "./config";

app.listen(config.port, listener);