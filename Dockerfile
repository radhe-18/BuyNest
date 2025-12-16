FROM node:25-alpine3.22
WORKDIR /app
COPY . .
RUN npm install
ENV NEXT_PUBLIC_API=http://localhost:5000
EXPOSE 3000
CMD ["npm","run","dev"]