const AWS = require('aws-sdk');

exports.handler = async function(event) {
    const dynamodb = new AWS.DynamoDB();
 
    const params = {
        ExpressionAttributeValues: {
            ":pkValue": {
              S: "products"
             },
             ":skValue": {
              S: "products#"
             } 
        },
        KeyConditionExpression: 'PK = :pkValue and begins_with(SK, :skValue)',
        TableName: process.env.TABLE_NAME_PRODUCTS,
    };
        
    const res = await dynamodb.query(params).promise();

    const items = res.Items;

    if (!items) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: "No products"}),
        }
    }

    return {
        statusCode: 200,
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
 
   /*
    const queryResut = async () => {
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME_PRODUCTS,
            KeyConditionExpression: 
                "PK = products",
            // ExpressionAttributeValues: {
            // ":pkValue": "products",
            // ":skValue": "products#",
            // },
            ConsistentRead: true,
        });
      
        const response = await client.send(command);
        console.log(response);
        return response.Items;
      };

      if (!queryResut) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: "No products"}),
        }
    }

      return {
        statusCode: 200,
        body: JSON.stringify({
            products: queryResut(),
            // products: queryResut().map(value => AWS.DynamoDB.Converter.unmarshall(value)),
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
    
*/
    
};