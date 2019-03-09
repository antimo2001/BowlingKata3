//// mock mongodb or mongoose here?
import { log } from "../../tools/log";

export class MockDbMongo {
  constructor() {
    this.db = null;
  }
  connect(...all) {
    log.info(all, `DbMongo.connect`);
  }
}