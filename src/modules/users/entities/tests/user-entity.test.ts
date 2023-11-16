import { describe, test, expect } from 'vitest'
import { User } from '../user.entity'

describe("User Entity", () => {
    test("Should be able to create a new user", async () => {
        const user = await User.create({
            name: 'user-name',
            password:'password-test',
            userName:'username'
        })

        expect(user).toBeInstanceOf(User)
        expect(user).toHaveProperty('id')
        expect(user.password).not.equal('password-test')
    })
})