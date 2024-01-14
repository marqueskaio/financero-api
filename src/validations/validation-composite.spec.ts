import { ValidationComposite } from './validation-composite'
import {Validation} from "../interfaces/protocols/validation";
import {MissingParamError} from "../helpers/errors/missing-param-error";
import {mockValidation} from "../tests/factories/mock-validation";

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    validationStubs,
    sut
  }
}
describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('Should return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
