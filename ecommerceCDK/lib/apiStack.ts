import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';


export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create dynamoDB table
    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: { 
        name: 'PK', 
        type: dynamodb.AttributeType.STRING 
      },
      sortKey: { 
        name: 'SK', 
        type: dynamodb.AttributeType.STRING 
      }
    });

    // Create secondary index
    const gsi1: dynamodb.GlobalSecondaryIndexProps = {
      indexName: 'GSI1',
      partitionKey: { 
        name: 'GSI1-PK', 
        type: dynamodb.AttributeType.STRING 
      },
      sortKey: { 
        name: 'GSI1-SK', 
        type: dynamodb.AttributeType.STRING 
      },
      readCapacity: 5,
      writeCapacity: 5,
    };

    // Add secondary index to the table
    table.addGlobalSecondaryIndex(gsi1);


    // defines an AWS Lambda resourse to get products
    const getAllProductsLambda = new lambda.Function(this, 'getProducstHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'getAllProducts.handler',   
      environment: {
        TABLE_NAME_PRODUCTS: table.tableName,
      }             
    });

    // defines an AWS Lambda resourse to get products of the user cart
    const getUserCartProductsLambda = new lambda.Function(this, 'getUserCartProducstHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'getAllCartProducts.handler',   
      environment: {
        TABLE_NAME_PRODUCTS: table.tableName,
      }             
    });

    // defines an AWS Lambda resourse to put products in the cart
    const putProductsLambda = new lambda.Function(this, 'putProductHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'putProduct.handler',   
      environment: {
        TABLE_NAME_PRODUCTS: table.tableName,
      }             
    });

    // API gateway

    // root
    const api = new apigateway.RestApi(this, 'APIGateway');

    // cart
    const cartProductsResource = api.root.addResource('cart');

    // Conect API gateway with the lambda
    api.root.addMethod('GET', new apigateway.LambdaIntegration(getAllProductsLambda));
    cartProductsResource.addMethod('GET', new apigateway.LambdaIntegration(getUserCartProductsLambda));
    cartProductsResource.addMethod('POST', new apigateway.LambdaIntegration(putProductsLambda));

    // enable CORS for API Gateway REST API
    // allow CORS for all origins
    api.root.addCorsPreflight({
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
        allowCredentials: true,
    })
    
    cartProductsResource.addCorsPreflight({
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
        allowCredentials: true,
    })
  
    // grant the lambda role read/write permissions to our table
    table.grantFullAccess(getAllProductsLambda);
    table.grantFullAccess(getUserCartProductsLambda);
    table.grantFullAccess(putProductsLambda);
    
  }
}   