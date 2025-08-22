export class ErrorResponse extends Error {
  statusCode: number;
  payload: { error?: string; errors?: string[] };

  constructor(message: string | string[], statusCode = 400) {
    // Call super with first message or combined string for legacy purposes
    super(Array.isArray(message) ? message[0] : message);
    this.statusCode = statusCode;

    // Prepare payload based on number of errors
    if (Array.isArray(message)) {
      if (message.length === 1) {
        this.payload = { error: message[0] };
      } else {
        this.payload = { errors: message };
      }
    } else {
      this.payload = { error: message };
    }

    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }
}
