/**
 * Practicing how to use node v12's experimental-modules flag. 
 */
import { f1, default as aaa } from '../prac4_importexport/aaa.js'

let f = f1()
console.log(`Hello, ${aaa.first} ${aaa.last}`)
console.log(`f1 returns: ${f}`)