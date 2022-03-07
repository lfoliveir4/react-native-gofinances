import React, { ReactElement } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'


import Dashboard from '../screens/Dashboard'
import Resume from '../screens/Resume'
import Register from '../screens/Register'

type Props = {}

const Tab = createBottomTabNavigator()

export default function HomeTabs({}: Props): ReactElement {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            height: 65,
          }
        }
      }
    >
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Tab.Screen
        name='Register'
        component={Register}
        options={{
          tabBarLabel: 'Cadastrar',
          tabBarStyle: {
            height: 65,
            display: 'none',
          },
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='attach-money'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Tab.Screen
        name='Resume'
        component={Resume}
        options={{
          tabBarLabel: 'Resumo',
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='pie-chart'
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Tab.Navigator>
  )
}