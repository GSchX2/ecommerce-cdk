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


    // defines an AWS Lambda resourse
    const getAllProductsLambda = new lambda.Function(this, 'getProductHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'getAllProducts.handler',   
      environment: {
        TABLE_NAME_PRODUCTS: table.tableName,
      }             
    });

    // API gateway
    const api = new apigateway.RestApi(this, 'APIGateway');
    // Conect API gateway with the lambda
    api.root.addMethod('ANY', new apigateway.LambdaIntegration(getAllProductsLambda));
    // enable CORS for API Gateway REST API
    // allow CORS for all origins
    api.root.addCorsPreflight({
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
        allowCredentials: true,
    })
  

    // productsResource.addMethod('GET', new apigateway.LambdaIntegration(getAllProductsLambda));

    // grant the lambda role read/write permissions to our table
    table.grantFullAccess(getAllProductsLambda);
    
  }
}   