import {
  Avatar,
  Text,
  Button,
  Paper,
  useMantineTheme,
  Container,
  SimpleGrid,
  Title,
  Center,
  Divider,
  Stack,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { HeaderMenu } from "../partials/HeaderMenu";
import { IconAlertTriangleFilled, IconArrowLeft } from "@tabler/icons-react";
import { IconLogout2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { notifications } from "@mantine/notifications";
import { IconHandStop } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { FooterPlain } from "../partials/FooterPlain";
import { modals } from "@mantine/modals";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [detailForm, setDetailForm] = useState({ username: "", email: "" });
  const [isMatch, setIsMatch] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    newPass: "",
    confirmPass: "",
  });
  const theme = useMantineTheme();
  const logout = () => {
    axiosInstance.post("api/auth/logout").then((response) => {
      secureLocalStorage.clear();
      notifications.show({
        title: "Bye Bye!",
        color: "yellow",
        icon: <IconHandStop />,
      });
      navigate("/login");
    });
  };

  const passwordChange = (userId) => {
    if (isMatch) {
      axiosInstance
        .patch(`/api/v1/user/${userId}`, passwordForm, {
          withCredentials: true,
        })
        .then((response) => {
          notifications.show({
            title: "Password Changed Successfully Logging out",
            color: "green",
            icon: <IconCircleCheckFilled />,
          });
          logout();
        });
    }
  };

  const deleteAccount = (userId) => {
    axiosInstance.delete(`/api/v1/user/${userId}`).then((resonse) => {
      logout();
    });
  };
  const getUser = () => {
    setUser(undefined);
    axiosInstance.get("/api/v1/user").then((response) => {
      setUser({ ...response.data });
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setIsMatch(passwordForm.newPass === passwordForm.confirmPass);
  }, [passwordForm]);

  const deleteModal = (userId) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        deleteAccount(userId);
      },
    });
  };

  const handleSubmit = () => {
    if (detailForm.email !== "" && detailForm.username !== "") {
      axiosInstance
        .put(`/api/v1/user/${user.id}`, detailForm)
        .then((response) => {
          getUser();
        });
    }
  };

  return (
    <>
      <HeaderMenu theme={theme} />
      {user !== undefined ? (
        <>
          <Container mt={"xl"}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <Center m={"lg"}>
                <Title>Welcome to your account, {user.username} !</Title>
              </Center>
              <Avatar
                size={120}
                radius={120}
                mx="auto"
                m={"lg"}
                variant={"gradient"}
                gradient={{ from: "teal", to: "cyan" }}
              >
                {user.username[0]}
              </Avatar>
              <Text ta="center" fz="lg" weight={500} mt="md">
                {user.username}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {user.email}
              </Text>
              <SimpleGrid cols={3} spacing="lg">
                <Button
                  variant="light"
                  mt={"md"}
                  onClick={() => {
                    navigate("/todolist");
                  }}
                  leftIcon={<IconArrowLeft />}
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  mt="md"
                  onClick={() => {
                    logout();
                  }}
                  leftIcon={<IconLogout2 />}
                >
                  Logout
                </Button>
                <Button
                  variant={"outline"}
                  mt="md"
                  color={"red"}
                  onClick={() => {
                    deleteModal(user.id);
                  }}
                >
                  Delete Account
                </Button>
              </SimpleGrid>
            </Paper>
          </Container>
          <Divider m={"lg"}></Divider>
          <Container mt={"lg"}>
            <Title>Edit User Details</Title>
            <Text c={"dimmed"}>
              {" "}
              Use this Section to edit your basic details!
            </Text>
            <Paper>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Stack>
                  <TextInput
                    defaultValue={user.username}
                    onChange={(e) => {
                      setDetailForm({
                        ...detailForm,
                        username: e.target.value,
                      });
                    }}
                    withAsterisk
                    label="Name"
                    placeholder="Your name"
                    radius="md"
                  />

                  <TextInput
                    defaultValue={user.email}
                    onChange={(e) => {
                      setDetailForm({ ...detailForm, email: e.target.value });
                    }}
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    radius="md"
                  />
                </Stack>
                <Button
                  onClick={() => handleSubmit()}
                  fullWidth
                  my={"md"}
                  variant={"light"}
                  color={"green"}
                >
                  Save Changes
                </Button>
              </form>
            </Paper>
            <Divider m={"lg"}></Divider>
            <Title>Change Password</Title>
            <Text c={"dimmed"}> Don't Forget it!</Text>
            <Paper>
              <form>
                <Stack>
                  <PasswordInput
                    withAsterisk
                    label="New Password"
                    radius="md"
                    value={passwordForm.newPass}
                    onChange={(e) => {
                      setPasswordForm({
                        ...passwordForm,
                        newPass: e.target.value,
                      });
                    }}
                  />
                  {isMatch ? null : (
                    <Text c={"red"}>Passwords Do not match</Text>
                  )}

                  <PasswordInput
                    value={passwordForm.confirmPass}
                    onChange={(e) => {
                      setPasswordForm({
                        ...passwordForm,
                        confirmPass: e.target.value,
                      });
                    }}
                    withAsterisk
                    required
                    label="Confirm Password"
                    radius="md"
                  />
                  {isMatch ? null : (
                    <Text c={"red"}>Passwords Do not match</Text>
                  )}
                </Stack>
                <Button
                  fullWidth
                  my={"md"}
                  variant={"outline"}
                  color={"blue"}
                  onClick={() => {
                    passwordChange(user.id);
                  }}
                  disabled={
                    !isMatch ||
                    passwordForm.newPass === "" ||
                    passwordForm.confirmPass === ""
                  }
                >
                  Change Password
                </Button>
              </form>
            </Paper>
          </Container>
        </>
      ) : null}
      <FooterPlain />
    </>
  );
}
