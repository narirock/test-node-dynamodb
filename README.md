# DynamoDB Test
## _Run dynamoDB localy with docker_
 
```sh
docker pull amazon/dynamodb-local
docker run -p 8000:8000 amazon/dynamodb-local
```

set credentials to aws:

>aws_access_key_id = AKIAIOSFODNN7EXAMPLE
>aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
>region = eu-west-1`

then install the dependency packages and run project
```sh
npm install
node index.js
```