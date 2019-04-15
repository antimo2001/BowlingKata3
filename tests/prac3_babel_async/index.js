import 'babel-polyfill';

// npm install --save @babel/polyfill

// If you use babel and your code has async/await keywords, then you may
// need to `import babel-polyfill`
// See online babel's issue tracker for [details](https://github.com/babel/babel/issues/5085)
// ReferenceError: regeneratorRuntime is not defined

async function doPromiseStuff() {
    await 'foo'
}

;(async function main() {
    let f = await doPromiseStuff();
    console.log(f);
})()