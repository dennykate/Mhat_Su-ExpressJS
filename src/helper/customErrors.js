// NotFoundError class for 404 errors
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// UnauthorizedError class for 401 errors
export class UnauthenticatedError extends Error {
  constructor(message = "Unauthenticated") {
    super(message);
    this.statusCode = 401;
  }
}

// UnauthorizedError class for 401 errors
export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = 403;
  }
}

// InternalServerError class for 500 errors
export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

// BadRequestError class for 400 errors
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
