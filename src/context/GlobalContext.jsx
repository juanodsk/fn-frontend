import { GrupoMinisterialProvider } from "../context/GrupoMinisterialContext";
import { AuthProvider } from "../context/AuthContext";

const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <GrupoMinisterialProvider>{children}</GrupoMinisterialProvider>;
    </AuthProvider>
  );
};

export default GlobalProvider;
