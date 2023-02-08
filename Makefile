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


#TODO: Docker development
#? Using Docker CE

##* Run DB seperately
compose_db_up:
	docker-compose -f docker-compose.db.yml up -d --build
	
compose_db_down:
	docker-compose -f docker-compose.db.yml down

##* Run PortfolioCMS in dev environment
compose_dev_up:
	docker-compose -f docker-compose.dev.yml up -d --build

compose_dev_down:
	docker-compose -f docker-compose.dev.yml down

##* Run PortfolioCMS in stg environment
compose_stg_up:
	docker-compose -f docker-compose.stg.yml up -d --build

compose_stg_down:
	docker-compose -f docker-compose.stg.yml down

##* Run PortfolioCMS in prod environment
compose_prod_up:
	docker-compose -f docker-compose.prod.yml up -d --build

compose_prod_down:
	docker-compose -f docker-compose.prod.yml down


#? If using docker compose

##* Run DB seperately
compose_db_up_fix:
	docker compose -f docker-compose.db.yml up -d --build
	
compose_db_down_fix:
	docker compose -f docker-compose.db.yml down

##* Run PortfolioCMS in dev environment
compose_dev_up_fix:
	docker compose -f docker-compose.dev.yml up -d --build

compose_dev_down_fix:
	docker compose -f docker-compose.dev.yml down

##* Run PortfolioCMS in stg environment
compose_stg_up_fix:
	docker compose -f docker-compose.stg.yml up -d --build

compose_stg_down_fix:
	docker compose -f docker-compose.stg.yml down

##* Run PortfolioCMS in prod environment
compose_prod_up_fix:
	docker compose -f docker-compose.prod.yml up -d --build

compose_prod_down_fix:
	docker compose -f docker-compose.prod.yml down