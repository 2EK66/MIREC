import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
 
export default function ProfilScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6' }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#0D2E6B', marginBottom: 8 }}>Mon Profil</Text>
      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        style={{ marginTop: 20, padding: 12, backgroundColor: '#1A4B9B', borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
