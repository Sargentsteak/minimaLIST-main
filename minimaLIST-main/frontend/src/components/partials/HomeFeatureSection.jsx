import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import { IconPlant, IconUsersGroup } from "@tabler/icons-react";
import {
  IconGauge,
  IconUsers,
  IconCookie,
  IconAsteriskSimple,
} from "@tabler/icons-react";

const mockdata = [
  {
    title: "Simple",
    description:
      "This App makes you life easy, following the minimalist philosophy with an intuitive, User interface and controls, get your tasks organised in the most serene manner",
    icon: IconAsteriskSimple,
  },
  {
    title: "Shared",
    description:
      "Get your friends to collaborate, share and edit your todos or notes, in a flash!",
    icon: IconUsersGroup,
  },
  {
    title: "Seamless",
    description:
      "Have notes on your phone but always risk loosing them when changing devices? Fear not Minimalist allows you to access your notes seamlessly on any device that can run a browser!",
    icon: IconPlant,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function HomeFeatureSection() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          The only note taking app you'll ever need
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Gets Your Job done effortlessly
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll be frustrated by having too much on your
        plate, Get organised in an uncluttered manner, unlike other apps we
        provide features that are necessary to get your job done without
        overwhelming you
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
