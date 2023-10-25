import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

export interface TypedResponse<T> extends Express.Response {
    json: Send<T, this>;
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}