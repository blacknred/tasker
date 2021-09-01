prod-build: ##
	docker-compose -f docker-compose.yml build --no-cache $(c)

test-check: ##
	docker-compose -f docker-compose.yml config $(c)

prod: ##
	docker-compose -f docker-compose.yml up $(c)

test: ##
	docker-compose -f docker-compose.test.yml up $(c)

test-check: ##
	docker-compose -f docker-compose.test.yml config $(c)

test-stop: ##
	docker-compose -f docker-compose.test.yml stop $(c)