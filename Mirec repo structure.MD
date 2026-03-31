# MIREC — Structure complète du repo GitHub
# Crée ces fichiers via github.dev (appuie sur "." dans ton repo)

mirec/
├── .github/
│   └── workflows/
│       └── eas-build.yml          ← COPIER le fichier eas-build.yml
│
├── app/                           ← Expo Router (pages de l'app)
│   ├── _layout.tsx                ← Layout racine + Auth guard
│   ├── index.tsx                  ← Redirige vers feed ou login
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx              ← MirecAuthScreen.jsx (déjà fait)
│   │   └── register.tsx
│   └── (tabs)/
│       ├── _layout.tsx            ← Bottom tab navigator
│       ├── feed.tsx               ← MirecFeed.jsx (déjà fait)
│       ├── groupes.tsx            ← Liste des groupes
│       ├── inbox.tsx              ← Messages privés
│       ├── louange.tsx            ← Espace audio
│       └── profil.tsx             ← Profil membre
│
├── components/
│   ├── feed/
│   │   ├── PostCard.tsx
│   │   ├── ReactionBar.tsx
│   │   └── CommentSection.tsx
│   ├── chat/
│   │   ├── MessageBubble.tsx
│   │   └── VoiceMessage.tsx
│   └── ui/
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       └── Button.tsx
│
├── lib/
│   └── supabase.ts                ← Client Supabase (voir ci-dessous)
│
├── stores/
│   ├── authStore.ts               ← Zustand session
│   └── feedStore.ts               ← Zustand posts
│
├── hooks/
│   ├── useAuth.ts
│   └── useRealtime.ts
│
├── types/
│   └── database.types.ts          ← Types générés par Supabase
│
├── assets/
│   ├── icon.png                   ← Logo MIREC (1024x1024)
│   ├── splash.png                 ← Splash screen
│   └── adaptive-icon.png          ← Android adaptive icon
│
├── app.json                       ← COPIER le fichier app.json
├── eas.json                       ← COPIER le fichier eas.json
├── package.json                   ← COPIER le fichier package.json
├── tsconfig.json                  ← (généré par Expo)
└── babel.config.js                ← (généré par Expo)


# ============================================================
# FICHIER : lib/supabase.ts
# ============================================================
# import 'react-native-url-polyfill/auto'
# import { createClient } from '@supabase/supabase-js'
# import * as SecureStore from 'expo-secure-store'
#
# const ExpoSecureStoreAdapter = {
#   getItem:    (key: string) => SecureStore.getItemAsync(key),
#   setItem:    (key: string, value: string) => SecureStore.setItemAsync(key, value),
#   removeItem: (key: string) => SecureStore.deleteItemAsync(key),
# }
#
# export const supabase = createClient(
#   process.env.EXPO_PUBLIC_SUPABASE_URL!,
#   process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
#   {
#     auth: {
#       storage: ExpoSecureStoreAdapter,
#       autoRefreshToken: true,
#       persistSession: true,
#       detectSessionInUrl: false,
#     },
#   }
# )


# ============================================================
# FICHIER : app/_layout.tsx  (Auth guard global)
# ============================================================
# import { useEffect } from 'react'
# import { Slot, useRouter, useSegments } from 'expo-router'
# import { supabase } from '../lib/supabase'
# import { useAuthStore } from '../stores/authStore'
#
# export default function RootLayout() {
#   const { session, setSession } = useAuthStore()
#   const segments = useSegments()
#   const router = useRouter()
#
#   useEffect(() => {
#     supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
#     supabase.auth.onAuthStateChange((_event, session) => setSession(session))
#   }, [])
#
#   useEffect(() => {
#     const inAuth = segments[0] === '(auth)'
#     if (!session && !inAuth) router.replace('/(auth)/login')
#     if (session && inAuth) router.replace('/(tabs)/feed')
#   }, [session, segments])
#
#   return <Slot />
# }


# ============================================================
# FICHIER : stores/authStore.ts
# ============================================================
# import { create } from 'zustand'
# import { Session } from '@supabase/supabase-js'
#
# interface AuthState {
#   session: Session | null
#   setSession: (session: Session | null) => void
# }
#
# export const useAuthStore = create<AuthState>((set) => ({
#   session: null,
#   setSession: (session) => set({ session }),
# }))


# ============================================================
# GITHUB SECRETS À AJOUTER
# (repo GitHub → Settings → Secrets → Actions)
# ============================================================
# EXPO_TOKEN                    = token depuis expo.dev/accounts/ben333/settings/access-tokens
# EXPO_PUBLIC_SUPABASE_URL      = https://jafhpkbtxcmzufznnbxc.supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY = ta clé anon depuis Supabase Settings > API
