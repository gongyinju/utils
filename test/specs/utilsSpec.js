import s3 from "./../../src/s3";
import {expect} from "chai";
describe("utils", () => {
    it("isArray", () => {
        const arr = [1,2,3]
        expect(s3.isArray(arr)).to.be.equal(true);
    });

    it("map", () => {
        let a = ['a','b','c'];
        let b = a.map((item,i) => {
            if (item !='b')
                return item+i;
        });
        expect(b).to.eql(['a0',undefined,'c2']);
    });

    it("isPlainObject", () => {
        let a = {'name':'aaa','age':'3'},b = ()=>{};
        expect(s3.isPlainObject(a)).to.be.ok;
        expect(s3.isPlainObject(b)).to.not.be.ok;
    });


    it("underscore_debounce", () => {

    });


    it("underscore_throttle", () => {


    });



})