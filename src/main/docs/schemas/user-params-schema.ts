export const userParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
  },
  required: ['name', 'email', 'password', 'role']
}
