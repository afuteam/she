FROM node:18-alpine
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./ ./
# ENV PATH /opt/node_modules/.bin:$PATH

RUN npm install -g pnpm \
  && npm config get registry \
  && npm install \
  && npx nx run backend-strapi4:install

COPY ./devDB/data.db ./apps/backend-strapi4/.tmp/data.db
COPY ./devDB/uploads/ ./apps/backend-strapi4/public/uploads/

EXPOSE 1337

CMD ["nx", "serve", "backend-strapi4"]
