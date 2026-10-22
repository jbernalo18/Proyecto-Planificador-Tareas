export class TaskManager{

    constructor(){
        this.tareas=[]; //array vacio para guardar las tareas
        this.id=0;

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

    }


