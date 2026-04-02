import { View, Text, StyleSheet } from 'react-native';
 
export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed MIREC</Text>
      <Text style={styles.sub}>Les posts arrivent bientôt 🙏</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#0D2E6B', marginBottom: 8 },
  sub: { fontSize: 14, color: '#6B7280' },
});
