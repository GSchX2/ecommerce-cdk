const AWS = require('aws-sdk');

exports.handler = async function(event) {
    const dynamodb = new AWS.DynamoDB();
    
    const item = event.body == 'object' ? event.body : JSON.parse(event.body);
    const product = AWS.DynamoDB.Converter.marshall(item);

    const params = {
        TableName: process.env.TABLE_NAME_PRODUCTS,
        Item: product
    };
        
    try {
        await dynamodb.putItem(params).promise();

        return {
            statusCode: 200,
            body: 'success',
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

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }

    
    
};