// /src/hooks/useTasks.ts
import { useEffect, useState } from 'react';
import { subscribeTasks } from '../services/tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  task: string;
  createdAt: Date;
  [key: string]: any;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (!userData) {
          console.log('Usuário não autenticado');
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.uid;

        const unsubscribe = subscribeTasks(userId, (tasks) => {
          const sorted = tasks.sort((a, b) => {
            const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return bDate - aDate;
          });
          setTasks(sorted);
          setLoading(false);
        });

        // Clean-up
        return () => unsubscribe();
      } catch (error) {
        console.log('Erro ao carregar tarefas:', error);
        setLoading(false);
      }
    };

    init();
  }, []);

  return { tasks, loading };
};
