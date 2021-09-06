let list = localStorage.list ? JSON.parse(localStorage.list) : localStorage.list = JSON.stringify({milk: false, fruit : true,});   
let count = localStorage.count ? JSON.parse(localStorage.count) : {};
const TOTAL_SUMMA = 2000;               

//remove all data
document.addEventListener('click', event => event.target.textContent == 'Count' ? localStorage.removeItem('list') : null);
document.addEventListener('click', event => event.target.textContent == 'Count' ? localStorage.removeItem('count') : null);


document.addEventListener('dblclick', removeCount);
document.addEventListener('dblclick', removeList);
//show data
document.addEventListener('DOMContentLoaded', show);
//click left list strick
leftUl.addEventListener('click', strick);
//left button  +
left__button.addEventListener('click', newLi);
//right button +
right__button.addEventListener('click', newCount);



function show(){
    //right list
    for (let key in list) {
        let str;
        list[key] ? str = `<li >${key}</li>` : str =  `<li class="active">${key}</li>`;
        leftUl.insertAdjacentHTML('beforeend', str);
    };

    //left list
    if(JSON.stringify(count) == '{}') return;

    let block = document.querySelector('.right__container');
    for (let key in count) {
        let str = `<div class="right__text">
                        <div class="right__block__text">${key}</div>
                        <div class="right__block__text">${count[key]}</div>
                    </div>`;
        block.insertAdjacentHTML('beforeend', str);
    };
    adaptTotalSumma();
};

function strick(event){
    let target = event.target;
    if (target.tagName == 'INPUT') return;

    list[target.textContent] == true ? list[target.textContent] = false : list[target.textContent] = true;
    localStorage.list = JSON.stringify (list)
    target.classList.toggle ('active')
};

function newLi(){
    if(document.querySelector('input')) return;

    let str = `<li><input type="text"></li>`
    leftUl.insertAdjacentHTML ('beforeend', str);

    document.querySelector('input').addEventListener('blur', cbf, {once: true});

    function cbf(event) {
        let value = document.querySelector('ul').lastChild.lastChild.value;
        document.querySelector('ul').lastChild.lastChild.remove();
        document.querySelector('ul').lastElementChild.textContent = value;
        list[document.querySelector('ul').lastElementChild.textContent ]= true;
        localStorage.list = JSON.stringify(list);
    }
};

function newCount(){
    if(document.querySelector('input')) return;

    let str = `<div class="right__block">
                    <input type="text" name="" id="">
                    <input type="text" name="" id="">
                    <button id="buttonOk">ok</button>
                </div>`;
    let block = document.querySelector('.right__container');
    block.insertAdjacentHTML('beforeend', str);

    buttonOk.addEventListener('click', cbf, {once: true});

    function cbf(event) {
        let rightBlock = document.querySelector('.right__block');

        if (rightBlock.firstElementChild.value === '' || rightBlock.firstElementChild.nextElementSibling.value === ''){
            rightBlock.remove();
            return;
        };

        let str = `<div class="right__text">
                        <div class="right__block__text">${rightBlock.firstElementChild.value}</div>
                        <div class="right__block__text">${rightBlock.firstElementChild.nextElementSibling.value}</div>
                    </div>`;

        count[rightBlock.firstElementChild.value] = rightBlock.firstElementChild.nextElementSibling.value;
        localStorage.count = JSON.stringify(count);

        rightBlock.remove();
        
        block.insertAdjacentHTML('beforeend', str);

        adaptTotalSumma();
    }
};
//summa
function adaptTotalSumma(){
    let h3 = document.querySelector('h3');
    h3.textContent = `${Object.values(count).reduce((a, b) => +a + +b )} / ${TOTAL_SUMMA}`;
};

function removeCount(event) {
    if (event.target.parentElement.classList == 'right__text') {
        if (!isNaN(Number(event.target.textContent))) return;   
        if (confirm('Do you really want remove - ' + event.target.textContent)) {
            delete count[event.target.textContent];
            localStorage.count = JSON.stringify(count);
            clearBlocks();
            show();            
        };
    };
};

function removeList(event) {
    if (event.target.tagName == 'LI') {
        if (confirm('Do you really want remove - ' + event.target.textContent)) {
            delete list[event.target.textContent];
            localStorage.list = JSON.stringify(list);
            clearBlocks();
            show();            
        };
    };
};

function clearBlocks() {
    leftUl.innerHTML = ''; 
    document.querySelector('.right__container').innerHTML = '';
}