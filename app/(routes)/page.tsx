"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./components/Barchart";

export interface Proyecto {
  idProyecto: string;
  nombre: string;
  totalHistorias: number;
  historiasProcesoQA: number;
  historiasEnCorrecion: number;
  historiasRechazadas: number;
  historiasEnDesarrollo: number;
}

const Home = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setProyectos(response.data);
      } catch (error) {
        setError("Error al cargar proyectos");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <BarChart data={proyectos} />
   
    </div>
  );
};

export default Home;
