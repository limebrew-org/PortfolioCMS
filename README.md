<div align="center">
  
  [![version](https://img.shields.io/docker/v/limebrewofficial/portfolio-cms?color=red&style=flat)](https://hub.docker.com/repository/docker/limebrewofficial/portfolio-cms/general)
  [![build](https://img.shields.io/github/actions/workflow/status/limebrew-org/PortfolioCMS/build-deploy.yml?branch=main&style=flat)](https://github.com/limebrew-org/PortfolioCMS/actions)
  [![top-language](https://img.shields.io/github/languages/top/limebrew-org/PortfolioCMS?color=blue)]()
  [![nodejs](https://img.shields.io/badge/node.js-16.13.0-brightgreen)](https://nodejs.org/en/)
  [![license](https://img.shields.io/github/license/limebrew-org/PortfolioCMS?color=yellow&style=flat)](https://github.com/limebrew-org/PortfolioCMS/blob/main/LICENSE)
  
</div>

# PortfolioCMS

A Headless CMS built with Express,Typescript and MongoDB

## Architecture:
The infra for PortfolioCMS is built with `Terraform` and `GCP` alongside `Docker` containers for each service
Here is a brief overview of it:

![hld](architecture/portolio_cms_HLD.png)

## Install and Run:
Docker is the most convenient way to build and run `PortfolioCMS`
To install and run using docker, run docker-compose:

> In Development Mode:

    docker-compose -f docker-compose.dev.yml up -d --build


> Using Makefile with `docker-compose v1`:

    make compose_dev_up_v1

> Using Makefile with `docker compose v2`:

    make compose_dev_up_v2


## Environment
PortfolioCMS supports the following environments:

- local

- dev

- prod
