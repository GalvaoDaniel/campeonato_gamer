import { Avatar, Box, HStack, Heading, ScrollView, StatusBar, VStack , Text, Spacer, Input } from "native-base";
import { FlatList, View } from "react-native";
import Competidor from "../../model/competidor";
import headerIMG from "../../assets/header_image.jpg";
import { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles, Container, Content, Header } from './style';
import { Card, CardProps } from '../../components/card';

type Props = {
    navigation: any
  }

export const Home = ({ navigation }: Props) => {
    const [data, setData] = useState<CardProps[]>([]);

    useFocusEffect(useCallback(() => {
        handlerFetchData()
    }, []))
    
    function handleEdit(id: string) {
        navigation.navigate('Usuario', {id: id})
    }


    async function handlerFetchData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@crud_form:competidor')
            const data = jsonValue ? JSON.parse(jsonValue) : [];
            setData(data);
            return jsonValue
        }catch(error) {
            console.log(error);
        }
    }

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

    return (
        <>

            <Header source={headerIMG}>
                <Input variant="round" placeholder="Pesquisar..." />
            </Header>

            <Heading fontSize="xl" p="4" pb="3">
                <Text>Gamers</Text>
            </Heading>

            <View style={styles.container}>
                <FlatList 
                    data={competidores}
                    keyExtractor={item=>item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    renderItem={({item}) => 
                        <Card 
                            data={item}
                            onPress={() => handleEdit(item.id)}
                        />
                    }
                />
            </View>


            {/* <FlatList data={competidores} renderItem={({item}) => 
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
                </Box>} keyExtractor={item => item.id} /> */}
                
        </>
    );
}