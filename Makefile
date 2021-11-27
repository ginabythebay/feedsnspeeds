
.PHONY: start build deploy


build:
	yarn build

start:
	yarn start

deploy: build
	yarn deploy

node_modules: package.json yarn.lock
	yarn install
