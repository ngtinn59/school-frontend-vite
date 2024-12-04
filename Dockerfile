# Sử dụng image Node.js chính thức làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt tất cả các dependency
RUN npm install

# Copy toàn bộ mã nguồn của bạn vào container
COPY . .

# Expose cổng mà Vite sẽ sử dụng
EXPOSE 5174

# Chạy ứng dụng trong chế độ phát triển khi container khởi động
CMD ["npm", "run", "dev"]
