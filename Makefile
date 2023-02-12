#TODO: Local development
run_install:
	npm install

run_clean:
	npm run clean

run_prettier:
	npm run prettier

run_auth_local:
	npm run start:auth[local]

run_api_local:
	npm run start:api[local]

run_admin_local:
	npm run start:admin[local]

run_auth_dev:
	npm run start:auth[dev]

run_api_dev:
	npm run start:api[dev]


#TODO: Testing Bash scripts
run_get_scripts:
	bash scripts/get.sh

run_post_scripts:
	bash scripts/post.sh

run_put_scripts:
	bash scripts/put.sh

#TODO: Testing using python scripts
run_test:
	npm run test:inspect


#TODO: Using Compose v1 (docker-compose)
##* Run DB seperately
compose_db_up_v1:
	docker-compose -f docker-compose.db.yml up -d --build
	
compose_db_down_v1:
	docker-compose -f docker-compose.db.yml down

##* Run PortfolioCMS in dev environment
compose_dev_up_v1:
	docker-compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v1:
	docker-compose -f docker-compose.dev.yml down

##* Run PortfolioCMS in stg environment
compose_stg_up_v1:
	docker-compose -f docker-compose.stg.yml up -d --build

compose_stg_down_v1:
	docker-compose -f docker-compose.stg.yml down

##* Run PortfolioCMS in prod environment
compose_prod_up_v1:
	docker-compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v1:
	docker-compose -f docker-compose.prod.yml down


#TODO: Using Compose v2 (docker compose)
##* Run DB seperately
compose_db_up_v2:
	docker compose -f docker-compose.db.yml up -d --build
	
compose_db_down_v2:
	docker compose -f docker-compose.db.yml down

##* Run PortfolioCMS in dev environment
compose_dev_up_v2:
	docker compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v2:
	docker compose -f docker-compose.dev.yml down

##* Run PortfolioCMS in stg environment
compose_stg_up_v2:
	docker compose -f docker-compose.stg.yml up -d --build

compose_stg_down_v2:
	docker compose -f docker-compose.stg.yml down

##* Run PortfolioCMS in prod environment
compose_prod_up_v2:
	docker compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v2:
	docker compose -f docker-compose.prod.yml down


#TODO: Build and push images to docker hub
build_and_push_dev:
	bash ./build_scripts/build-dev.sh

build_and_push_stg:
	bash ./build_scripts/build-stg.sh

build_and_push_prod:
	bash ./build_scripts/build-prod.sh