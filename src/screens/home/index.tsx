import { Box, HStack, Icon, IconButton, Input, StatusBar } from "native-base";
import { FlatList, Text, View } from "react-native";
import Competidor from "../../model/competidor";

export default function Home() {
    let competidores: Competidor[] = [
        {
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
            <HStack bg="coolGray.800" px="1" py="10" alignItems="center" w="100%" maxW="360">
                <HStack alignItems="center">
                    <Input mx="3" placeholder="Pesquisar..." w="95%" />
                </HStack>
            </HStack>

            <FlatList 
                    data={competidores}
                    keyExtractor={item => item.primeiroNome}
                    renderItem={({item}) => (
                        <View style={{ marginTop: 10 }}>
                            <Text> Nome: {item.primeiroNome}</Text>
                            <Text> Endereço: {item.rua}</Text>
                            <Text> Telefone: {item.telefone}</Text>
                            <Text> Cidade: {item.cidade}</Text>
                        </View>
                    )}
                />
        </>
    );
}