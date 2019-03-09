import app from "./server";
import listener from "./config/listener";

app.listen(app.get('port'), listener);