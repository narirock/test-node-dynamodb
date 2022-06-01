# DynamoDB Test
## _Run dynamoDB localy with docker_
 
```sh
docker pull amazon/dynamodb-local
docker run -p 8000:8000 amazon/dynamodb-local
```

set credentials to aws. you can install aws cli folowing this guide:

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

and can use this credentials:

>AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
>AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
>Default region name [None]:  us-west-2
>Default output format [None]: json

then install the dependency packages and run project
```sh
npm install
node index.js
```


