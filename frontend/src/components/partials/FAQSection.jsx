import {
  createStyles,
  Title,
  Container,
  Accordion,
  ThemeIcon,
  MantineProvider,
  getStylesRef,
  rem,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    minHeight: rem(820),
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][6]
    } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    position: "relative",
    color: theme.black,
  },

  title: {
    color: theme.white,
    fontSize: 52,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    backgroundColor: theme.white,
    borderBottom: 0,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    overflow: "hidden",
  },

  control: {
    fontSize: theme.fontSizes.lg,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    color: theme.black,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  content: {
    paddingLeft: theme.spacing.xl,
    lineHeight: 1.6,
    color: theme.black,
  },

  icon: {
    ref: getStylesRef("icon"),
    marginLeft: theme.spacing.md,
  },

  gradient: {
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][6]
    } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
  },

  itemOpened: {
    [`& .${getStylesRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  button: {
    display: "block",
    marginTop: theme.spacing.md,

    [theme.fn.smallerThan("sm")]: {
      display: "block",
      width: "100%",
    },
  },
}));

export function FAQSection() {
  const { classes } = useStyles();
  return (
    <MantineProvider inherit theme={{ colorScheme: "light" }}>
      <div className={classes.wrapper}>
        <Container size="sm">
          <Title align="center" className={classes.title}>
            How To Use Minimalist
          </Title>

          <Accordion
            chevronPosition="right"
            defaultValue="create a list"
            chevronSize={50}
            variant="separated"
            disableChevronRotation
            chevron={
              <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                <IconPlus size="1.05rem" stroke={1.5} />
              </ThemeIcon>
            }
          >
            <Accordion.Item className={classes.item} value="create a list">
              <Accordion.Control>How To Create A List?</Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/Workflow__CPO9lsELSR-EOkpshYvkNA"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item
              className={classes.item}
              value="edit or delete list"
            >
              <Accordion.Control>
                How To Edit or Delete a list?
              </Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/How_to_Update_or_Delete_a_Todo_List__mpFyDBCTTXC640E_C6jvvA"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="create todo">
              <Accordion.Control>How to Add a new To-Do?</Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/Creating_a_Rich_Text_To-Do_In_a_List__6kuMslcwR0C7IVi0M48gDA"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item
              className={classes.item}
              value="edit or delete a todo"
            >
              <Accordion.Control>
                How to Edit an existing To-Do?
              </Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/How_to_Mark_As_Done_or_Update_or_Delete_To-do_List_Items__BKt7pBajRNGf9U8spSgAgg"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="use searchbar">
              <Accordion.Control>How To Use SearchBar?</Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/How_to_Search_for_a_List_using_Search_Bar__J2ie6aGATGKlMquehFyspg"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="edit account">
              <Accordion.Control>
                How to Edit Account Details and Password
              </Accordion.Control>
              <Accordion.Panel>
                <iframe
                  src="https://scribehow.com/embed/Guide_Changing_User_Details__iZOHfwYwSFWNhPczhGW74g"
                  width="100%"
                  height="640"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </MantineProvider>
  );
}
