const $ = Selector => document.querySelector(Selector);
let $form = $('#form');
let $input = $('#input');
let $contenedor = $('.tareas');
let $item = $('.item');
const $counter = $('.counter');
const $titulo = $('#titulo');
let $btn = document.querySelectorAll('.btn');

//variables

const tareas = [];
let time = 0;
let id = 0;
let timer = null;
let res = null;

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
        return {...tarea};
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
                    btn.textContent = 'En proceso...';
                    btn.classList.add('proceso');
                }
        })
    })
}

const startBtn = (id) => {
    time = 25 * 60;
    let currentId = document.getElementById(id);
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
        receso(id);
        renderTarea();
    }
}

const renderTime= () =>{
    let minute = parseInt(time / 60);
    let segun = parseInt(time % 60);
    $counter.textContent = `${minute < 10 ? '0' : '' }${minute} : ${segun < 10 ? '0' : ''}${segun}`;
}

const receso = (id) => {
    time = 5 * 60;
    $titulo.textContent = 'Receso';
    res = setInterval(()=>{
        recesoInterval();
    }, 1000)
}

const recesoInterval=() => {
    time--;
    renderTime();
    if(time === 0){
        clearInterval(res);
        $titulo.textContent = '';
        renderTarea();
    }
}



const tareaCompleted= (id) => {
    tareas.forEach((tarea)=>{
        if(tarea.id == id){
            tarea.completed = true;
            console.log(tarea.completed);
        }
    });
    
}
    if(value){
        createTarea(value);
        renderTarea();
        $input.value = '';
    }
    


})
