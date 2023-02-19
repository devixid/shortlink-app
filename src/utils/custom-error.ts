export default class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }

  json() {
    return {
      status_code: this.statusCode,
      message: this.message
    };
  }
}
