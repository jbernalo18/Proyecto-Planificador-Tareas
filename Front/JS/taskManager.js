export class TaskManager{

    constructor(claveProyecto){
        this.tareas=[]; //array vacio para guardar las tareas
        this.id=0;
        this.claveTareas = `tareas_${claveProyecto}`;
        this.claveId = `ultimoId_${claveProyecto}`;

    }

    //obtener las las tareas
    getTodasTareas(){
        return this.tareas;
    }

    //agregar tarea y colcoar id 
    agregarTarea(tarea){
        //subimos contador 
        this.id++;
        tarea.id=this.id;//id ya actualizado 
        this.tareas.push(tarea); //la agregamos a la lista 
        return tarea; //retornamos la tarea
    }
    //metodo oara filtrar por estado 
    getTareasConEstado(estado){
        return this.tareas.filter(tarea => tarea.estado === estado);
    }

    borrarTarea(id){
        this.tareas= this.tareas.filter(tarea => tarea.id !== id);
    }

    actualizarEstadoTarea(id,estado){
        const tarea = this.tareas.find(tarea => tarea.id===id);
        if (tarea){
            tarea.estado=estado;
        }
    }

    asignarTarea(id,asignacion){
        const tarea = this.tareas.find(tarea => tarea.id===id);
        if(tarea){
            tarea.asignadoA = asignacion;
        }
    }

    buscarTareaID(id){
     const tareaEncontrada = this.tareas.find((tarea) => tarea.id === id)
     return tareaEncontrada;
        }

    editarTarea(id,tareaAct){
        const tarea = this.buscarTareaID(id);
        if(tarea === undefined){
            return "tarea no encontrada";
        }
        tarea.nombre = tareaAct.nombre;
        tarea.descripcion = tareaAct.descripcion;
        tarea.asignadoA = tareaAct.asignadoA;
        tarea.fechaDeEntrega= tareaAct.fechaDeEntrega;
        tarea.estado = tareaAct.estado;
        tarea.etiquetas= tareaAct.etiquetas;
        tarea.prioridad = tareaAct.prioridad;
        return tarea;
    }  

    save() {
        localStorage.setItem(this.claveTareas, JSON.stringify(this.tareas));
        localStorage.setItem(this.claveId, this.id);
    }

    load() {
        try {
            const data = localStorage.getItem(this.claveTareas);
            this.tareas = data ? JSON.parse(data) : [];
            const idGuardado = localStorage.getItem(this.claveId);
            this.id = idGuardado !== null ? Number(idGuardado) : 0;
        } catch {
            this.tareas = [];
            this.id = 0;
        }
    }
}



