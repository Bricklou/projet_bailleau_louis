import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),

    first_name: vine.string().trim(),
    last_name: vine.string().trim(),

    password: vine.string().minLength(6).alphaNumeric().confirmed(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    last_name: vine.string().trim(),
    first_name: vine.string().trim(),
    address: vine.string(),
    postal_code: vine.number({ strict: true }).range([0, 999999]),
    city: vine.string(),
    phone_number: vine.string().mobile(),
    email: vine.string().email().trim(),
    civility: vine.enum(['male', 'female']),

    login: vine.string().minLength(4).alphaNumeric().trim(),
    password: vine.string().minLength(6).alphaNumeric().confirmed(),
  })
)
