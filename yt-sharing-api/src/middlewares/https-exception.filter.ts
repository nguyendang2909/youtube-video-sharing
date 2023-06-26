import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger();
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, json } = await this.prepareException(exception);
    logger.log(`response: ${JSON.stringify({ status, json })}`);

    response.status(status).send(json);
  }

  async prepareException(
    exc: any,
  ): Promise<{ status: number; json: Record<any, any> }> {
    const error =
      exc instanceof HttpException
        ? exc
        : new InternalServerErrorException(exc.message);
    const status = error.getStatus();
    const response = error.getResponse();
    const json = typeof response === 'string' ? { error: response } : response;

    return { status, json };
  }
}
