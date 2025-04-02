
import { TextInput, StyleSheet } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder="Buscar Personaje"
      placeholderTextColor="#647184"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding:18,
    fontSize: 16,
  },
});

export default SearchInput;
