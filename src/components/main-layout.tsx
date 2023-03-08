import type { FC, ReactNode } from 'react'
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList
} from '@chakra-ui/react'
import {
	FiHome,
	FiTrendingUp,
	FiEdit,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { signOut, useSession } from 'next-auth/react'
import _log from './log'
import NextLink from 'next/link'

interface LinkItemProps {
	name: string
	icon: IconType
	link: string
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Dashboard', icon: FiHome, link: '/dashboard' },
	{ name: 'Trending', icon: FiTrendingUp, link: '/trending' },
	{ name: 'Publish', icon: FiEdit, link: '/publish' },
	{ name: 'Favourites', icon: FiStar, link: '/favourites' },
	{ name: 'Settings', icon: FiSettings, link: '/settings' }
]

interface SidebarProps extends BoxProps {
	onClose: () => void
}

interface NavItemProps extends FlexProps {
	icon: IconType
	children: string | number
	link: string
}

interface MobileProps extends FlexProps {
	onOpen: () => void
	image: string
	username: string
	isAdmin: boolean
}

type MainLayoutProps = { children: ReactNode }

const MainLayout: FC<MainLayoutProps> = ({ children }): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data: session } = useSession()

	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav
				onOpen={onOpen}
				image={session?.user?.image || ''}
				username={session?.user?.email?.split('@')[0] || ''}
				isAdmin={session?.isAdmin || false}
			/>
			<Box ml={{ base: 0, md: 60 }} p='4' h='100%'>
				{children}
			</Box>
		</Box>
	)
}

export default MainLayout

// Path: src/components/main-layout.tsx
// Created at: 01:06:25 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition='3s ease'
			bg={useColorModeValue('white', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text color='green.300' fontSize='xl' fontWeight='black' mt={6}>
					QUIZ QUESTIONS API
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<Box mt={20}>
				{LinkItems.map(link => (
					<NavItem key={link.name} icon={link.icon} link={link.link}>
						{link.name}
					</NavItem>
				))}
			</Box>
		</Box>
	)
}

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
	return (
		<NextLink href={link}>
			<Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
				<Flex
					align='center'
					p='4'
					mx='4'
					borderRadius='lg'
					role='group'
					cursor='pointer'
					_hover={{
						bg: 'green.300',
						color: 'white'
					}}
					{...rest}
				>
					{icon && (
						<Icon
							mr='4'
							fontSize='16'
							_groupHover={{
								color: 'white'
							}}
							as={icon}
						/>
					)}
					{children}
				</Flex>
			</Link>
		</NextLink>
	)
}

const MobileNav = ({ onOpen, username, image, isAdmin, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize='2xl'
				fontWeight='black'
				color='green.300'
			>
				QUIZ QUESTIONS API
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} />
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar name={username} size={'sm'} src={image} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'
								>
									<Text fontSize='sm'>{username || 'unknown user'}</Text>
									<Text fontSize='sm' color={isAdmin ? 'green.300' : 'gray.600'}>
										{isAdmin ? 'Admin' : 'User'}
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							// bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}
						>
							<MenuItem>Settings</MenuItem>
							<MenuDivider />
							<MenuItem
								onClick={() => {
									signOut({
										callbackUrl: `${window.location.origin}`
									})
								}}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	)
}

// session object
// {
//   "user": {
//     "name": "Rick",
//     "email": "ricky.brown.00@gmail.com",
//     "image": "https://cdn.discordapp.com/avatars/218482039114956800/4ef372404d075466f8757739d2392819.png"
//   },
//   "expires": "2023-04-07T11:06:42.427Z",
//   "isAdmin": false
// }
