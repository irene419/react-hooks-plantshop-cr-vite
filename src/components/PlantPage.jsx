import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // State for all plants fetched from backend
  const [plants, setPlants] = useState([])
  // State for search term
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch all plants when component loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
  }, [])

  // Add new plant to state after POST request
  const addPlant = (newPlant) => {
    setPlants(prev => [...prev, newPlant])
  }

  // Filter plants based on search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;