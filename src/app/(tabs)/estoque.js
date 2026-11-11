import { View, Text } from "react-native"; //importação dos componentes de divisao/bloco e texto, ps: lembra de add essa bagaça se nao, nao roda
import { styles } from "../../styles/estoque.styles"; //importando os estilos da tela de estoque

export default function Estoque() { //definição e exportação da funcao que cria a tela
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>
        Estoque
      </Text>

      <Text style={styles.subtitle}>
        produtinhos ebaa
      </Text>
    </View>
  );
}

