import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
  Kbd,
  ScrollArea,
  Autocomplete,
  Avatar,
  Skeleton,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
} from "@tabler/icons-react";
import { UserButton } from "../buttons/UserButton";
import { DndListHandle } from "../DragNDrops/DndListHandle";
import { useEffect, useRef, useState } from "react";
import axios from "../../axiosConfig";
import NewListCreator from "../creators/NewListCreator";
import { useFocusTrap, useHotkeys } from "@mantine/hooks";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  lists: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function NavbarSearch({ opened, setList, selectedlist }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [lists, setLists] = useState(undefined);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(undefined);
  const focusSearch = useRef(null);

  useHotkeys([["ctrl+K", () => focusSearch.current.focus()]]);

  const getUser = () => {
    axios
      .get("/api/v1/user")
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((err) => {
        secureLocalStorage.clear();
        navigate();
      });
  };

  const getLists = () => {
    const userId = JSON.parse(secureLocalStorage.getItem("user"));
    setLists(undefined);
    axios
      .get(`/api/v1/list/${userId}`, { withCredentials: true })
      .then((response) => {
        if (response.data.length) {
          setLists(response.data);
          setData(response.data.map((item) => ({ value: item.title })));
        }
      });
  };

  const searchHandler = (value) => {
    if (lists) {
      setList(lists.find((lst) => lst.title === value));
    }
  };

  useEffect(() => {
    getUser();
    getLists();
  }, []);

  return (
    <Navbar
      className={classes.navbar}
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 350, lg: 450 }}
    >
      <Autocomplete
        ref={focusSearch}
        placeholder="Search"
        data={data}
        onChange={searchHandler}
        size="xs"
        icon={<IconSearch size="0.8rem" stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Kbd className={classes.searchCode}>Ctrl + K</Kbd>}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Lists
        </Text>
      </Group>
      <Navbar.Section className={classes.section} grow component={ScrollArea}>
        {lists ? (
          <>
            <NewListCreator onChange={getLists} />

            <DndListHandle
              data={lists}
              onChange={() => {
                getLists();
              }}
              setList={setList}
              currList={selectedlist}
            />
          </>
        ) : (
          <NewListCreator onChange={getLists} />
        )}
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        {user ? (
          <UserButton
            name={user.username}
            email={user.email}
            icon={<IconSelector size="0.9rem" stroke={1.5} />}
          />
        ) : null}
      </Navbar.Section>
    </Navbar>
  );
}
