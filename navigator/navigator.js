import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNum from "../screens/PhoneNum";


const StackLogin = createNativeStackNavigator();

export default function LoginStackNavigator() {
    return (
        <StackLogin.Navigator>
            <StackLogin.Screen name="phoneNum" component={PhoneNum} options={{ headerShown: false }} />
        </StackLogin.Navigator>
    )
}

