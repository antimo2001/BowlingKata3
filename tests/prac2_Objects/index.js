let obj = {
  a: 'a',
  b: 'bb',
  c: 'ccc',
  done: (d) => `returns input: ${d}`,
  ee: (e) => `returns input: ${e}`,
}

let props = Object.getOwnPropertyNames(obj)
let symbols = Object.getOwnPropertySymbols(obj)

console.log(`obj has props: ${props}`)
// console.log(`obj has symbols: ${symbols}`)

console.log(`Loop thru props of obj > filter out non-functions > show values`)

Object.getOwnPropertyNames(obj)
  .filter(pr => (typeof obj[pr] !== 'function'))
  .map((v) => (`${v} ...obj.${v}===${obj[v]}`))
  .forEach(ss => console.log(ss));