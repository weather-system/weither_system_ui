FROM node:20.17-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --mode prod

FROM nginx:alpine AS serve
ADD ./conf/ /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
