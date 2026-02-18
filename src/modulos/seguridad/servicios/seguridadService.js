import api from "../../../services";

export const listarAdministradores=async()=>{
    return api.get("/administradores");
}


export const listarEstudiantes=async()=>{
    return api.get("/estudiantes");
}

export const listarDocentes=async()=>{
    return api.get("/usuarios/docentes");
}



export const registrarAdministrador=async(datos)=>{
    try{
        const response=await api.post(
            "/administradores/registro",
            datos
        );
        return response.data;

    }catch(error){
        if(error.response){
            return error.response.data;
        }
        return{
            exito:false,
            mensaje:"Error de conexion con el servidor",
            errores:["No se pudo conectar con el backend"]
        }

    }
}


export const registrarEstudiante = async (datos) => {
  try {
    const response = await api.post("/estudiantes", datos);
    return {
      exito: true,
      mensaje: response.data.message,
      data: response.data.data
    };
  } catch (error) {
    return {
      exito: false,
      mensaje: error.response?.data?.message || "Error de conexión con el servidor",
      status: error.response?.status || 500
    };
  }
};




export const registrarDocente=async(datos)=>{
    try{
        const response=await api.post(
            "/usuarios/registro-docente",datos
        );
        return response;
    }catch(error){
         return error.response || { status: 500, data: { message: "Error de conexión" } };
    }
}




export const editarAdministrador = async (ci, datos) => {
  try {
    const response = await api.patch(`/administradores/${ci}`, datos);

    // response.data es lo que devuelve tu backend
    return response.data;

  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      exito: false,
      mensaje: "Error de conexión con el servidor",
      errores: ["No se pudo conectar con el backend"]
    };
  }
};

export const editarDocente = async (ci, datosActualizar) => {
  try {
    const response = await api.put(`/usuarios/docentes/${ci}`, datosActualizar);

    // Axios devuelve el objeto dentro de response.data
    return response.data;

  } catch (error) {
    if (error.response) return error.response.data;

    return {
      success: false,
      message: "Error de conexión con el servidor",
      error: "No se pudo conectar al backend"
    };
  }
};

