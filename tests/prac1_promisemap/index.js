// import Promise from "bluebird";
// const promiseall = all;

class Practice1 {
  /**
   * Delay some async operation (useful for simulating slow async functions)
   * @param delay amount of time in milliseconds to delay; defaults to 3000
   */
  static stall(delay = 3000) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  static doBlockchain() {
    return Practice1.stall(100)
      .then(() => 'done doBlockchainOperation');
  }

  static doOffchain() {
    return Practice1.stall(200)
      .then(() => 'done doOffchain');
  }

  static main() {
    const chain = [
      Practice1.doBlockchain(),
      Practice1.doOffchain()
    ];
    return Promise.all(chain);
  }
}

{
  if (!process.env.DISABLETESTLOCALSEED) {
    Practice1.main()
      .then(console.log);
  }
  else {
    console.log(`WARN: TESTLOCALSEED is disabled!`);
  }
}

export default Practice1;