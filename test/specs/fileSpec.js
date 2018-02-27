import s3 from "./../../src/s3";
import {expect} from "chai";

//模拟上传地址
import Mock from 'mockjs'
Mock.mock('https://www.test.com/api/upload',{});

describe("file test", () => {
    it('上传图片', function(){
        const node=document.createElement("input");
        document.body.appendChild(node);
        const input  = document.getElementsByTagName("INPUT")[0];
        input.setAttribute("type","file");
        input.onchange = function (e) {
            let fileUpload = e.target.files[0];
            let result = s3.file.checkFile(fileUpload,this.f);
            expect(result.status).to.be.eql('000');
            var a = s3.file.upload(fileUpload,{},'https://www.test.com/api/upload');
            a.then(function(res){
                expect(res.status).to.be.eql(200);
            })
            .catch(function(err){
                console.log(err);
            });
        }
    });

})
