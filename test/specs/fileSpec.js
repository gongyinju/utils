import s3 from "./../../src/s3";
import {expect} from "chai";
describe("file", () => {
    it('上传图片', function(){
        const node=document.createElement("input");
        document.body.appendChild(node);
        document.getElementsByTagName("INPUT")[0].setAttribute("type","file");


        // s3.file
            // .get('https://api.github.com')
            // .then(function(res){
            //     expect(res).to.be.an('object');
            //     done();
            // })
            // .catch(function(err){
            //     console.log(err);
            // });
    });

})
