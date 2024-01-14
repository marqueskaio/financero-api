import {BcryptAdapter} from "./bcrypt-adapter";
import bcrypt from "bcrypt";
const salt = 12

jest.mock('bcrypt', () => ({
    hash: () => '',
    compare: () => true
}))

type SutTypes = {
    sut: BcryptAdapter
}
const makeSut = (): SutTypes => {
    const sut = new BcryptAdapter(salt)
    return {
        sut
    }
}

describe('BcryptAdapter', () => {
    test('ensure BcryptAdapter call bcrypt.hash with correct value', async () => {
        const {sut} = makeSut()
        const spy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(spy).toHaveBeenCalledWith('any_value', 12)
    })
    test('ensure BcryptAdapter call bcrypt.compare with correct value', async () => {
        const {sut} = makeSut()
        const spy = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_value', 'value_to_compare')
        expect(spy).toHaveBeenCalledWith('any_value', 'value_to_compare')
    })
})