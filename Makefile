run: build
	docker run --rm -it self-medal
build:
	docker build -t self-medal .
test:
	./entrypoint.sh
