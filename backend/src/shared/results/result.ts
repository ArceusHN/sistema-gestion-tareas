export class Result<T> {
    public isSuccess: boolean;
    public error?: string;
    private _value?: T;
  
    private constructor(isSuccess: boolean, error?: string, value?: T) {
      this.isSuccess = isSuccess;
      this.error = error;
      this._value = value;
  
      Object.freeze(this);
    }
  
    public getValue(): T | null {
      return this.isSuccess && this._value !== undefined ? this._value : null;
    }
  
    public static ok<U>(value?: U): Result<U> {
      return new Result<U>(true, undefined, value);
    }
  
    public static fail<U>(error: string): Result<U> {
      return new Result<U>(false, error);
    }
  }
      