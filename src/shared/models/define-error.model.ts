class DefineError {
  private message: string;
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { DefineError };
