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



export const registrarNotas=async (datos) => {
  try {
    const response = await api.post("/docentes/registrar-notas", datos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return {
      exito: true,
      mensaje: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      exito: false,
      mensaje:
        error.response?.data?.message || "Error de conexión con el servidor",
      status: error.response?.status || 500,
    };
  }
};
