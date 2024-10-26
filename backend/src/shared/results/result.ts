export class Result<T> {
  public ok: boolean;
  public error?: string;
  public statusCode?: number;
  private _value?: T;

  private constructor(ok: boolean, error?: string, value?: T, statusCode?: number) {
    this.ok = ok;
    this.error = error;
    this._value = value;
    this.statusCode = statusCode;

    Object.freeze(this);
  }

  public getValue(): T | null {
    return this.ok && this._value !== undefined ? this._value : null;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string, statusCode: number = 400): Result<U> {
    return new Result<U>(false, error, undefined, statusCode);
  }
}
