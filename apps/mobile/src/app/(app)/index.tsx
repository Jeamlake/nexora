import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { UserRole } from "../../domain/entities/User";
import { useSession } from "../../presentation/auth/session-context";

const roleLabels: Record<UserRole, string> = {
  ADMIN_DIRECTIVE: "Administración / Directiva",
  RESIDENT: "Residente",
  SECURITY_GUARD: "Seguridad",
};

export default function ProfileScreen() {
  const { profile, error, isBusy, retry, signOut } = useSession();

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          {isBusy && <ActivityIndicator size="large" color="#2357D9" />}
          <Text style={styles.stateTitle}>
            {error ? "No pudimos cargar tu perfil" : "Cargando tu perfil"}
          </Text>
          {error && <Text style={styles.stateText}>{error}</Text>}
          {error && (
            <Pressable
              style={styles.primaryButton}
              onPress={() => void retry()}
            >
              <Text style={styles.primaryButtonText}>Reintentar</Text>
            </Pressable>
          )}
          <Pressable style={styles.linkButton} onPress={() => void signOut()}>
            <Text style={styles.linkButtonText}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const location = [
    profile.unit.location.tower,
    profile.unit.location.pavilion,
    profile.unit.location.block,
    profile.unit.location.floor
      ? `Piso ${profile.unit.location.floor}`
      : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>MI PERFIL</Text>
            <Text style={styles.name}>{profile.user.displayName}</Text>
            <Text style={styles.email}>{profile.user.email}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.user.displayName.slice(0, 1).toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>{roleLabels[profile.user.role]}</Text>
          </View>
          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>
              {profile.resident.status === "ACTIVE" ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>

        <Section title="Residencia">
          <InfoRow label="Condominio" value={profile.condominium.name} />
          <View style={styles.divider} />
          <InfoRow label="Unidad" value={profile.unit.code} />
          {location && (
            <>
              <View style={styles.divider} />
              <InfoRow label="Ubicación" value={location} />
            </>
          )}
        </Section>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Contactos de emergencia</Text>
          <Text style={styles.counter}>
            {profile.resident.emergencyContacts.length}/3
          </Text>
        </View>
        {profile.resident.emergencyContacts.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.stateText}>
              Aún no hay contactos registrados.
            </Text>
          </View>
        ) : (
          profile.resident.emergencyContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInitial}>
                <Text style={styles.contactInitialText}>
                  {contact.name.slice(0, 1).toUpperCase()}
                </Text>
              </View>
              <View style={styles.contactBody}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactMeta}>{contact.relationship}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </View>
          ))
        )}

        <Pressable
          accessibilityRole="button"
          disabled={isBusy}
          onPress={() => void signOut()}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.logoutText}>
            {isBusy ? "Cerrando…" : "Cerrar sesión"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F7FC" },
  container: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 44,
    alignSelf: "center",
    width: "100%",
    maxWidth: 620,
  },
  header: { flexDirection: "row", justifyContent: "space-between", gap: 20 },
  eyebrow: {
    color: "#2357D9",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  name: {
    color: "#14213D",
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    marginTop: 7,
  },
  email: { color: "#667188", fontSize: 14, marginTop: 4 },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2357D9",
  },
  avatarText: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  statusRow: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 20 },
  rolePill: {
    backgroundColor: "#EAF0FF",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  roleText: { color: "#2349A1", fontSize: 13, fontWeight: "700" },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#E7F7EF",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16895A",
  },
  activeText: { color: "#126C49", fontSize: 13, fontWeight: "700" },
  sectionBlock: { marginTop: 29 },
  sectionHeading: {
    marginTop: 29,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#27344E",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 11,
  },
  counter: {
    color: "#51617D",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 11,
  },
  card: { backgroundColor: "#FFFFFF", borderRadius: 19, paddingHorizontal: 18 },
  infoRow: { paddingVertical: 16 },
  infoLabel: {
    color: "#778197",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  infoValue: {
    color: "#1D2942",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 5,
  },
  divider: { height: 1, backgroundColor: "#E8ECF3" },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 11,
  },
  contactInitial: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FA",
  },
  contactInitialText: { color: "#405279", fontSize: 18, fontWeight: "900" },
  contactBody: { flex: 1 },
  contactName: { color: "#1D2942", fontSize: 16, fontWeight: "800" },
  contactMeta: { color: "#778197", fontSize: 13, marginTop: 2 },
  contactPhone: {
    color: "#2357D9",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },
  emptyCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 20 },
  logoutButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CFD7E6",
    borderRadius: 15,
    marginTop: 26,
  },
  logoutText: { color: "#34425E", fontSize: 15, fontWeight: "800" },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  stateTitle: {
    color: "#1D2942",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 18,
  },
  stateText: {
    color: "#657188",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#2357D9",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 20,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800" },
  linkButton: { padding: 16, marginTop: 5 },
  linkButtonText: { color: "#405279", fontWeight: "700" },
});
