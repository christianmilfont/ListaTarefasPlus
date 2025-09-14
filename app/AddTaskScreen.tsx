// src/screens/AddTaskScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addTask } from '../src/services/tasks'; // sua service de tasks

// 1️⃣ Tipagem das rotas do Stack
type RootStackParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
};

// 2️⃣ Tipagem do navigation para essa tela
type AddTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

const AddTaskScreen = () => {
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<AddTaskScreenNavigationProp>();

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
      await addTask(user.uid, task); // salvar a task
      setTask('');
      setError('');
      console.log('Task salva com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar task:', e);
      setError('Erro ao adicionar tarefa');
    } finally {
      setIsLoading(false);
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

      {/* Botão para voltar à tela anterior */}
      <Button title="Voltar" onPress={() => navigation.goBack()} />

      {/* Botão para ir direto para a Home */}
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
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
