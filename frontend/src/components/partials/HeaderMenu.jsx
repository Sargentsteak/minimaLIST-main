import {
  createStyles,
  Header,
  Burger,
  rem,
  MediaQuery,
  Title,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ThemeToggler from "../themes/ThemeToggler";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function HeaderMenu({ theme, setOpened }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Flex>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Title
            p={5}
            onClick={() => {
              navigate("/");
            }}
            variant="gradient"
            gradient={{ from: "teal", to: "green" }}
          >
            Minimalist
          </Title>
        </div>
        <ThemeToggler />
      </Flex>
    </Header>
  );
}
