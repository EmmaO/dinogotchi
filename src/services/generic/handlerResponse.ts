import {StatusCodes} from 'http-status-codes';
import ErrorResponse from './errorResponse';

export interface HandlerResponse<TResponse> extends BasicHandlerResponse {
    successResponse : TResponse;
}

export interface BasicHandlerResponse {
    errors : ErrorResponse[];
    statusCode : StatusCodes
}
