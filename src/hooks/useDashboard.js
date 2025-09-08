// src/hooks/useDashboard.js
import { useState, useEffect } from "react";
import { getAdminDashboard } from "@/services/dashboardService";

export default function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const result = await getAdminDashboard();
        setData(result);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { data, loading };
}
