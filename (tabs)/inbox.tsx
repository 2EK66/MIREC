import { View, Text } from 'react-native';
 
export default function InboxScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6' }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#0D2E6B', marginBottom: 8 }}>Messages</Text>
      <Text style={{ fontSize: 14, color: '#6B7280' }}>💬 Tes messages privés ici</Text>
    </View>
  );
}
