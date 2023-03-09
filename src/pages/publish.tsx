import { ChangeEvent, FC, useEffect, useState } from 'react'
import MainLayout from '~/components/main-layout'
import ProtectedRoute from '~/components/protected-route'
import {
	Container,
	Grid,
	GridItem,
	Flex,
	Box,
	Text,
	Heading,
	useColorModeValue,
	Input,
	SimpleGrid,
	FormLabel,
	Stack,
	Button,
	Spacer,
	Checkbox,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure
} from '@chakra-ui/react'
import BasicStatistics from '~/components/basic-statistics'

import { addNewQuestion } from '~/helpers/addNewQuestion'

type PublishProps = {}

const Publish: FC<PublishProps> = (): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [disabled, setDisabled] = useState(true)
	const toast = useToast()

	const [questionText, setQuestionText] = useState('')
	const [answerText, setAnswerText] = useState('')
	const [incorrectOne, setIncorrectOne] = useState('')
	const [incorrectTwo, setIncorrectTwo] = useState('')
	const [incorrectThree, setIncorrectThree] = useState('')

	useEffect(() => {
		setDisabled(
			questionText.length < 3 ||
				questionText.length > 50 ||
				answerText.length < 3 ||
				answerText.length > 50 ||
				incorrectOne.length < 3 ||
				incorrectOne.length > 50 ||
				incorrectTwo.length < 3 ||
				incorrectTwo.length > 50 ||
				incorrectThree.length < 3 ||
				incorrectThree.length > 50
		)
	}, [answerText, incorrectOne, incorrectThree, incorrectTwo, questionText])

	const isValidInput = (input: string) => {
		return input.length > 3 && input.length > 50
	}

	const handleButtonClick = () => {
		if (disabled) {
			return
		}

		onOpen()
	}

	const handleModalClick = async () => {
		const answer = { text: answerText, correct: true }

		const answers = [
			{ text: incorrectOne, correct: false },
			{ text: incorrectTwo, correct: false },
			{ text: incorrectThree, correct: false }
		]

		await addNewQuestion(questionText, answer, answers)

		setTimeout(
			() =>
				toast({
					title: 'Question published.',
					description: 'The question has been published.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top-right'
				}),
			2000
		)
		resetFields()
		onClose()
	}

	const resetFields = () => {
		setQuestionText('')
		setAnswerText('')
		setIncorrectOne('')
		setIncorrectTwo('')
		setIncorrectThree('')
	}

	return (
		<ProtectedRoute>
			<MainLayout>
				<Container py={5} maxW={'container.lg'}>
					<Grid
						templateColumns={{
							base: 'repeat(1, 1fr)',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(4, 1fr)'
						}}
						gap={6}
					>
						<GridItem w='100%' colSpan={{ base: 1, sm: 2, md: 2 }}>
							<Heading as={'h1'}>New Question Entry</Heading>
							<Box fontSize={'sm'}>Remember.. Typos cause headaches!</Box>
						</GridItem>
						<GridItem w='100%'>
							<Flex flexDirection={'column'}>
								<Text color='green.300' fontSize={'4xl'} fontWeight={'bold'}>
									20%
								</Text>
								<Box fontSize={'sm'}>
									Of questions published contain typos. This really needs attention.
								</Box>
							</Flex>
						</GridItem>
						<GridItem w='100%'>
							<Flex flexDirection={'column'}>
								<Text color='green.300' fontSize={'4xl'} fontWeight={'bold'}>
									90%
								</Text>{' '}
								<Box fontSize={'sm'}>Of questions have been requested.</Box>
							</Flex>
						</GridItem>
					</Grid>
				</Container>
				<BasicStatistics />
				<Box
					mt={4}
					flex={1}
					px={{ base: 2, md: 4 }}
					py={'5'}
					shadow={'xl'}
					border={'1px solid'}
					borderColor={useColorModeValue('gray.800', 'gray.500')}
					rounded={'lg'}
				>
					<Flex gap={4} w='100%'>
						<Stack w='100%'>
							<FormLabel>Question</FormLabel>
							<Input
								value={questionText}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)}
								focusBorderColor='green.300'
							/>
						</Stack>
						<Stack w='100%'>
							<FormLabel>Correct Answer</FormLabel>
							<Input
								value={answerText}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
								focusBorderColor='green.300'
							/>
						</Stack>
					</Flex>
					<Flex gap={4} w='100%' align='center' mt={6}>
						<Stack w='100%'>
							<FormLabel>Incorrect Answers</FormLabel>
							<Input
								value={incorrectOne}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setIncorrectOne(e.target.value)}
								focusBorderColor='green.300'
							/>
						</Stack>
						<Stack w='100%'>
							<FormLabel visibility='hidden'>Question</FormLabel>
							<Input
								value={incorrectTwo}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setIncorrectTwo(e.target.value)}
								focusBorderColor='green.300'
							/>
						</Stack>
						<Stack w='100%'>
							<FormLabel visibility='hidden'>Question</FormLabel>
							<Input
								value={incorrectThree}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setIncorrectThree(e.target.value)}
								focusBorderColor='green.300'
							/>
						</Stack>
					</Flex>
					<Stack spacing={5} mt={8} direction='row' justify='space-evenly'>
						<Checkbox colorScheme='green' defaultChecked>
							General Knowledge
						</Checkbox>
						<Checkbox colorScheme='green'>Sport</Checkbox>
						<Checkbox colorScheme='green'>Politics</Checkbox>
						<Checkbox colorScheme='green'>Literature</Checkbox>
						<Checkbox colorScheme='green'>Science</Checkbox>
						<Checkbox colorScheme='green'>Animal Kingdom</Checkbox>
					</Stack>
					<Button
						onClick={handleButtonClick}
						cursor={disabled ? 'not-allowed' : 'pointer'}
						disabled={true}
						mt={8}
						w='100%'
						colorScheme={disabled ? 'gray' : 'green'}
					>
						SUBMIT
					</Button>
				</Box>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Are You Sure?</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>
								Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
								doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
								veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
								voluptatem,
							</Text>
							<Text>
								quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
								dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui
								dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non
								numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam
								quaerat voluptatem.
							</Text>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='green' mr={3} onClick={handleModalClick}>
								It&apos;s fine
							</Button>
							<Button onClick={onClose} variant='ghost'>
								Go back and edit question
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</MainLayout>
		</ProtectedRoute>
	)
}

export default Publish

// Path: src/pages/publish.tsx
// Created at: 16:22:45 - 08/03/2023
// Language: Typescript
// Framework: React/Next.js
