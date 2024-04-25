# FROM node:18-alpine
# # Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /opt/
# COPY package.json package-lock.json ./

# # 设置CI环境变量
# ENV CI=true

# RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

# WORKDIR /opt/app
# COPY . .
# ENV PATH /opt/node_modules/.bin:$PATH
# RUN chown -R node:node /opt/app
# USER node
# RUN ["npm", "run", "build"]
# EXPOSE 1337
# CMD ["npm", "run", "develop"]











# # 使用Node官方镜像
# FROM node:18-alpine

# # 安装构建依赖项
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# # 工作目录设为 /app
# WORKDIR /app

# # 将package.json和package-lock.json复制到容器中
# COPY package*.json ./

# # 设置CI环境变量
# ENV CI=true

# # 安装项目依赖
# RUN npm install

# # 复制剩余的项目文件到容器中
# COPY . .

# # 设置环境变量
# ENV NODE_ENV=production

# # 暴露Strapi默认的1337端口
# EXPOSE 1337

# # 构建Strapi admin面板（非交互式）
# RUN npm run build --debug

# # 启动Strapi应用
# CMD ["npm", "start"]




# # 基础镜像
# FROM --platform=linux/arm64 node:18-alpine

# # # 安装构建依赖项
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# RUN npm install pnpm -g
# # 设置工作目录
# WORKDIR /

# # 只复制依赖描述文件
# # COPY package.json package-lock.json ./
# COPY package.json pnpm-lock.yaml ./

# # 安装依赖
# RUN pnpm install --frozen-lockfile


# # 复制其他所有文件
# COPY . .

# WORKDIR /apps/backend-strapi4
# RUN pnpm install

# # 暴露服务端口
# EXPOSE 1337


# 使用Node官方镜像作为基础镜像
FROM node:18-alpine

# 创建应用目录
WORKDIR /usr/src/app

# 安装必要的系统软件包
# RUN apk add --no-cache python3 make g++ curl
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev


# 复制依赖文件，并安装依赖
COPY package*.json ./
# RUN npm install pnpm -g


# # 在安装项目依赖之前，安装编译依赖，然后再安装项目依赖
# RUN apk add --no-cache python3 py3-pip make g++ curl \
#     # 安装全局 Nx CLI，以避免与项目本地版本的潜在兼容性问题
#     && npm install -g nx \
#     # 增加 Node.js 堆内存限制到 2048MB
#     && NODE_OPTIONS="--max-old-space-size=2048" npm install --no-optional

# RUN npm install -g nx \ npm install
RUN npm install -g nx \
    && npm ci



# RUN npm install -g nx \
#     # 增加 Node.js 堆内存限制到 2048MB
#     && NODE_OPTIONS="--max-old-space-size=2048" npm install --no-optional



# 将nx工作区中的所有文件复制到镜像中（注意 .dockerignore ）
COPY . .


# 运行nx serve命令启动服务
CMD ["nx", "serve", "backend-strapi4"]
