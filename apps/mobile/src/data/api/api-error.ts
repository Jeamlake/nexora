export class ApiError extends Error {
  public constructor(
    message: string,
    public readonly status: number | null,
  ) {
    super(message);
    this.name = "ApiError";
  }

  public get isUnauthorized(): boolean {
    return this.status === 401;
  }
}
