import { Avatar, Box, HStack, Heading, ScrollView, StatusBar, VStack , Text, Spacer, Input } from "native-base";
import { FlatList, View } from "react-native";
import Competidor from "../../model/competidor";
import { Container, Content, Header } from "./style";

import headerIMG from "../../assets/header_image.jpg";
import { SearchInput } from "../../components/searchInput";

export default function Home() {
    let competidores: Competidor[] = [
        {
            "id": "1",
            "primeiroNome": "Nome 1",
            "segundoNome": "sobrenome 1",
            "email": "email1@email.com",
            "telefone": "84999993333",
            "cep": "cep",
            "rua": "rua1",
            "numero": "11111",
            "bairro": "bairro1",
            "cidade": "cidade1",
            "UF": "UF1"
        },
        {
            "id": "2",
            "primeiroNome": "Nome 2",
            "segundoNome": "sobrenome 2",
            "email": "email2@email.com",
            "telefone": "84999992222",
            "cep": "cep",
            "rua": "rua2",
            "numero": "22222",
            "bairro": "bairro2",
            "cidade": "cidade2",
            "UF": "UF2"
        },
        {
            "id": "3",
            "primeiroNome": "Nome 3",
            "segundoNome": "sobrenome 3",
            "email": "email3@email.com",
            "telefone": "84999993333",
            "cep": "cep",
            "rua": "rua3",
            "numero": "33333",
            "bairro": "bairro3",
            "cidade": "cidade3",
            "UF": "UF3"
        }
    ];

    const data = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        fullName: "Aafreen Khan",
        timeStamp: "12:47 PM",
        recentText: "Good Day!",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        fullName: "Sujitha Mathur",
        timeStamp: "11:11 PM",
        recentText: "Cheer up, there!",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
      }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        fullName: "Anci Barroco",
        timeStamp: "6:22 PM",
        recentText: "Good Day!",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
      }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        fullName: "Aniket Kumar",
        timeStamp: "8:56 PM",
        recentText: "All the best",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
      }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        fullName: "Kiara",
        timeStamp: "12:47 PM",
        recentText: "I will call today.",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
      },{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb283k",
        fullName: "Aafreen Khan",
        timeStamp: "12:47 PM",
        recentText: "Good Day!",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f38",
        fullName: "Sujitha Mathur",
        timeStamp: "11:11 PM",
        recentText: "Cheer up, there!",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
      }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d16",
        fullName: "Anci Barroco",
        timeStamp: "6:22 PM",
        recentText: "Good Day!",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
      }];

    return (
        <>

            <Header source={headerIMG}>
                <Input variant="round" placeholder="Pesquisar..." />
            </Header>

            <Heading fontSize="xl" p="4" pb="3">
                <Text>Gamers</Text>
            </Heading>
            <FlatList data={competidores} renderItem={({item}) => 
                <Box borderWidth="1" _dark={{ borderColor: "muted.50" }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2" mb="3">
                    <HStack space={[2, 3]} justifyContent="space-between">
                        <VStack>
                            <Text _dark={{color: "warmGray.50"}} color="coolGray.800">
                                Nome: {item.primeiroNome}
                            </Text>
                            <Text _dark={{color: "warmGray.200"}} color="coolGray.600">
                                Endereço: {item.rua}
                            </Text>
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Text _dark={{color: "warmGray.50"}} color="coolGray.800">
                                Telefone: {item.telefone}
                            </Text>
                            <Text _dark={{color: "warmGray.200"}} color="coolGray.600">
                                Cidade: {item.cidade}
                            </Text>
                        </VStack>
                        <Avatar size="48px" bg="amber.500">
                            Edit
                        </Avatar>
                    </HStack>
                </Box>} keyExtractor={item => item.id} />
                
        </>
    );
}