import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import LandingLayout from "../components/LandingLayout";
import { LoginInput, useRegisterMutation } from "../generated/graphql";

const Register = () => {
  const { handleSubmit, register, errors, setError } = useForm();
  const [signup] = useRegisterMutation();
  const history = useHistory();

  const onSubmit = (data: LoginInput) => {
    signup({
      variables: {
        email: data.email,
        password: data.password,
      },
      update: (_cache, result) => {
        if (result.data?.register.user) {
          history.push("/dashboard");
        }
        if (result.data?.register.errors) {
          result.data.register.errors.forEach((error) => {
            setError(error.field, { message: error.message });
          });
        }
      },
    });
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <LandingLayout>
      <Flex width="100%" justifyContent="center">
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          width="sm"
          justifyContent="center"
        >
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              ref={register}
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              ref={register}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>
          <Button variant="solid" colorScheme="green" type="submit">
            Register
          </Button>

          <Text>
            Already have an account?{" "}
            <ChakraLink as={Link} to="/login">
              Login
            </ChakraLink>
          </Text>
        </Flex>
      </Flex>
    </LandingLayout>
  );
};

export default Register;
