# 도커를 쓰는 이유
- 어떠한 프로그램을 다운 받는 과정을 간단하게 하기 위해 사용

# 도커란?
- 컨테이너를 사용하여 응용 프로그램을 더 쉽게 만들고 배포하고
실행환경을 컨테이너로 추상화 하고 동일한 인터페이스 제공
- 프로그램의 배포 및 관리를 단순하게 해줌

## 컨테이너
- 코드와 모든 종속성을 패키지화 하여 응용프로그램이 한 컨퓨팅 환경에서 다른 컴퓨팅 환경으로 빠르고 안정적으로 실행 되도록 하는 소프트웨어 표준단위

## 이미지
- 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정과 같은 응용 프로그램을 실행하는데 필요한 모든 것을 포함하는 가볍고 독립적이며 실행 가능한 sw 패키지



# 도커 설치 확인
```
docker -v
docker info


docker login
 
```

# 도커 컨테이너 리스트 확인
```
# 도커 실행
docker run apline ping localhost

# 실행중인 컨테이너 목록 확인
docker ps

# 특정 포맷만
docker ps --format 'table{{.Names}}\table{{.Image}}'

# 모든 컨테이너 나열
docker ps -a

# 로컬 저장소의 이미지 리스트를 확인
docker images
```  

#  컨테이너의 생명주기
```
docker ps
# 컨테이너 생성
docker create hello-world 

# 컨테이너 시작
docker start -a <컨테이너 아이디/이름>
docker ps -a

# 컨테이너 중지
docker stop  <컨테이너 아이디/이름>

# 컨테이너 강제 종료
docker kill  <컨테이너 아이디/이름>

# 컨테이너 삭제하기
docker rm <컨테이너 아이디/이름>

# 모든 컨테이너를 삭제
docker rm `docker ps -a -q`

# 도커 이미지 삭제
docker rmi <이미지>
docker images
# 한번에 컨테이너, 이미지, 네트워크 모두 삭제
docker system prune
- 도커를 쓰지 않을 때 모두 정리하고 싶을 때 사용해주면 좋음
- 하지만 이것도 실행중인 컨테이너에는 영향을 주지 않음

# 도커 네트워크 리스트 보기
docker network ls
```

# 실행중인 컨테이너에 명령어 전달
```
docker exec -it <컨테이너 아이디>
```

# 레디스를 이용한 컨테이너 이해
```
# 레디스 서버 실행
docker run redis

# 레디스 클라이언트 서버 실행중인 컨테이너 안으로 명령어를 전달해야 함
docker exec -it 26a4b08b7d1c redis-cli
127.0.0.1:6379> set key1 hello
OK
127.0.0.1:6379> get key1
"hello"
```

# 도커 파일
1. 도커 파일을 만들 폴더 하나 만들기
2. 방금 생성한 도커 파일 폴더를 에디터를 이용해서 실행
3. 파일 하나를 생성, 이름은 dockerfile
4. 그 안에 먼저 어떻게 진행해 나갈지 기본적인 토대를 명시
5. 베이스 이미지부터 실제 값으로 추가
6. 베이스 이미지 사이즈가 작은 alpine으로 테스트
7. hello 문자를 출력해주기 위해 echo를 사용
8. 마지막으로 컨테이너 시작 시 실행될 명령어 echo hello를 적어줌


도커 파일에 입력된 것들이 도커 클라이언트에 전달되어 도커 서버가 인식하게 하여야함
```
docker build ./

# 도커 이름 주기
docker build -t smshack1001/hello:latest ./

docker build -t smshack/node-app:ver_3 ./

docker login && 
docker push smshack/node-app:ver_3 
```
https://hub.docker.com/_/node
https://leveloper.tistory.com/9

# 도커 volumes
```
docker inspect -f "{{ .NetworkSettings.IPAddress }}" 7c9f635845fb
docker run -d -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app smshack/node-app:ver_2
```
# dockerfile node
```
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

```

# 도커 컴포즈란 

```
멀테 컨테이너 사용시 쉽게 네트워크 통신을 사용할 수 있도록 사용
version: "3"
services:
  redis-server:
    image: "redis"
  node-app: 
    build: "./"
    ports:
      - "5000:8080"

```
```
docker-compose -d up --build
docker-compose down
```

# 도커를 이용한 리액트 앱 실행
```
npx create-react-app client
yarn start 

docker build -f Dockerfile.dev -t smshack/react-app ./
docker run -p 5000:3000 smshack/react-app

docker build -f Dockerfile.dev -t smshack/react-app ./

# 도커 컨테이너를 실행하는데 3000번으로 띄운 앱을 5000번으로 매핑하고
# 볼륨 사용시 node_modules는 제외하고
# 현재 디렉터리에 src/app을 볼륨으로 묶어서
## 실시간으로 코드가 수정되는지 확인해본다
docker run -p 5000:3000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app smshack/react-app

```

# 도커 컴포즈 파일로 좀더 간단하게 실행해 보기
```
version: 도커 컴포즈의 버전
services: 이곳에 ㅅ실행하려는 컨테이너들을 정의
  react: 컨테이너 이름
    build: 현 디렉토리에 있는 Dockerfile 사용
      context: 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
      dockerfile: 도커 파일이 어떤 것인지 지정
    ports: 포트 매핑 로컬포트 : 컨테이너 포트
    volumes: 로컬 머신에 있는 파일들 매핑
    stdin_open: 리액트 앱을 끌때 필요(버그 수정)

version: "3"  # 도커 컴포즈 버전
services:     # 이 곳에 실행하려는 컨테이너들을 정의
    react:    # 컨테이너 이름
        build:         
            context: .
            dockerfile: Dockerfile.dev
        ports: 
            - "3000:3000"
        volumes: 
            - /usr/src/app/node_modules
            - ./:/usr/src/app
        environment:
            # 소스 수정 즉시 반영되는
            # 핫로딩 활성화하는 부분
            - CHOKIDAR_USEPOLLING=true          
        stdin_open: true

docker-compose up
```

