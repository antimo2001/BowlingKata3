
/**
 * Transform results to send universally formatted response.
 * @purefunction
 * @param {*} results results to attach to response
 * @param {boolean} success flag notify successful response; true by default
 * @returns Object<{success, results}>
 */
export default function sendOk(results, success = true) {
  return Object.assign({ success, results });
}
