import {ValidationComposite} from "../../../validations/validation-composite";
import {Validation} from "../../../interfaces/protocols/validation";
import {RequiredFieldValidation} from "../../../validations/required-field-validation";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
