FROM node:10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./  ./

CMD ["node","server.js"]


# 이미지 생성 
# docker build -t smshack/node-app:ver_1 ./
# docker images

# 작동 확인 컨테이너 생성
#docker run -it smshack/node-app:ver_1

# 도커 로그인 및 이미지 푸쉬
# 푸쉬 할 경우 <도커 허브 계정명>/<레퍼지터리명>:<버전>
# docker login && docker push smshack/node-app:ver_1
