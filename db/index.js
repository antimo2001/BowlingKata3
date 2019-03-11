import config from "../config";
import {DbMongo} from "./DbMongo";
export {MockDbMongo} from "../tests/mocks/MockDbMongo";
let m;

if (config.mongo.mock) {
    m = MockDbMongo;
} else {
    m = DbMongo;
}

export default m;