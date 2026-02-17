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


export const registrarEstudiante=async(datos)=>{
    try{
        const response=await api.post(
            "/estudiantes", datos
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




export const registrarDocente=async(datos)=>{
    try{
        const response=await api.post(
            "/usuarios/registro-docente",datos
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