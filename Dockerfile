FROM node:18

# Create app directory, inside docker image
WORKDIR /cow/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/main" ]