/**
 * Merge error object with status and code.
 * @purefunction
 * @param {Error} error Error object to merge
 * @param {number} status http status; defaults to 500
 * @param {string} code errorcode; defaults to empty string
 * @returns Error
 */
export default function sendError(error, status = 500, code = '') {
  return Object.assign(error, { status, code });
}