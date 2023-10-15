const AWS = require('aws-sdk');

exports.handler = async function(event) {
    const dynamodb = new AWS.DynamoDB();

    const res = await dynamodb.scan({
        TableName: process.env.TABLE_NAME_PRODUCTS,
    }).promise();

    const items = res.Items;

    if (!items) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: "No products"}),
        }
    }

    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify({
            products: items.map(value => AWS.DynamoDB.Converter.unmarshall(value)),
        }),
        isBase64Encoded: false,
        headers: {
        'Content-Type': 'application/json',

        // allow CORS for all origins
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
        'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
        },
    };
};