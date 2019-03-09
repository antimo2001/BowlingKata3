import log from '../tools/log';

export default function mlog(callback) {
  return (req, res, next) => {
    callback(log);
    next();
  }
}