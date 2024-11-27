import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
  });

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/regioes/"
        );

        if (response.ok) {
          const data = await response.json();
          setRegions(data);
          console.log(data);
        } else {
          console.error("Erro ao buscar as regiões");
        }
      } catch (error) {
        console.error("Erro ao buscar as regiões", error);
      }

    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="coluna">
        <h3>Região</h3>
        <select id="nome" value={formData.nome} onChange={handleChange}>
          {regions.map((region) => (
            <option key={region.id} value={region.nome}>
              {region.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="coluna">
        <h3>Estados</h3>
        <select>
          <option value="someOption">Some option</option>
          <option value="otherOption">Other option</option>
        </select>
      </div>
      <div className="coluna">
        <h3>Cidades</h3>
        <select>
          <option value="someOption">Some option</option>
          <option value="otherOption">Other option</option>
        </select>
      </div>
    </>
  );
}