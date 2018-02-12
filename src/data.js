import Mock from 'mockjs'

const baseUrl = 'https://www.test.com/api/';
const Random = Mock.Random;

export default function () {
  //files
  Mock.mock(`${baseUrl}upload`,{
    'data':{}
  });
}
