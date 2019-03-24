/**
 * What exactly does shift() and unshift() do to an array?
 */

let arr = [1,2,3,4];

let compareMembers = (a1, a2) => {
  return a1.toString() === a2.toString()
}

let a = arr.shift()

console.log(`a===1? ${a===1}`)
console.log(`and arr==[2,3,4]? ${arr}==[2,3,4]`)
console.log(`and compareMembers(arr, [2,3,4])? ${compareMembers(arr, [2, 3, 4])}`)