# FROM node:21

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3009

# CMD ["node", "app.js"]
FROM node:21 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt

COPY . .


# smaller Node.js image
FROM node:21-slim

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3009

CMD ["node", "app.js"]
