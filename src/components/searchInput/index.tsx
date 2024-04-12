import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./style";

type InputProps = IInputProps &{
    errorMessage?: string | null;
    onPress: () => Promise<void>;
}
export function SearchInput({errorMessage = null, isInvalid, onPress,  ...res}: InputProps ){
    const invalid = !!errorMessage || isInvalid;
    return(
        <FormControl mb={4} isInvalid={invalid}>
            <View style={styles.view}>
                <NativeBaseInput
                    bgColor={"gray.100"}
                    fontSize="md"
                    h={12}
                    mb={4}
                    w={"80%"}
                    placeholderTextColor={"gray.500"}
                    isInvalid={invalid}
                    _focus={{
                        bg: "gray.100",
                        borderWidth: "2px",
                        borderColor: "green.500"
                    }}    
                    _invalid={{
                        borderWidth: "3px",
                        borderColor:"blueGray.100"
                    }}
                    {...res}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <MaterialIcons
                    name="search"
                    size={22}
                    color="#888D97"
                    />
                </TouchableOpacity>
            </View>
            
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
            
        </FormControl>
    );
}