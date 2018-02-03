FROM node:alpine

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

# Build the app
RUN npm build

# Bundle app source
COPY . .

EXPOSE 9000

CMD [ "node", "server" ]