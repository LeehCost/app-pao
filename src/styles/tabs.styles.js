import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const styles = StyleSheet.create({
  tabBar: { //estilo da barra, cor de fundo e espaçamento interno ebaa = barra inferior
    backgroundColor: theme.colors.background,
    height: 60,
    paddingBottom: 6,
  },
});

export const tabScreenOptions = {
  headerShown: true, //p exibir uma barra coom o titulo em todos os topos nas telas
  tabBarActiveTintColor: theme.colors.tabActive, //esse comando define a cor do icone e do text qnd é selecionada
  tabBarInactiveTintColor: theme.colors.tabInactive, //inverso cor qnd nao está selecionado
  tabBarStyle: styles.tabBar,
};
