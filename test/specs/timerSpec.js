import s3 from "./../../src/s3";
import {expect} from "chai";

// Mocha默认每个测试用例最多执行2000毫秒,需要用-t或--timeout参数，改变默认的超时设置。例：$ mocha -t 5000 timerSpec.js,
describe("timer", () => {
  it('定时执行一次', done => {
      var x = true;
      var f = function() {
          x = false;
          expect(x).to.be.not.ok;
          done();
      };
      s3.timeout(f, 200);
  });

  it('定时循环', done => {
      var x = true;
      var f = function() {
          x = false;
          expect(x).to.be.not.ok;
          done();
      };
      s3.interval(f,200,1000,2000);
  });

})
