FROM node:21
WORKDIR /server-app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT = 3500
EXPOSE 3500
CMD ["npm", "run", "dev"]
