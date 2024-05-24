FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install @monaco-editor/react

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
