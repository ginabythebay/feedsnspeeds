
.PHONY: start build deploy test

build:
	yarn build

test: build
	yarn test

start:
	yarn start

deploy: test
	yarn deploy

node_modules: package.json yarn.lock
	yarn install
