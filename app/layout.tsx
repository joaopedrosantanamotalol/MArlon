import { Stack } from "expo-router";

export default function Layout() {
    return(
        <Stack>
            <Stack.Screen name="/"/>
            <Stack.Screen name="cadastro/cadastro"/>
            <Stack.Screen name="home/home"/>
            </Stack>
    );
}