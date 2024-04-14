import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Center,  HStack,  Heading, Modal, VStack } from "native-base";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-tiny-toast';
import uuid from 'react-native-uuid';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from 'react-native';
import { RootTabParamList } from '../../routes';
import { DeleteItemDialog } from '../../components/deleteItemDialog';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import Endereco from '../../model/endereco';

type FormDataProps = {
  id: any
  primeiroNome: string;
  segundoNome: string;
  email: string;
  cep: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  UF: string;
}

const schemaRegister = yup.object({
  primeiroNome: yup.string().required("Primeiro nome é obrigatório").min(3, "Informe no minimo 3 digitos"),
  segundoNome: yup.string().required("Segundo nome é obrigatório").min(3, "Informe no minimo 3 digitos"),
  email: yup.string().required("Email é obrigatório").min(6, "Informe no minimo 6 digitos").email("E-mail informado não é valido"),
  cep: yup.string().required("Cep é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  rua: yup.string().required("Rua é obrigatório"),
  numero: yup.string().required("Numero é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  UF: yup.string().required("UF é obrigatório"),

})

type CompetidorRouteProp = BottomTabScreenProps<RootTabParamList, 'Competidor'>

export const Competidor = ({route, navigation}: CompetidorRouteProp) => {

  const {control, handleSubmit, reset, setValue, register, getValues, watch, formState: {errors}}  = useForm<FormDataProps>({
      resolver: yupResolver(schemaRegister) as any
  });

  const watchCep = watch("cep");
  const [endereco, setEndereco] = useState(new Endereco("", "", "", "", ""));
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchID] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isEditing = !!route?.params?.id;

  useLayoutEffect(() => {
    if(isEditing) {
      handlerSearcher(route.params.id)
    }else {
      reset();
      setSearchID(false);
      setLoading(false);
    }
    return () => setLoading(true);
  }, [route, isEditing])

  useLayoutEffect(() => {
    if (route?.params?.id) handlerSearcher(route.params.id)
    else {
      reset();
      setLoading(false);
    } 
  }, [route])

  useEffect(() => {

    const cep: string = getValues("cep");

    if (cep && cep.length == 8) {

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(json => {
        setEndereco(new Endereco(json.cep, json.logradouro, json.bairro, json.localidade, json.uf));
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // Não faz nada
    }
  }, [watchCep])

  useEffect(() => {
    setValue("rua", endereco.rua);

    setValue("bairro", endereco.bairro);

    setValue("cidade", endereco.cidade);

    setValue("UF", endereco.uf);

  }, [ endereco ] )

  async function handlerRegister(data:FormDataProps){
    data.id = uuid.v4().toString();
    //console.log(data);
    try{
      const responseData =  await AsyncStorage.getItem('@crud_form:competidor')
      const dbData = responseData ? JSON.parse(responseData!) : [];
      console.log(dbData);
      const previewData = [data, ...dbData];

      await AsyncStorage.setItem('@crud_form:competidor', JSON.stringify(previewData))
      reset();
      navigateHome();
      Toast.showSuccess("Competidor registrado com sucesso")
    }catch (e){
      Toast.showSuccess("Erro ao registrar competidor "+e)
    }
  }

  async function handlerSearcher(id:string) {
    try{
      setLoading(true)
      const responseData =  await AsyncStorage.getItem('@crud_form:competidor')
      const dbData: FormDataProps[] = responseData? JSON.parse(responseData) : [];

      const itemEncontrado = dbData?.find(item => item.id === id)
      if (itemEncontrado) {
        Object.keys(itemEncontrado).forEach((key) => 
          setValue(
            key as keyof FormDataProps,
            itemEncontrado?.[key as keyof FormDataProps] as string
          )
        );
        setSearchID(true);
      }
      setLoading(false);
    }catch(error) {
      setSearchID(false);
      console.log(error)
    }
  }

  async function handlerAlterRegister(data:FormDataProps){
    try{
      setLoading(true)
      const reponseData =  await AsyncStorage.getItem('@crud_form:competidor');
      const dbData: FormDataProps[] = reponseData? JSON.parse(reponseData) : [];

      const indexRemove = dbData?.findIndex(item => item.id === data.id)
  
      if(indexRemove !== -1){
        dbData.splice(indexRemove,1);
        const previeData = [...dbData, data];
        await AsyncStorage.setItem('@crud_form:competidor', JSON.stringify(previeData));
        Toast.showSuccess("Usuário alterado com sucesso");
        setLoading(false);
        setSearchID(false);
        reset();
        navigateHome();
      }else{
        Toast.show('Registro não localizado!')
      }

    }catch(e){
        setLoading(false);
        console.log(e);
    }
  }
 
  async function navigateHome(){
    navigation.navigate('Home');
  }

  async function handleDelete(data:FormDataProps){
    try{
      setLoading(true);
      const reponseData =  await AsyncStorage.getItem('@crud_form:competidor');
      const dbData: FormDataProps[] = reponseData? JSON.parse(reponseData) : [];
 
      const indexRemove = dbData?.findIndex(item => item.id === data.id)
     
      if(indexRemove !== -1){
        dbData.splice(indexRemove,1);
        await AsyncStorage.setItem('@crud_form:competidor', JSON.stringify(dbData));
        Toast.showSuccess("Usuário excluído com sucesso");
        setShowDeleteDialog(false);
        setLoading(false);
        setSearchID(false);
        reset();
        navigateHome();
      }else{
        Toast.show('Registro não localizado!')
      }
 
    }catch(e){
      console.log(e);
    }
 
  }



if (loading) return <ActivityIndicator size="large" color="#000fff"/>
  return (
    <KeyboardAwareScrollView>
    <VStack bgColor="gray.300" flex={1} px={5} pb={5}>
        <Center>
            <Heading my={5}>
                Cadastro de Competidores
            </Heading>
          <Controller 
            control={control}
            name="primeiroNome"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Primeiro nome'
              onChangeText={onChange}
              errorMessage={errors.primeiroNome?.message}
              value={value}
            />
            )}
          />
          <Controller 
            control={control}
            name="segundoNome"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Segundo nome'
              onChangeText={onChange}
              errorMessage={errors.segundoNome?.message}
              value={value}
            />
            )}
          />
          <Controller 
            control={control}
            name="email"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='E-mail'
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              value={value}
            />
            )}
          />
          <Controller 
            control={control}
            name="telefone"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Telefone'
              onChangeText={onChange}
              errorMessage={errors.telefone?.message}
              value={value}
            />
            )}
          />
          <Controller 
            control={control}
            name="cep"
            defaultValue=''
            render={({field: {onChange, value}})=>(
              <Input
                placeholder='CEP'
                onChangeText={onChange}
                errorMessage={errors.rua?.message}
                value={value}
                {...register("cep")}
              />
            )}
          />
          <Controller 
            control={control}
            name="rua"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Rua'
              onChangeText={onChange}
              errorMessage={errors.rua?.message}
              value={value}
              {...register("rua")}
            />
            )}
          />
          <Controller 
            control={control}
            name="numero"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Numero'
              onChangeText={onChange}
              errorMessage={errors.numero?.message}
              value={value}
            />
            )}
          />
          <Controller 
            control={control}
            name="bairro"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Bairro'
              onChangeText={onChange}
              errorMessage={errors.bairro?.message}
              value={value}
              {...register("bairro")}
            />
            )}
          />
          <Controller 
            control={control}
            name="cidade"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='Cidade'
              onChangeText={onChange}
              errorMessage={errors.cidade?.message}
              value={value}
              {...register("cidade")}
            />
            )}
          />
          <Controller 
            control={control}
            name="UF"
            defaultValue=''
            render={({field: {onChange, value}})=>(
            <Input
              placeholder='UF'
              onChangeText={onChange}
              errorMessage={errors.UF?.message}
              value={value}
              {...register("UF")}
            />
            )}
          />
           {searchId ? (
            <VStack>
                <HStack>
                  <Button rounded="md" shadow={3} title='Alterar' color='#F48B20' onPress={handleSubmit(handlerAlterRegister)} />
                </HStack>
                <HStack paddingTop={5}>
                  <Button rounded="md" shadow={3} title='Excluir' color='#CC0707' onPress={() => setShowDeleteDialog(true)} />
                </HStack>
            </VStack>
          ) : (
            <Button title='Cadastrar' color='green.700' onPress={handleSubmit(handlerRegister)} />
          )}
        </Center>
      </VStack>
      <Modal isOpen={showDeleteDialog} onClose={()=> setShowDeleteDialog(false)}>
        <DeleteItemDialog
            isVisible = {showDeleteDialog}
            onCancel={()=> setShowDeleteDialog(false)}
            onConfirm={handleSubmit(handleDelete)}
        />
      </Modal>
    </KeyboardAwareScrollView>
      
  );
}

