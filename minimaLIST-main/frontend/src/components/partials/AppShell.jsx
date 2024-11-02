import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { NavbarSearch } from "./NavbarSearch";
import { HeaderMenu } from "./HeaderMenu";
import { DndTodoHandle } from "../DragNDrops/DndTodoHandle";
import { TodoRenderer } from "./TodoRender";
import { FooterPlain } from "./FooterPlain";
import { FAQSection } from "./FAQSection";

export function Shell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [selectedList, setSelectedList] = useState(undefined);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavbarSearch
          opened={opened}
          setList={setSelectedList}
          selectedlist={selectedList}
        />
      }
      footer={<FooterPlain />}
      header={<HeaderMenu theme={theme} setOpened={setOpened} />}
    >
      {selectedList ? (
        <TodoRenderer selectedList={selectedList} />
      ) : (
        <FAQSection />
      )}
    </AppShell>
  );
}
