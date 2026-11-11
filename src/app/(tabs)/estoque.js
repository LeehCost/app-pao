
import { View, Text } from "react-native"; //importação dos componentes de divisao/bloco e texto, ps: lembra de add essa bagaça se nao, nao roda

export default function Estoque() { //definição e exportação da funcao que cria a tela
  return (
    <View
      style={{ //estilo do bloco, flex:1 ocupa toda a tela, justifyContent e alignItems centralizam o conteudo, backgroundColor cor de fundo
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8EF",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Estoque
      </Text>

      <Text>
        produtinhos ebaa
      </Text>
    </View>
  );
}
