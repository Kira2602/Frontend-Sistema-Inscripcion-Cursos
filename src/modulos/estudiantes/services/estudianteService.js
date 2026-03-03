import api from "../../../services";

const token = localStorage.getItem("token");


export const logout =async ()=>{
    try{
        return api.post("/auth/logout");
    }catch(error){
        if (error.response) {
      return error.response.data;
    }
    return {
      exito: false,
      mensaje: "Error de conexion con el servidor",
      errores: ["No se pudo conectar con el backend"],
    };
    }

}

export const listarOfertaCarrera = async () => {
  return api.get("/inscripcion/materias", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const materiaOfertaDetalle = async (id_materia) => {
  return api.get(`/inscripcion/materias/${id_materia}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listarOfertaExtra = async () => {
  return api.get("/inscripcion/extracurriculares", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const listarMisMaterias = async () => {
  return api.get("/inscripcion/mis-inscripciones", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


