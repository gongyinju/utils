import s3 from "./../../src/s3";
import {expect} from "chai";
import Mock from 'mockjs'
const Random = Mock.Random;
Mock.mock('https://www.test.com/api/usermanage/testbean',function (op) {
    console.log(op)
    return Mock.mock({
        "data": Array(3).fill(1).map(() => {
            return {
                name:Random.cname()
            }
        })
    })
});
Mock.mock(`https://www.test2.com/api/s3/testbean`,function (op) {
    console.log(op)
    return Mock.mock({
        "data|1-5": [{
            name:Random.cname()
        }]
    })
});

// var getSubmitURL = () =>'https://www.test2.com/api/';


var getSubmitURL = function(){
    return 'https://www.test2.com/api/';
}
describe("ajax", () => {
    it('setURL请求应该返回一个对象status为200', function(done){
        s3.setURL('https://www.test.com/api/');
        const promise = s3.ajax('testbean',{name:'a'},'usermanage');
        promise.then(function(res){
            expect(res.status).to.be.eql(200);
            done();
        })
        .catch(function(err){
            console.log(err);
        });
    });

    /*it('getSubmitURL请求应该返回一个对象status为200', function(done){
        const promise = s3.ajax('testbean',{age:14},'s3','get',30000);
        promise.then(function(res){
            expect(res.status).to.be.eql(200);
            done();
        })
        .catch(function(err){
            console.log(err);
        });
    });*/
    it('getSubmitURL请求应该返回一个对象status为200', function(done){
        const promise = s3.ajax('testbean',{age:14},'s3');
        promise.then(function(res){
            expect(res.status).to.be.eql(200);
            done();
        })
        .catch(function(err){
            console.log(err);
        });
    });


})
