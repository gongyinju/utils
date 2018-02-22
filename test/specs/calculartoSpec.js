import {expect} from "chai";
describe("calcular", () => {

  it("0.1 加 0.2 等于 0.3", () => {
    expect(Number(0.1).add(0.2)).to.be.equal(0.3);
  });

  it("2.1 减 1.2 等于 0.9", () => {
      expect(Number(2.1).sub(1.2)).to.be.equal(0.9);
  });

  it("0.1 乘 0.1 等于 0.01", () => {
      expect(Number(0.1).mul(0.1)).to.be.equal(0.01);
  });

  it("2 除 3 等于 0.67", () => {
      expect(Number(2).divide(3)).to.be.equal(0.67);
  });

  it("数字金额化", () => {
      expect(Number(222242342).money()).to.be.equal('222,242,342');
      expect(Number(22242.342).money()).to.be.equal('22,242.342');
  });

  it("数字转化为金额单位展示", () => {
      expect(Number(222242342).numFormat()).to.be.equal('2.22亿元');
      expect(Number(22).numFormat()).to.be.equal('22元');
      expect(Number(22222).numFormat()).to.be.equal('2.22万元');
      expect(Number(222422).numFormat()).to.be.equal('22.24万元');
  });

  it("金额类型转换", () => {
      expect(Number(123).moneyFormat({bitLength:2,roundOff:1,unit:0})).to.be.equal('123.00');
  });

});
