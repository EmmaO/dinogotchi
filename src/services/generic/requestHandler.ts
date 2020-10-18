import {BasicHandlerResponse, HandlerResponse} from './handlerResponse';

export interface RequestHandler<TRequest, TResponse> {
    handleRequest(request : TRequest): HandlerResponse<TResponse>
}

export interface BasicRequestHandler<TRequest> {
    handleRequest(request : TRequest): BasicHandlerResponse
}
