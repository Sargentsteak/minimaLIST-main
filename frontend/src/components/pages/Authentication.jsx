import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  createStyles,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { FooterPlain } from "../partials/FooterPlain";
import { HeaderMenu } from "../partials/HeaderMenu";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(500),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1569171181682-2c689e08141d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV)",
  },
}));
export function Authentication(props) {
  const user = JSON.parse(secureLocalStorage.getItem("user"));
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (values, event) => {
    if (type === "login") {
      console.log({
        username: values.email,
        password: values.password,
      });
      axios
        .post(
          "/api/auth/login",
          {
            username: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          secureLocalStorage.setItem("user", JSON.stringify(res.data.id));
          navigate("/todolist");
        });
    } else {
      axios
        .post("/api/auth/register", values, {
          withCredentials: true,
        })
        .then((res) => {
          axios
            .post(
              "/api/auth/login",
              {
                username: values.email,
                password: values.password,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              secureLocalStorage.setItem("user", JSON.stringify(res.data.id));
              navigate("/todolist");
            });
        });
    }
  };

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <HeaderMenu theme={theme} setOpened={setOpened} />
      <Container h={640} mt={200}>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Welcome to Minimalist
          </Text>

          {/* <Group grow mb="md" mt="md">
            <Button radius="xl">Google</Button>
            <Button radius="xl">Twitter</Button>
          </Group> */}

          <Divider
            // label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form
            onSubmit={form.onSubmit((values, event) => {
              handleSubmit(values, event);
            })}
          >
            <Stack>
              {type === "register" && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.username}
                  onChange={(event) =>
                    form.setFieldValue("username", event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />

              {type === "register" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
      <FooterPlain />
    </div>
  );
}
