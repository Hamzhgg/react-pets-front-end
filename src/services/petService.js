const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

export const index = async ()=> {
  try {
    const res = await fetch(BASE_URL)
    const pets = await res.json();

    return pets
  } catch (err) {
    console.log(err)
  }
}

export const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const pet = await res.json()
    return pet
  } catch (error) {
    console.log(error)
  }
}

export async function updatePet (formData, petId){
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function deletePet(petId){
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return await res.json()
  } catch (error) {
    console.log(error)
  }
}