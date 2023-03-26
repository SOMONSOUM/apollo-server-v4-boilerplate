# Specify the base image
FROM node:16-alpine

# Arguments
ARG PORT
ARG DATABASE_URL
ARG ALGO
ARG SECRET_KEY
ARG S1
ARG AUTHORIZATION
ARG NODE_ENV
ARG CLOUDINARY_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

# Set environment variables
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV ALGO=${ALGO}
ENV SECRET_KEY=${SECRET_KEY}
ENV S1=${S1}
ENV AUTHORIZATION=${AUTHORIZATION}
ENV NODE_ENV=${NODE_ENV}
ENV CLOUDINARY_NAME=${CLOUDINARY_NAME}
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}

# Create a working directory
WORKDIR /usr/src/app

# Copy package and lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port
EXPOSE ${PORT}

# Start the server
CMD ["yarn", "start"]