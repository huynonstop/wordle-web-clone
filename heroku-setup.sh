heroku login

heroku create wordle-be-api
https://git.heroku.com/wordle-be-api.git
git remote add wordle-be-api https://git.heroku.com/wordle-be-api.git

heroku buildpacks:add -a wordle-be-api  heroku/nodejs
heroku buildpacks:add -a wordle-be-api  https://github.com/lstoll/heroku-buildpack-monorepo -i 1
heroku config:set -a wordle-be-api APP_BASE=packages/wordle-be