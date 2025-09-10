// src/screens/AddTaskScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { addTask } from '../src/services/tasks'; // O serviço que você forneceu
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
 
const AddTaskScreen = () => {
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
 
  const handleAddTask = async () => {
    if (!task) {
      setError('A tarefa não pode estar vazia');
      return;
    }
 
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('@user');
      if (!userData) {
        setError('Usuário não encontrado');
        return;
      }
 
      const user = JSON.parse(userData);
      await addTask(user.uid, task); // Usando o addTask da sua service
      setTask(''); // Limpar o campo de tarefa
      setError(''); // Limpar o erro
      setIsLoading(false);
      navigation.goBack(); // Voltar para a tela anterior (a lista de tarefas)
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setError('Erro ao adicionar tarefa');
    }
  };
 
  return (
<View style={styles.container}>
<Text style={styles.title}>Adicionar Tarefa</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
<TextInput
        style={styles.input}
        placeholder="Digite a sua tarefa"
        value={task}
        onChangeText={setTask}
      />
<Button
        title={isLoading ? 'Adicionando...' : 'Adicionar Tarefa'}
        onPress={handleAddTask}
        disabled={isLoading}
      />
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
 
export default AddTaskScreen;