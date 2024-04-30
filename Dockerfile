# 基础镜像
FROM node:18-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖项
# RUN npm install -g pnpm \
#   && pnpm install

RUN npm install

# 暴露服务端口
EXPOSE 4200

# 运行应用
CMD [ "npx", "nx", "serve", "frontend-nextjs"]
