import {
  Checkbox,
  createStyles,
  rem,
  ActionIcon,
  Paper,
  Tooltip,
} from "@mantine/core";
import { useDebouncedValue, useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconCheck,
  IconGripVertical,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { RTE } from "../TextEditors/RTE";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(0)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
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

export function DndTodoHandle({ data, onChange }) {
  data.map((item, index) => {
    if (!item.index) {
      item.index = index;
    }
    return item;
  });
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);
  const [currEdit, setCurrEdit] = useState("");
  const [currTodo, setCurrTodo] = useState(undefined);

  const deleteTodo = (todo) => {
    axios.delete(`/api/v1/todo/${todo.id}`).then((res) => {
      onChange(todo.listId);
    });
  };

  const updateTodo = (todo) => {
    axios.put(`/api/v1/todo/${todo.id}`, todo).then((res) => {});
  };

  useEffect(() => {
    console.log(currTodo);
    if (currTodo) {
      setCurrTodo({ ...currTodo, content: currEdit });
      updateTodo(currTodo);
    }
  }, [currEdit]);

  const items = state.map((item, index) => (
    <Draggable index={item.index} draggableId={item.id} key={item.id}>
      {(provided, snapshot) => (
        <Tooltip
          multiline
          label={`Created By: ${item.createdBy}@${new Date(
            item.createdDate
          ).toLocaleString()}\n Modified By: ${item.modifiedBy}@${new Date(
            item.lastModifiedDate
          ).toLocaleString()}`}
        >
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
              <IconGripVertical size="1.05rem" stroke={1.5} />
            </div>

            <Checkbox
              m={"sm"}
              name={index}
              defaultChecked={item.isChecked}
              onChange={(e) =>
                updateTodo({ ...item, isChecked: e.currentTarget.checked })
              }
            />
            <Paper onClick={(e) => setCurrTodo({ ...item })}>
              <RTE content={item.content} onChange={setCurrEdit} />
            </Paper>

            <ActionIcon m={"sm"} color="red" onClick={() => deleteTodo(item)}>
              <IconTrash size="1.125rem" />
            </ActionIcon>
          </div>
        </Tooltip>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        handlers.apply((item, index) => {
          updateTodo({ ...item, index: index });
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
