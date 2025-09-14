// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useTasks } from '../src/hooks/useTasks';
import { useTranslation } from 'react-i18next';
import { useMotivationalQuote } from '../src/hooks/useMotivationalQuote';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1️⃣ Tipagem das rotas do Stack
type RootStackParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
};

// 2️⃣ Tipagem do navigation para essa tela
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export default function HomeScreen() {
  const { tasks, loading } = useTasks();
  const { data: quote, isLoading: loadingQuote } = useMotivationalQuote();
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>
        {loadingQuote ? '...' : `${quote?.q} — ${quote?.a}`}
      </Text>

      {/* Botão para navegar para AddTaskScreen */}
      <Button
        title="Adicionar Tasks"
        onPress={() => navigation.navigate('AddTaskScreen')}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.task}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t("no_tasks")}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#555',
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
