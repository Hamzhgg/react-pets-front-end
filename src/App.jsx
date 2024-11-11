
import { useState, useEffect } from 'react';

// Services
import * as petService from './services/petService'

// Components
import PetList from './components/PetList';
import PetDetails from './components/PetDetail';
import PetForm from './components/PetForm';

export default function App() {
  const [ pets, setPets ] = useState([])
  const [ selected, setSelected ] = useState(null);
  const [ isFormOpen, setIsFormOpen ] = useState(false)

  // we want to load the api data when the component mounts
  useEffect(()=> {
    async function getPets(){
      try {
        const allPets = await petService.index();
        if(allPets.error){
          throw new Error(pets.error)
        }
        setPets(allPets)
      } catch (error) {
        console.log(error)
      }

    }

    getPets()
  }, [])

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData)
      setPets([newPet, ...pets])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdatePet = async (formData, petId)=> {
    try {
      const updatedPet = await petService.updatePet(formData, petId)

      if(updatedPet.error){
        throw new Error(updatedPet.error)
      }

      const newPetsList = pets.map((pet)=>{
        if(pet._id !== updatedPet._id){
          return pet
        }else{
          return updatedPet
        }
      })

      setPets(newPetsList)
      setSelected(updatedPet)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
   }

  const handleFormView = (pet) => {
    // make sure we dont accidentally pass bad data to the edit pet form
    if(!pet.name){
      setSelected(null)
    }

    setIsFormOpen(!isFormOpen)
  }

  const handleRemovePet = async (petId)=>{
    try {
      const deletedPet = await petService.deletePet(petId);

      if(deletedPet.error){
        throw new Error(deletedPet.error)
      }

      setPets(pets.filter(pet => pet._id !== petId))
      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PetList
        petList={pets}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {
        isFormOpen ?
          <PetForm handleAddPet={handleAddPet} selected={selected} handleUpdatePet={handleUpdatePet}/>
        :
          <PetDetails
            selected={selected}
            handleFormView={handleFormView}
            handleRemovePet={handleRemovePet}
          />
      }
    </>
  )
}