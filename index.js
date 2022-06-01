const AWS = require('aws-sdk');

const USERS_TABLE = 'Users';

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    AWS_CONFIG_FILE: false
});

//criar tabela 

const dynamodbClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB()

var express = require('express');
var app = express();
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');
//app.engine('ejs', require('ejs').renderFile);
const port = 3000;


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.render('index');
});


app.get("/deletetable", async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
    }
    try {
        let resp = await dynamodb.deleteTable(params).promise();
        console.log(resp);
        res.render('response', { response: 'Tabela Deletada' });
    } catch (e) {
        res.render('response', { response: e.message });
    }
})


app.get("/createtable", async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        KeySchema: [{
            AttributeName: "avaliable",
            KeyType: "HASH"
        }, {
            AttributeName: "email",
            KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
            AttributeName: "avaliable",
            AttributeType: "S"
        }, {
            AttributeName: "email",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }

    try {
        let response = await dynamodb.createTable(params, console.log).promise();
        console.log(response);
        res.render('response', { response: 'Tabela Criada' });
    } catch (e) {
        res.render('response', { response: e.message });
    }
});

app.get('/createuser', async (req, res) => {
    let params = {
        TableName: USERS_TABLE,
        Item: {
            email: 'email' + Math.floor(Math.random() * 2000) + 'BR@teste.com.br',
            avaliable: 'true',
            password: 'teste123',
            createdAt: new Date().getTime(),
            country: "AR",
            hasMp: 'true',
            id: Math.floor(Math.random() * 2000)
        },
    };

    let response = await dynamodbClient.put(params, console.log);
    res.render('response', { response: 'Usuário criado' });
});


app.get('/getusers', async (req, res) => {
    let params = {
        TableName: USERS_TABLE,
        ExpressionAttributeValues: {
            ':hkey': 'true'
        },
    };

    params = {
        ...params,
        FilterExpression: 'country = :country',
        KeyConditionExpression: 'avaliable = :hkey',
        ExpressionAttributeValues: {
            ...params.ExpressionAttributeValues,
            ':country': 'AR',
        }
    };

    let items = await dynamodbClient.query(params).promise();

    res.render('users', { users: JSON.stringify(items.Items) });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})