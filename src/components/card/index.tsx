import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './style';

export type CardProps = {
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

type Props = {
  data: CardProps;
  onPress: () => void;
}

export function Card({ data, onPress }: Props) {

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View>
          <Text style={styles.nome}>
            {data.primeiroNome}
          </Text>
          <Text style={styles.email}>
            {data.email}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View>
        <Text style={styles.telefone}>
            {data.telefone}
          </Text>
          <Text style={styles.cidade}>
            {data.cidade}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="edit"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}