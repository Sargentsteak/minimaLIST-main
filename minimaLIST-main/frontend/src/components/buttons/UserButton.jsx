import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconHandStop, IconLogout2 } from "@tabler/icons-react";
import axiosInstance from "../../axiosConfig";
import secureLocalStorage from "react-secure-storage";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function UserButton({ name, email, icon, ...others }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
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

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group
        onClick={() => {
          navigate("/user");
        }}
      >
        <Avatar radius="xl" color={"teal"}>
          {name[0]}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
        <Tooltip label="Log-out">
          <ActionIcon
            variant={"subtle"}
            onClick={() => {
              logout();
            }}
          >
            <IconLogout2 size="2rem" stroke={0.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </UnstyledButton>
  );
}
