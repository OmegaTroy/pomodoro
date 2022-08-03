const $ = Selector => document.querySelector(Selector);
let $form = $('#form');
let $input = $('#input');
let $contenedor = $('.tareas');
let $item = $('.item');

//variables

const tareas = [];
let id = 0;


$form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const {value} = $input;
    if(!value) return;

    if(value){
        createTarea(value);
        renderTarea();
        $input.value = '';
    }
})


    
const createTarea=(value)=>{
    const Tarea = {
        title: value,
        id: id++,
        completed: false,
    }
    tareas.unshift(Tarea);
    return {...Tarea};
};

const renderTarea = () => {
    let tareaHtml = tareas.map(tarea =>{
        return `
    <div class="item">
        <div class="completed">${tarea.completed ? `<spam class="done">Done</spam>` : `<button id="${tarea.id}" class="btn">Start</button>`}</div>
        <span class="tarea">${tarea.title}</span>
        </div> 
    `
    })
    $contenedor.innerHTML = tareaHtml.join('');
}
let $btn = $('.btn');

forEach(btn =>{
    btn.addEventListener('click',e=>{
        console.log('hola mundo')
    })
    
})