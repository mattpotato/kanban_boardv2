import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { LoginInput, useLoginMutation } from "../generated/graphql";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const [login, { data: loginData }] = useLoginMutation();
  const history = useHistory();

  const onSubmit = (data: LoginInput) => {
    login({
      variables: {
        options: data,
      },
    });
  };

  useEffect(() => {
    if (loginData?.login.user) {
      history.push("/dashboard");
    }
  }, [loginData, history]);

  return (
    <div>
      <ColorModeSwitcher />
      <Box>hello {loginData?.login.user?.email}</Box>

      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        width="sm"
        justifyContent="center"
      >
        <FormControl id="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            ref={register}
            name="email"
            type="email"
            placeholder="Enter your email"
          />
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
          Login
        </Button>

        <Text>Or Continue with: </Text>
      </Flex>
    </div>
  );
};

export default Login;
