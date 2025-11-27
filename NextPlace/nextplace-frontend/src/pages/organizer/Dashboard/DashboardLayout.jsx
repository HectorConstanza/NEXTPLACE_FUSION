import SideBar from "../../../components/SideBar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <SideBar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
