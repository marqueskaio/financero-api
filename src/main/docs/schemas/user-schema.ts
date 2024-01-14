export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    accessToken: {
      type: 'string'
    }
  }
}
