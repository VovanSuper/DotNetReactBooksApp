ROOT=$(pwd)
CLIENT_ROOT=$ROOT/ClientApp

echo Starting up Compose - postgres / pgAdmin on Ports `5432` \ `5050`
docker compose up -d

echo Starting the server - api available on Url: `:8085/api/[Controller]` `Books\Auth`, swagger: `:8085/swagger`
dotnet run

echo Starting Client app...
pushd $CLIENT_ROOT
npm i && npm start
popd