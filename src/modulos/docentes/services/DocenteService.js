import api from "../../../services";

const token = localStorage.getItem("token");



export const listarMisMaterias=async(ci)=>{
    return api.get(`/docentes/${ci}/materias`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

    )
}

export const listarNotasMateria=async(id_materia)=>{

    return api.get(`/docentes/${id_materia}/notas`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}