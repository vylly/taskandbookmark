import z from "zod"

const invalid_type_error = 'Invalid type provided for this field'
const required_error = 'This field cannot be blank'
// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const SignUpSchema = z.object({
  username: z.string({ invalid_type_error, required_error }).min(3, 'Value is too short'),
  email: z
    .string({ invalid_type_error, required_error })
    .email('Please provide a valid email')
    .min(1, 'Value is too short'),
  // password: z.string({ invalid_type_error, required_error }).regex(passwordRegEx),
  password: z.string({ invalid_type_error, required_error }).min(8, 'Value is too short'),
})

export type ISingUpFormInput = z.infer<typeof SignUpSchema>;