import {Validation} from "../interfaces/protocols/validation";
import {MissingParamError} from "../helpers/errors/missing-param-error";

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
