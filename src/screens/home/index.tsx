import { FlatList, ImageBackground, View } from "react-native";
import headerIMG from "../../assets/control_image.jpg";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './style';
import { Card, CardProps } from '../../components/card';
import { SearchInput } from "../../components/searchInput";
import { Controller, useForm } from 'react-hook-form';

type Props = {
    navigation: any
  }

  type SearchFormProps = {
    nome: string
  }

export const Home = ({ navigation }: Props) => {

    const { control, register, getValues, watch }  = useForm<SearchFormProps>({});
    const watchCep = watch("nome");
    const [data, setData] = useState<CardProps[]>([]);
    const [handledData, setHandledData] = useState<CardProps[]>([]);

    useFocusEffect(useCallback(() => {
        handlerFetchData()
    }, []))

    useEffect(() => {
        if (getValues("nome").length == 0) {
            setHandledData(data)
        }
    }, [watch])
    
    function handleEdit(id: string) {
        navigation.navigate('Competidor', {id: id})
    }


    async function handlerFetchData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@crud_form:competidor')
            const data = jsonValue ? JSON.parse(jsonValue) : [];
            setData(data);
            setHandledData(data);
            return jsonValue
        }catch(error) {
            console.log(error);
        }
    }

    const handleFilter = async () => {
        const nomePesquisa = getValues("nome");
        console.log("Entrou");
        console.log("handledData: " + handledData);
        if (nomePesquisa.length > 1) {

            setHandledData(data);
            console.log("handledData 2 : " + handledData);
            const newHandledData = handledData.filter(
                (competidor) => competidor.primeiroNome.includes(nomePesquisa)
            );
            setHandledData(newHandledData);
        } else if (nomePesquisa.length == 0) {
            setHandledData(data);
        }
    }

    return (
        <>
            <ImageBackground source={headerIMG} >
                <Controller 
                    control={control}
                    name="nome"
                    defaultValue=''
                    render={({field: {onChange, value}})=>(
                        <SearchInput 
                            variant="round" 
                            placeholder="Pesquisar..." 
                            onPress={handleFilter} 
                            value={value} 
                            onChangeText={onChange} 
                            {...register("nome")}
                        />
                    )}
                />
            </ImageBackground>

            <View style={styles.container}>
                <FlatList 
                    data={handledData}
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