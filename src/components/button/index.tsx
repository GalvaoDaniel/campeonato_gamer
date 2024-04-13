import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps &  {
    title: string;
}
export function Button({title, ...res}: Props){
    return(
        <ButtonNativeBase
            w="full"
            h={12}
            bg={"green.700"}
            borderRadius={30}
            _pressed={{
                bgColor:"green.900"
            }}
            {...res}
        >
        <Text color= "white" fontSize={20}>{title}</Text>

        </ButtonNativeBase>
    )
}