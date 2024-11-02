import { Footer, Flex, Text } from "@mantine/core";

export function FooterPlain() {
  return (
    <Footer height={60} p="md">
      <Flex justify={"space-between"}>
        <Text c={"dimmed"}>Designed and Developed by: Piyush </Text>
        <Text c={"dimmed"}>Minimalist &copy; 2023</Text>
      </Flex>
    </Footer>
  );
}
