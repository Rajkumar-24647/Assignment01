import {z} from 'zod'


export const SignupSchema = z.object({
    name: z.string()
            .min(3, "name must be atleast of three characters")
            .max(30, "name should not exceed to 30 charcters"),
    
    username: z.string()
            .min(3, "username must be atleast of three characters") 
            .max(30, "username should not exceed to 30 charcters")
            .regex(/^(?=.{3,30}$)(?!.*[_.]{2})[a-zA-Z0-9._]+$/, {
    message: "Username can only contain letters, numbers, dots, or underscores (no consecutive or trailing symbols)"}),
    
    email: z.string()
             .email("Please enter a valid email")
             .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
      message: "Only Gmail addresses are allowed",
    }),

    password: z.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z]).{5,30}$/, {
    message:
      "Password must have at least one uppercase letter, one lowercase letter, and be 5–30 characters long",
  }),
            
})


