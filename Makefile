run: build
	docker run --rm -it print-env
build:
	docker build -t print-env .
test:
	./entrypoint.sh
