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
import { LoginInput, useLoginMutation } from "../generated/graphql";

const Login = () => {
  const { handleSubmit, register, errors, setError } = useForm();
  const [login] = useLoginMutation();
  const history = useHistory();

  const onSubmit = (data: LoginInput) => {
    login({
      variables: {
        options: data,
      },
      update: (_cache, result) => {
        if (result.data?.login.user) {
          history.push("/dashboard");
        }
        if (result.data?.login.errors) {
          result.data.login.errors.forEach((error) => {
            setError(error.field, { message: error.message });
          });
        }
      },
    });
  };

  useEffect(() => {
    document.title = "Login";
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
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              ref={register}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button variant="solid" colorScheme="green" type="submit">
            Login
          </Button>

          <Text>
            {" "}
            Don't have an account?{" "}
            <ChakraLink as={Link} to="/register">
              Register
            </ChakraLink>
          </Text>
        </Flex>
      </Flex>
    </LandingLayout>
  );
};

export default Login;
