# Dirty dockerfile build, i.e. uses code from local system instead of pulling from github to build
#
# To build and run the image from this Dockerfile, where x is the name of the worker node's JS file name
# docker build -t sop-api -f ./.Dockerfile .
# docker run -d --rm -p 3000:3000 --name sop-api sop-api
# Alternativly, use docker compose in root to run this service
#
# Why the server needs to be built first before the image is built:
#   - For performance and image size reasons, the code is built locally first before being sent to the daemon for building the image.
#   - Building can be done on the image but since it will be on top of the image running on the daemon it adds additional performance overhead.
#
# Why is RUN used and why they are split up:
#   - Use RUN instruction to install packages required by executing commands on top of the current image to create a new layer by committing the results.
#   - The RUN commands are all split them up as different ephemeral intermmediate images to optimize the build process for caching

FROM node:16-alpine

# Set workdir to /api so that the 'entrypoint' command works as that requires current path to be in /api
WORKDIR /api

# Copy both package.json and package-lock.json in for installing dependencies with "npm ci"
COPY ./package*.json ./

# Install Node JS dependencies right after dependency file copied in, so that any changes in
# the source code in the next docker layer (COPY ./dist ./) does not invalidate this layer.
RUN npm install

# Copy dist (build output) only
COPY ./dist ./

# Define exposed ports, acting only as documentation. You STILL need to map the ports with -p option with docker run
EXPOSE 3000

# ENTRYPOINT Command ensures this command runs when the container is spun up, and cannot be overwritten with shell arguements like CMD
# Using exec form instead of shell form
ENTRYPOINT ["npm", "run", "start:docker"]
