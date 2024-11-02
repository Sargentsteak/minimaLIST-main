import { React, useState } from "react";
import {
  ActionIcon,
  Paper,
  createStyles,
  rem,
  Text,
  Button,
} from "@mantine/core";
import { IconX, IconPlus, IconGripVertical } from "@tabler/icons-react";
import { RTE } from "../TextEditors/RTE";
import axios from "../../axiosConfig";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    margin: theme.spacing.sm,
  },
}));

export default function NewTodoCreator({ listId, onChange }) {
  const { classes, cx } = useStyles();
  const [newForm, setNewForm] = useState(false);
  const [content, setContent] = useState("");

  const createTodo = (content) => {
    if (content !== "") {
      axios
        .post("/api/v1/todo", {
          content: content,
          isChecked: false,
          listId: listId,
        })
        .then((res) => {
          console.log(res);
          setNewForm(false);
          onChange(listId);
        });
    }
  };

  return (
    <>
      <Paper
        className={classes.item}
        onClick={() => setNewForm(true)}
        display={!newForm ? "" : "none"}
      >
        <div className={classes.dragHandle}>
          <IconGripVertical size="1.05rem" stroke={1.5} />
        </div>
        <ActionIcon variant={"subtle"}>
          <IconPlus />
        </ActionIcon>
        <Text m={"md"} color="gray">
          Click To Add New To-Do.
        </Text>
      </Paper>
      <Paper display={newForm ? "" : "none"}>
        <ActionIcon
          m={"md"}
          onClick={() => setNewForm(false)}
          display={"inline-flex"}
        >
          <IconX />
        </ActionIcon>
        <Paper>
          <RTE content={""} onChange={setContent} />
          <Button m={"sm"} onClick={() => createTodo(content)}>
            Create To-Do
          </Button>
        </Paper>
      </Paper>
    </>
  );
}
