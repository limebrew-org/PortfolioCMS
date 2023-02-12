#!bin/bash

IMAGE_NAME="limebrewofficial/portfolio-cms"
ARCH="linux/arm64/v8,linux/amd64"
ENV="DEV"
DOCKERFILE="dockerfiles/Dockerfile.dev"

#? Load env file to get the current version
source .env
echo "Loaded environment variables"
echo "Building image for environment: ${ENV} and version: ${PORTFOLIO_VERSION}"

#? Build and push using docker buildkit
docker buildx build --push --platform ${ARCH} --tag ${IMAGE_NAME}:${PORTFOLIO_VERSION}-${ENV} -f ${DOCKERFILE} .
echo "Image built and pushed successfully as ${IMAGE_NAME}:${PORTFOLIO_VERSION}-${ENV}"