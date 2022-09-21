FROM node:lts-alpine
RUN npm install -g stepci
ENTRYPOINT ["stepci", "run"]
