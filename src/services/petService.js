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