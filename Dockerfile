FROM node:carbon

COPY ./client.js ./
COPY ./start.js ./
COPY ./index.js ./
COPY ./level-rpc_grpc_pb.js ./
COPY ./level-rpc_pb.js ./
COPY ./package.json ./
COPY ./server.js ./

ENV NODE_ENV production

RUN npm install

CMD ["npm", "start"]
