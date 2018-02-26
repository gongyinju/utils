import s3 from "./../../src/s3";
import {expect} from "chai";
describe("iStorage", () => {
    it("sessionStorage", () => {
        s3.setItem('name','session');
        expect(s3.getItem('name')).to.be.equal('"session"');
    });

    it("localStorage", () => {
        s3.setItemLocal('type','local');
        expect(s3.getItemLocal('type')).to.be.equal("local");
    });
})