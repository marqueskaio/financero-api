import { RequiredFieldValidation } from './required-field-validation'
import {MissingParamError} from "../helpers/errors/missing-param-error";

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}
describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
