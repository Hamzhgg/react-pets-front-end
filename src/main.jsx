import App from './App.jsx'


import { useState, useEffect } from 'react';

// Services
import * as petService from './services/petsService'

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

  const handleFormView = () => { setIsFormOpen(!isFormOpen) }

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
          <PetForm/>
        :
          <PetDetails selected={selected}/>
      }
    </>
  )
}