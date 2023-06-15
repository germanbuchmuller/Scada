FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "/app/"]
COPY ./ /app
RUN cd /app && rm -rf node_modules/ && npm install
EXPOSE ${PORT}
CMD ["node", "index.js"]