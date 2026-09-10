import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSession } from "../presentation/auth/session-context";

const DEMO_EMAIL = "residente@nexora.local";
const DEMO_PASSWORD = "Nexora2026!";

export default function LoginScreen() {
  const { signIn, isBusy, error } = useSession();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function submit(): Promise<void> {
    if (!email.trim() || password.length < 8) {
      setValidationError(
        "Ingresa un correo válido y una contraseña de 8 caracteres.",
      );
      return;
    }
    setValidationError(null);
    try {
      await signIn({ email, password });
    } catch {
      // El contexto muestra el error normalizado de la API.
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandMark} accessibilityElementsHidden>
            <Text style={styles.brandLetter}>N</Text>
          </View>
          <Text style={styles.brand}>NEXORA</Text>
          <Text style={styles.title}>Tu comunidad, en un solo lugar</Text>
          <Text style={styles.subtitle}>
            Accede para consultar tu unidad y contactos de emergencia.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              accessibilityLabel="Correo electrónico"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="nombre@correo.com"
              placeholderTextColor="#8791A5"
              style={styles.input}
              value={email}
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              accessibilityLabel="Contraseña"
              autoCapitalize="none"
              onChangeText={setPassword}
              onSubmitEditing={() => void submit()}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#8791A5"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            {(validationError || error) && (
              <Text accessibilityLiveRegion="polite" style={styles.error}>
                {validationError ?? error}
              </Text>
            )}

            <Pressable
              accessibilityRole="button"
              disabled={isBusy}
              onPress={() => void submit()}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                isBusy && styles.buttonDisabled,
              ]}
            >
              {isBusy ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Cuenta de demostración</Text>
            <Text style={styles.demoText}>{DEMO_EMAIL}</Text>
            <Text style={styles.demoText}>{DEMO_PASSWORD}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: "#F4F7FC" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignSelf: "center",
    width: "100%",
    maxWidth: 480,
  },
  brandMark: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2357D9",
    marginBottom: 14,
  },
  brandLetter: { color: "#FFFFFF", fontWeight: "900", fontSize: 30 },
  brand: {
    color: "#2357D9",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 2.4,
    marginBottom: 10,
  },
  title: { color: "#14213D", fontSize: 30, lineHeight: 36, fontWeight: "800" },
  subtitle: { color: "#596579", fontSize: 16, lineHeight: 24, marginTop: 10 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginTop: 28,
    shadowColor: "#122451",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  label: { color: "#26334D", fontWeight: "700", fontSize: 14, marginBottom: 8 },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D8DFEC",
    borderRadius: 14,
    paddingHorizontal: 15,
    color: "#14213D",
    fontSize: 16,
    marginBottom: 17,
    backgroundColor: "#FBFCFE",
  },
  error: { color: "#B42318", lineHeight: 20, marginBottom: 14 },
  button: {
    minHeight: 54,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2357D9",
    marginTop: 3,
  },
  buttonPressed: { opacity: 0.84 },
  buttonDisabled: { opacity: 0.62 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  demoBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#EAF0FF",
  },
  demoTitle: {
    color: "#2349A1",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 5,
  },
  demoText: { color: "#3D527F", fontSize: 14, lineHeight: 21 },
});
