import { Avatar, Box, HStack, Heading, ScrollView, StatusBar, VStack , Text, Spacer, Input } from "native-base";
import { FlatList, ImageBackground, View } from "react-native";
import Competidor from "../../model/competidor";
import headerIMG from "../../assets/control_image.jpg";
import { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './style';
import { Card, CardProps } from '../../components/card';
import { SearchInput } from "../../components/searchInput";

type Props = {
    navigation: any
  }

export const Home = ({ navigation }: Props) => {
    const [data, setData] = useState<CardProps[]>([]);

    useFocusEffect(useCallback(() => {
        handlerFetchData()
    }, []))
    
    function handleEdit(id: string) {
        navigation.navigate('Competidor', {id: id})
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

    const handleFilter = async () => {
        // try {
        //     const filteredCeps = newCeps.filter(
        //         (cep) => cep !== undefined
        //     ) as CepModel[];
        //     setCeps(filteredCeps);
        // } catch (error) {
        //     console.error('Error fetching data: ', error)
        // }
        console.log("Ainda não implementado")
    }

    return (
        <>
            <ImageBackground source={headerIMG} >
                <SearchInput variant="round" placeholder="Pesquisar..." onPress={handleFilter}/>
            </ImageBackground>

            <View style={styles.container}>
                <FlatList 
                    data={data}
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
                
        </>
    );
}