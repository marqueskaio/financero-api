import {Validation} from "../../interfaces/protocols/validation";

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (): Error | null {
      return null
    }
  }
  return new ValidationStub()
}