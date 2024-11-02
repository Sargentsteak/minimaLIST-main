import {
  createStyles,
  rem,
  Skeleton,
  Text,
  TextInput,
  Paper,
  ActionIcon,
  Flex,
  Button,
  Container,
  Kbd,
  Tooltip,
} from "@mantine/core";
import { useListState, useDebouncedValue } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconGripVertical,
  IconTrash,
  IconPlus,
  IconMoodSmile,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Form } from "@mantine/form";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import axios from "../../axiosConfig";
import { hover } from "@testing-library/user-event/dist/hover";

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

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export function DndListHandle({ data, onChange, setList, currList }) {
  data.map((item, index) => {
    if (item.index == null) {
      item.index = index;
    }
    return item;
  });
  data = sort_by_key(data, "index");
  const { classes, cx } = useStyles();
  const [edit, setEdit] = useState("");
  const [state, handlers] = useListState(data);
  const [formEmoji, setFormEmoji] = useState("");
  const [emoji, setEmoji] = useState("");
  const [currEdit, setCurrEdit] = useState();
  const [debounced] = useDebouncedValue(currEdit, 300);

  useEffect(() => {
    if (debounced) {
      listUpdate(debounced.id, debounced, true);
    }
  }, [debounced]);

  const listUpdate = (id, body, refresh) => {
    let data = { ...body };
    if (emoji != "") {
      data = { ...body, emoji: emoji };
    }
    axios
      .put(`http://localhost:8080/api/v1/list/${id}`, data)
      .then((response) => {
        if (refresh) {
          onChange();
          setList(response.data);
        }
        console.log(response);
      });
  };

  const listDelete = (id) => {
    if (id == currList.id) {
      setList(undefined);
    }
    axios.delete(`http://localhost:8080/api/v1/list/${id}`).then((response) => {
      setList(undefined);
      onChange();
    });
  };

  const items = state.map((item, index) => (
    <Draggable index={item.index} draggableId={item.id} key={item.id}>
      {(provided, snapshot) => (
        <>
          <Tooltip
            multiline
            label={`Created By: ${item.createdBy}@${new Date(
              item.createdDate
            ).toLocaleDateString()}\nLast Modified By: ${
              item.modifiedBy
            }@${new Date(item.lastModifiedDate).toLocaleString()}`}
          >
            <div
              className={cx(classes.item, {
                [classes.itemDragging]: snapshot.isDragging,
              })}
              ref={provided.innerRef}
              onClick={() => setList(item)}
              {...provided.draggableProps}
            >
              <div {...provided.dragHandleProps} className={classes.dragHandle}>
                <IconGripVertical size="1.05rem" stroke={1.5} />
              </div>
              <ActionIcon m={"sm"} onDoubleClick={() => setFormEmoji(item.id)}>
                <Emoji
                  unified={item.emoji}
                  emojiStyle={EmojiStyle.APPLE}
                  size={40}
                />
              </ActionIcon>

              <div>
                <Text
                  m={"sm"}
                  display={edit == item.id ? "none" : ""}
                  onDoubleClick={() => {
                    setEdit(item.id);
                  }}
                >
                  {item.title}
                </Text>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.target.value);
                    setEdit("");
                  }}
                >
                  <Flex>
                    <TextInput
                      name={item.id}
                      defaultValue={item.title}
                      display={edit == item.id ? "" : "none"}
                      m={"sm"}
                      variant={"unstyled"}
                      onChange={(e) =>
                        setCurrEdit({
                          id: item.id,
                          emoji: item.emoji,
                          index: item.index,
                          title: e.target.value,
                          userId: item.userId,
                          createdDate: item.createdDate,
                          lastModifiedDate: item.lastModifiedDate,
                        })
                      }
                    />
                    <ActionIcon
                      m={"sm"}
                      color="red"
                      display={edit == item.id ? "" : "none"}
                      onClick={() => {
                        listDelete(item.id);
                      }}
                    >
                      <IconTrash size="1.125rem" />
                    </ActionIcon>
                  </Flex>
                </form>
              </div>
            </div>
          </Tooltip>
          <Paper display={formEmoji == item.id ? "" : "none"}>
            <EmojiPicker
              onEmojiClick={(emojiData, event) => {
                setEmoji(emojiData.unified);
                setCurrEdit({
                  id: item.id,
                  emoji: emoji,
                  index: item.index,
                  title: item.title,
                  userId: item.userId,
                  createdDate: item.createdDate,
                  lastModifiedDate: item.lastModifiedDate,
                });
                setFormEmoji("");
              }}
            />
          </Paper>
        </>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        handlers.apply((item, index) => {
          console.log({ ...item, index: index });
          listUpdate(item.id, { ...item, index: index }, false);
          return { ...item, index: index };
        });
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
