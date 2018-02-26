import s3 from "./../../src/s3";
import {expect} from "chai";
describe("sort", () => {
    it('首字母排序', function(){
        let data=[
                {"name": "赵"},
                {"name": "钱"},
                {"name": "孙"},
                {"name": "李"}
            ],
            data2 = [
                {sorts: "L", details: [{name: "李", sorts: "L"}]},
                {sorts: "Q", details: [{name: "钱", sorts: "Q"}]},
                {sorts: "S", details: [{name: "孙", sorts: "S"}]},
                {sorts: "Z", details: [{name: "赵", sorts: "Z"}]}
            ];
        expect(s3.ABCSort(data)).to.eql(data2);
    });

    it('分类别排序', function(){
        let data=[
                {"name": "赵","sex": "女"},
                {"name": "钱","sex": "男"},
                {"name": "孙","sex": "女"},
                {"name": "李","sex": "男"}
            ],
            data2 = [
                {sorts: "女", details: [{name: "赵", sex: "女"},{name: "孙", sex: "女"}]},
                {sorts: "男", details: [{name: "钱", sex: "男"},{name: "李", sex: "男"}]}
            ];
        expect(s3.groupSort(data,'sex')).to.eql(data2);
    });

})
