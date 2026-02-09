// API errors are described using Problem JSON specification

export interface ProblemDetails {
  type?: string;
  status?: number;
  title?: string;
  detail?: string;
  instance?: string;
}

export class APIError extends Error {
  public readonly problem: ProblemDetails;

  constructor(problem: ProblemDetails) {
    super(problem.title || 'API Error');

    this.name = 'APIError';
    this.problem = problem;
    this.message = `${this.name}: ${this.problem.title || 'Unknown error'} (${this.problem.status})`;

    // Set the prototype explicitly (for instanceof to work correctly)
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
