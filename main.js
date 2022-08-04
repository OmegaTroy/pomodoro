const $ = Selector => document.querySelector(Selector);
let $form = $('#form');
let $input = $('#input');
let $contenedor = $('.tareas');
let $item = $('.item');
const $counter = $('.counter');
const $titulo = $('#titulo');

//variables

const tareas = [];
let time = 0;
let id = 0;
let timer = null;
let reset = null;

$form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const {value} = $input;
    if(!value) return;

    const createTarea=(value) => {
        let tarea = {
            id: id++,
            title: value,
            completed: false
        };
        tareas.push(tarea);
        return {...tarea}
    }

    const renderTarea=() => {
    let tareaHtml = tareas.map(tarea =>{
        return `
        <div class="completed">${tarea.completed ? 
                `<span class="done">Done</span>` :
                `<button class="btn" id="${tarea.id}">Start</button>`}
                <span class="tarea">${tarea.title}</span>
        </div>
        `;
    })
    $contenedor.innerHTML = tareaHtml.join('');
    
    let $btn = document.querySelectorAll('.btn');

        $btn.forEach(btn=>{
            btn.addEventListener('click',() => {
                if(!time){
                    let current = btn.getAttribute('id');
                    startBtn(current);
                    btn.textContent = 'En proceso...'
                }
        })
    })
}

const startBtn = (id) => {
    time = 1 * 5;
    let currentId = document.getElementById(id)
    let next = currentId.nextElementSibling; 
    let titulo = next.textContent;

    $titulo.textContent = titulo;

    timer = setInterval(() => {
        timeInterval(id);
    }, 1000);
}
const timeInterval = (id)=>{
    time--;
    renderTime();
    if(time === 0){
        clearInterval(timer);
        $titulo.textContent = '';
        tareaCompleted(id);
        renderTarea();
    }
}

const renderTime= () =>{
    let minute = parseInt(time / 60);
    let segun = parseInt(time % 60);
    $counter.textContent = `${minute < 10 ? '0' : '' }${minute}: ${segun < 10 ? '0' : ''}${segun}`
}

const tareaCompleted= (id) => {
    let cuId = document.getElementById(id)
    tareas.forEach((tarea)=>{
        if(tarea.id == id){
            tarea.completed = true;
            console.log(tarea.completed)
        }
    });
    
}
    if(value){
        createTarea(value);
        console.log(tareas)
        renderTarea();
        $input.value = '';
    }
    


})
