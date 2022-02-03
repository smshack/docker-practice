const express = require('express')
const redis = require("redis")
const PORT ='8080';

const client = redis.createClient({
    host:"redis-server", // 레디스 서버의 도메인 or 도커 환경 사용시 hostt 옵션을 docker-compose.yml 파일에 명시한 컨테이너 이름으로 주면됨
    port:6379
})
const app = express();

// 숫자는 0부터 시작
client.set('number',0);

app.get('/',(req,res)=>{
    client.get("number",(err,number)=>{
        //현재 숫자를 가져온 후 1씩 증가 시켜줌
        client.set("number",parseInt(number)+1);
        res.send(`숫자가 1씩 올라갑니다: 숫자 : ${number}`)
    })
})


app.listen(PORT)
console.log('server start')