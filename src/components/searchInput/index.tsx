import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./style";

export function SearchInput({ ...rest }: TextInputProps) {
    return <Container { ...rest }/>
}