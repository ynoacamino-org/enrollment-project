rm -rf ./gen

#go mod tidy # escanea tu projecto y actualiza tu go.mod
goa gen github.com/enrollment/design/api
sqlc generate

if [ "$?" -ne "0" ]
then
    echo "Code generation completed successfully."
fi
