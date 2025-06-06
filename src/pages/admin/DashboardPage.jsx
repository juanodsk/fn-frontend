import { useAuth } from "../../context/AuthContext";
import Menu from "../../components/Menu.jsx";
function DashboardPage() {
  const { usuario } = useAuth();
  console.log(usuario);
  return (
    <div>
      <Menu />
      DashboardPage
    </div>
  );
}

export default DashboardPage;
