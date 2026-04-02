import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

const C = {
  blue900: '#0D2E6B',
  blue800: '#1A4B9B',
  blue700: '#2258B8',
  blue50:  '#EEF5FD',
  white:   '#FFFFFF',
  gray500: '#6B7280',
  gray300: '#D1D5DB',
  gray100: '#F3F4F6',
  danger:  '#DC2626',
  success: '#059669',
};

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplis tous les champs');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert('Erreur de connexion', error.message);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Erreur', 'Remplis tous les champs');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit faire au moins 6 caractères');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert(
        'Compte créé !',
        'Vérifie ton email pour confirmer ton inscription.',
        [{ text: 'OK', onPress: () => setMode('login') }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoZone}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.appName}>MIREC</Text>
          <Text style={styles.tagline}>Communauté de foi · Cotonou</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, mode === 'login' && styles.tabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
              Connexion
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, mode === 'register' && styles.tabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
              Inscription
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
          {mode === 'register' && (
            <>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Jean-Baptiste Koffi"
                style={styles.input}
                autoCapitalize="words"
              />
            </>
          )}

          <Text style={styles.label}>Adresse email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ton@email.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={mode === 'login' ? handleLogin : handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={C.white} />
            ) : (
              <Text style={styles.submitText}>
                {mode === 'login' ? 'Se connecter' : 'Rejoindre MIREC'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Verset */}
        <Text style={styles.verse}>
          "Car là où deux ou trois sont réunis en mon nom,{'\n'}
          je suis au milieu d'eux." — Mat. 18:20
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.blue900 },
  scroll: {
    flexGrow: 1, justifyContent: 'center',
    padding: 24,
  },
  logoZone: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: C.blue700,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: { color: C.white, fontSize: 32, fontWeight: '700' },
  appName: {
    color: C.white, fontSize: 28, fontWeight: '700',
    letterSpacing: 4,
  },
  tagline: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 },

  tabRow: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12, padding: 4, marginBottom: 20,
  },
  tab: {
    flex: 1, paddingVertical: 10,
    borderRadius: 10, alignItems: 'center',
  },
  tabActive: { backgroundColor: C.white },
  tabText: { color: 'rgba(255,255,255,0.7)', fontWeight: '500', fontSize: 14 },
  tabTextActive: { color: C.blue900, fontWeight: '700' },

  form: {
    backgroundColor: C.white, borderRadius: 20,
    padding: 20, marginBottom: 24,
  },
  label: {
    fontSize: 12, fontWeight: '600',
    color: C.blue900, marginBottom: 6, marginTop: 4,
  },
  input: {
    borderWidth: 1.5, borderColor: C.gray300,
    borderRadius: 10, padding: 12,
    fontSize: 14, color: C.blue900,
    marginBottom: 12, backgroundColor: C.gray100,
  },
  submitBtn: {
    backgroundColor: C.blue800, borderRadius: 12,
    padding: 14, alignItems: 'center', marginTop: 4,
  },
  submitText: { color: C.white, fontWeight: '700', fontSize: 15 },

  verse: {
    color: 'rgba(255,255,255,0.5)', fontSize: 12,
    textAlign: 'center', lineHeight: 18, fontStyle: 'italic',
  },
});
