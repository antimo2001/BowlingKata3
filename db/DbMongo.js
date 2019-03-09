//// Define real mongodb or mongoose here
//// mock mongodb or mongoose here?
import { log } from "../../tools/log";

export class DbMongo {
  constructor() {
    this.db = null;
  }
  connect(...all) {
    log.info(all, `DbMongo.connect`);
  }
}