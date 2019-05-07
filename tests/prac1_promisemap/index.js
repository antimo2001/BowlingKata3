// import Promise from "bluebird";

class Practice1 {
  /**
   * Delay some async operation (useful for simulating slow async functions)
   * @param delay amount of time in milliseconds to delay; defaults to 3000
   */
  static stall(delay = 3000) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Delay some async operation and invoke a rejected Promise. Uses the given
   * value as the rejected-value.
   * @param errorFlag flag to force rejected value; defaults to true
   * @param delay amount of time in milliseconds to delay; defaults to 3000
   */
  static stallAndReject(value, errorFlag = true, delay = 3000) {
    return new Promise((resolve, reject) => {
      if (errorFlag) {
        setTimeout(() => reject(value), delay)
      } else {
        setTimeout(resolve, delay);
      }
    })
  }

  static doBlockchain() {
    return Practice1.stall(3999)
      .then(() => 'done doBlockchainOperation');
  }

  static doOffchain() {
    return Practice1.stall(99)
      .then(() => 'done doOffchain');
  }

  static main() {
    const log = (r) => {
      console.log(r);
      return r;
    }
    const chain = [
      Practice1.doBlockchain().then(log),
      Practice1.doOffchain().then(log),
    ];
    return Promise.all(chain);
  }
}

{
  if (!process.env.DISABLETESTPRACTICE) {
    console.log(`Begin Practice1`);
    Practice1.main()
      .then(results => {
        console.log(`done both; destruc results`);
        const [a, b] = results;
        console.log(a);
        console.log(b);
      });
  }
  else {
    console.log(`WARN: TESTPRACTICE is disabled!`);
  }
}

export default Practice1;