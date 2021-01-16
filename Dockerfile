# Generate build
FROM node:14-alpine AS build
LABEL maintainer="Ivan Beldad Fernandez"
ENV CI docker
ADD . /app
WORKDIR /app
RUN npm install --silent
RUN npm run build

# Launch prod application
FROM node:14-alpine
LABEL maintainer="Ivan Beldad Fernandez"
ENV NODE_ENV production
EXPOSE 3000
ADD . /app
COPY --from=build /app/dist /app/dist
WORKDIR /app
RUN npm install --silent
CMD [ "node", "dist/main.js" ]
