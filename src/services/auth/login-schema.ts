import z from "zod"

const invalid_type_error = 'Invalid type provided for this field'
const required_error = 'This field cannot be blank'
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const LoginSchema = z.object({
  username: z.string({ invalid_type_error, required_error }).min(3, 'Value is too short'),
  password: z.string({ invalid_type_error, required_error }).regex(passwordRegEx),
})

export type ILoginFormInput = z.infer<typeof LoginSchema>;