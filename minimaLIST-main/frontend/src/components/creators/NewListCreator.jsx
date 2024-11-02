import { React, useState } from "react";
import {
  createStyles,
  rem,
  Paper,
  ActionIcon,
  Text,
  Flex,
  TextInput,
  Button,
  Container,
  Kbd,
} from "@mantine/core";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import { IconPlus, IconX, IconMoodSmile } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import secureLocalStorage from "react-secure-storage";
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
export default function NewListCreator({ onChange }) {
  const userId = JSON.parse(secureLocalStorage.getItem("user"));
  const { classes, cx } = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [formEmoji, setFormEmoji] = useState("");
  const [emoji, setEmoji] = useState("");
  const [newList, setNewList] = useState({
    title: "",
    emoji: emoji,
    userId: userId,
  });

  const createList = () => {
    axios
      .post("/api/v1/list", { ...newList, emoji: emoji })
      .then((response) => {
        setEmoji("");
        setNewList({ ...newList, title: "" });
        setShowForm(false);
        onChange();
      });
  };
  return (
    <>
      <Paper
        onClick={() => setShowForm(true)}
        display={!showForm ? "" : "none"}
        className={classes.item}
      >
        <ActionIcon>
          <IconPlus stroke={1.5} />
        </ActionIcon>
        <Text m={"sm"} color={"gray"}>
          Click To Add New List
        </Text>
      </Paper>
      <Container display={showForm ? "" : "none"}>
        <Paper className={classes.item}>
          <ActionIcon
            onClick={() => {
              setFormEmoji(false);
              setShowForm(false);
              setEmoji("");
            }}
          >
            <IconX />
          </ActionIcon>
          {emoji ? (
            <Emoji unified={emoji} emojiStyle={EmojiStyle.APPLE} size={40} />
          ) : null}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createList();
            }}
          >
            <Text color={"gray"}>
              Press <Kbd>Enter</Kbd> to create
            </Text>
            <Flex>
              <TextInput
                m={"sm"}
                placeholder="List Title"
                name="title"
                value={newList.title}
                onChange={(e) =>
                  setNewList({ ...newList, title: e.target.value })
                }
              />
              <Button
                onClick={() => setFormEmoji(formEmoji === "new" ? "" : "new")}
                m={"sm"}
                pr={0}
                variant={"outline"}
                color={"gray"}
                leftIcon={<IconMoodSmile m={0} />}
              />
            </Flex>
          </form>
        </Paper>
        <Paper display={formEmoji === "new" ? "" : "none"}>
          <EmojiPicker
            onEmojiClick={(emojiData, event) => {
              setEmoji(emojiData.unified);
            }}
          />
        </Paper>
      </Container>
    </>
  );
}
