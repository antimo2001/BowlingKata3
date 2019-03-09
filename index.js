import config from "./config";
import listener from "./config/listener";
import server from "./server";

server.listen(config.port, listener);