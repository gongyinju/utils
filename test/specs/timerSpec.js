import s3 from "./../../src/s3";
import {expect} from "chai";
describe("timer", () => {
  it('定时执行一次', done => {
      var x = true;
      var f = function() {
          x = false;
          expect(x).to.be.not.ok;
          done(); // 通知Mocha测试结束
      };
      s3.timeout(f, 200);
  });

  it('定时循环', done => {
      var x = true;
      var f = function() {
          x = false;
          expect(x).to.be.not.ok;
          done(); // 通知Mocha测试结束
      };
      s3.interval(f,200,1000,2000);
  });

})
