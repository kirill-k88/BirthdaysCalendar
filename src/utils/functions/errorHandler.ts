import { HTTP_REQUEST_ERROR_MESSAGE_LIST } from '../constants';

export function errorHandler(result: Response) {
  const status = result.status.toString();
  if (status in HTTP_REQUEST_ERROR_MESSAGE_LIST) {
    return `Ошибка при запросе ${status}: ${HTTP_REQUEST_ERROR_MESSAGE_LIST[status].message}`;
  }

  return `Ошибка при запросе: ${status}`;
}
