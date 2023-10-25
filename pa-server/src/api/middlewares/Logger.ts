export class Logger {
    loggerMiddleware(request, response, next) {
        //console.log(`${JSON.stringify(request.body)} ${JSON.stringify(response)}`);
        next();
    }
}