import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 22,
    marginBottom: 8,
    borderRadius: 4
  },
  content: {
    flex: 1,
    width: '50%',
    padding: 5,
  },
  nome: {
    fontSize: 14,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
  },
  email: {
    color: '#888D97',
    fontSize: 12,
  },
  telefone: {
    color: '#888D97',
    fontSize: 12,
  },
  cidade: {
    color: '#888D97',
    fontSize: 12,
  },
  user: {
    color: '#888D97',
    fontSize: 13,
  },
  button: {
    height: 80,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  }
});
