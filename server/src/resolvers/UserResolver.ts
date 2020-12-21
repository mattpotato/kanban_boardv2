import { User } from "../entities/User";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Email does not exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(password);
    let user;

    try {
      user = await User.create({
        email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email already exists",
            },
          ],
        };
      }
    }

    return { user };
  }
}
