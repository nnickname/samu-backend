import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // Tu lógica aquí
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error'
      })
    };
  }
};
