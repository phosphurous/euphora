import { View, Text } from 'react-native'
import { Link } from 'expo-router'
const profile = () => {
  return (
    <View>
      <Text>profile</Text>
      <Link href="/link/1">Link One</Link>
      <Link href="/link/2">Link Two</Link>
    </View>
  )
}

export default profile