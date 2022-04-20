class DefineError {
  private statusCode: number;
  private message: string;

  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { DefineError };
