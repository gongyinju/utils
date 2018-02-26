import s3 from "./../../src/s3";
import {expect} from "chai";
import Mock from 'mockjs'

const baseUrl = 'https://www.test.com/api/';
const Random = Mock.Random;
export default function () {
    //find_music => music
    Mock.mock(`${baseUrl}testbean`,{
        "data": Array(3).fill(1).map(() => {
            return {
                name:Random.cname()
            }
        })
    });
}

const getSubmitURL = () =>{
    return 'https://api.github.com'
}
describe("ajax", () => {
  it('异步请求应该返回一个对象', function(done){
      // 'https://api.github.com'
      // bean,param,appid,method
      s3.setURL('https://www.test.com/api/');
      const promise = s3.ajax('testbean',{},'usermanage');
      console.log(promise)
      promise.then(function(res){
          console.log(promise)
          console.log(res)
          expect(res).to.be.an('object');
          done();
      })
      .catch(function(err){
          console.log(err);
      });
  });

})
