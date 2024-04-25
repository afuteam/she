FROM node:18-alpine
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./ ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN npm install -g pnpm \
  && pnpm install nx \
  && pnpm install \
  && npx nx run backend-strapi4:install

COPY ./devDB/data.db ./apps/backend-strapi4/.tmp/data.db
COPY ./devDB/uploads/ ./apps/backend-strapi4/public/uploads/

EXPOSE 1337

CMD ["nx", "serve", "backend-strapi4"]



# FROM node:18-alpine
# # Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /opt/
# COPY ./apps/backend-strapi4/package.json ./
# RUN npm install -g node-gyp \
#   && npm install -g pnpm \
#   && pnpm install

# ENV PATH /opt/node_modules/.bin:$PATH

# WORKDIR /opt/app
# COPY ./apps/backend-strapi4 .
# RUN chown -R node:node /opt/app
# USER node
# RUN pnpm build
# EXPOSE 1337
# CMD ["pnpm", "develop"]
