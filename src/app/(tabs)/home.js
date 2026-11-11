import { View, Text } from "react-native"; //layout
import { styles } from "../../styles/home.styles"; //estilos da tela home

export default function Home() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Pão Doca
      </Text>

      <Text style={styles.subtitulo}>
        Sistema - Padaria
      </Text>

      <View style={styles.card}>
        <Text style={styles.tituloCard}>
          Controle de estoque
        </Text>

        <Text>
          consulta dos produtos
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.tituloCard}>
          Pedidos
        </Text>

        <Text>
          pedidos aos fornecedores
        </Text>
      </View>

      <View style={styles.cardUltimo}>
        <Text style={styles.tituloCard}>
          Temporizador
        </Text>

        <Text>
          tempo dos troços
        </Text>
      </View>
    </View>
  );
}
