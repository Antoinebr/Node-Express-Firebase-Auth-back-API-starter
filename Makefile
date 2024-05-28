build:
	docker build -t antoine/myapp . --force-rm;

run:
	docker run -d -p 3081:8080 -it antoine/myapp

update:
	git pull origin master
	docker-compose stop
	make build
	docker-compose up -d