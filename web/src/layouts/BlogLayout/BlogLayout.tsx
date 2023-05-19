import { useState } from 'react'

import {
  Burger,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  // Avatar,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconHeart, IconLogout, IconMessage, IconPlayerPause, IconSettings, IconStar, IconSwitchHorizontal, IconTrash } from '@tabler/icons-react'

import { CurrentUser } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const useStyles = createStyles((theme) => {
  console.log({ theme })
  return {
    header: {
      paddingTop: theme.spacing.sm,
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      borderBottom: `${rem(1)} solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
      marginBottom: rem(60),
    },

    mainSection: {
      paddingBottom: theme.spacing.sm,
    },

    user: {
      color: theme.white,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',

      '&:hover': {
        backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!, 0.1),
      },

      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('xs')]: {
        display: 'none',
      },
    },

    userActive: {
      backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!, 0.1),
    },

    tabs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    tabsList: {
      borderBottom: '0 !important',
    },

    tab: {
      fontWeight: 500,
      height: rem(38),
      color: theme.white,
      backgroundColor: 'transparent',
      borderColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,

      a: { color: theme.white, textDecoration: 'none' },

      '&:hover': {
        backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!, 0.1),
      },

      '&[data-active]': {
        backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!, 0.1),
        borderColor: theme.fn.variant({
          variant: 'filled',
          color: theme.primaryColor,
        }).background,
      },
    },
  }
})

interface FunctionObject {
  [key: string]: () => string
}

interface HeaderTabsProps {
  isAuthenticated: boolean
  user: CurrentUser
  tabs: FunctionObject
  logOut: () => void
}

export function HeaderTabsColored({ isAuthenticated, user, tabs, logOut }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  console.log({ tabs, logOut })

  const items = Object.entries(tabs).map(([tab, linkFn]) => (
    <Tabs.Tab value={tab} key={tab}>
      <Link to={linkFn()}>{tab}</Link>
    </Tabs.Tab>
  ))

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Text weight={500} size="xl" sx={{ color: theme.white }}>
            Blog
          </Text>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" color={theme.white} />
          {isAuthenticated && user && (
            <Menu width={260} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }} onClose={() => setUserMenuOpened(false)} onOpen={() => setUserMenuOpened(true)} withinPortal>
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    {/* <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  /> */}
                    <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={rem(12)} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconHeart size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}>Liked posts</Menu.Item>
                <Menu.Item icon={<IconStar size="0.9rem" stroke={1.5} color={theme.colors.yellow[6]} />}>Saved posts</Menu.Item>
                <Menu.Item icon={<IconMessage size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}>Your comments</Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
                <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>Change account</Menu.Item>
                <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>Pause subscription</Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <HeaderTabsColored
        isAuthenticated={isAuthenticated}
        user={currentUser}
        logOut={logOut}
        tabs={{
          Home: routes.home,
          About: routes.about,
          Contact: routes.contact,
        }}
      />
      <Container>{children}</Container>
    </>
  )
}

export default BlogLayout
