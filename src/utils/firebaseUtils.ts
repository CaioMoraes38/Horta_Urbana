import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  databaseURL: "https://horta-urbana-2af7b-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export const FirebaseDadosData = async (): Promise<string[]> => {
  try {
    const dbRef = ref(database, 'Sensor/Dados/');
    return new Promise<string[]>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dates = Object.keys(data);
          resolve(dates);
        } else {
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Erro ao obter dados do Firebase:', error);
    throw error;
  }
};
export const FirebaseDadosHorario = async (date: string): Promise<string[]> => {
  try {
    const dbRef = ref(database, `Sensor/Dados/${date}/`);
    return new Promise<string[]>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const hours = Object.keys(data);
          resolve(hours);
          
        } else {
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Erro ao obter dados do Firebase:', error);
    throw error;
  }
};


export const FirebaseDadosUmidade = async (date: string, hours: string): Promise<{ humidity: number }> => {
  try {
    const dbRef = ref(database, `Sensor/Dados/${date}/${hours}/Umidade/`);
    return new Promise<{ humidity: number }>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0]; 
          const humidity = data[key] || 0; 
          resolve({ humidity });
        } else {
          resolve({ humidity: 0 });
        }
      });
    });
  } catch (error) {
    console.error('Erro ao obter umidade do Firebase:', error);
    throw error;
  }
};

export const FirebaseDadosMediaUmidade = async (date: string, hours: string): Promise<{ humidity: number }> => {
  try {
    const dbRef = ref(database, `Sensor/Dados/${date}/${hours}/Média_Umidade/`);
    return new Promise<{ humidity: number }>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0]; 
          const humidity = data[key] || 0; 
          resolve({ humidity });
        } else {
          resolve({ humidity: 0 });
        }
      });
    });
  } catch (error) {
    console.error('Erro ao obter umidade do Firebase:', error);
    throw error;
  }
};

export const FirebaseDadosTemperatura = async (date: string, hours: string): Promise<{ temperature: number }> => {
  try {
    const dbRef = ref(database, `Sensor/Dados/${date}/${hours}/Temperatura/`);
    return new Promise<{ temperature: number }>((resolve) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0]; 
          const temperature = data[key] || 0; 
          resolve({ temperature });
        } else {
          resolve({ temperature: 0 });
        }
      });
    });
  } catch (error) {
    console.error('Erro ao obter temperatura do Firebase:', error);
    throw error;
  }
};