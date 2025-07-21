import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose'; // Import the Mongoose Error type
import ValidationError = Error;

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp(), // Get the RPC context
      response = ctx.getResponse(); // Get the response object

    // Handle the validation error
    return response.status(400).json({
      // Return a 400 Bad Request status
      statusCode: 400, // HTTP status code
      createdBy: 'ValidationErrorFilter', // Indicate the filter that created this response
      errors: exception, // Include the validation errors
    });
  }
}
