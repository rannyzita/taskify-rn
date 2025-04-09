import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from '../pages/list';
import User from '../pages/user';
import CustomTabBar from '../components/customTabBar'
import { AuthProviderList } from '../context/authContext_list';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <AuthProviderList>
      <Tab.Navigator
      // Para tirar o top feio la
      screenOptions={
        {headerShown:false}
      }
      tabBar={props=><CustomTabBar {...props}/>}
    >
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </AuthProviderList>
    
  );
}