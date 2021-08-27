let count = localStorage.count ? JSON.parse(localStorage.count) : localStorage.count = JSON.stringify({milk: false, fruit : true,});   

document.addEventListener ('click', event => event.target.textContent == 'Count' ? localStorage.removeItem ('count') : null)
document.addEventListener('DOMContentLoaded', showBuyList );
leftUl.addEventListener ('click', strick);
left__button.addEventListener ('click', newLi);

// localStorage.removeItem ('count')

function showBuyList () {
    for (let key in count) {
        let str;
        count[key] ? str = `<li >${key}</li>` : str =  `<li class="active">${key}</li>`;
        leftUl.insertAdjacentHTML ('beforeend', str);
    }
}

function strick (event) {
    let target = event.target;
    if (target.tagName == 'INPUT') return;

    count[target.textContent] == true ? count[target.textContent] = false : count[target.textContent] = true;
    localStorage.count = JSON.stringify (count)
    target.classList.toggle ('active')
    console.log (count)
}

function newLi () {
    if (document.querySelector('input')) return

    let str = `<li><input type="text"></li>`
    leftUl.insertAdjacentHTML ('beforeend', str);

    document.querySelector('input').addEventListener ('blur', cbf, {once: true});

    function cbf (event) {
        let value = document.querySelector ('ul').lastChild.lastChild.value;
        document.querySelector ('ul').lastChild.lastChild.remove();
        document.querySelector ('ul').lastElementChild.textContent = value;
        console.log (document.querySelector ('ul').lastElementChild.textContent )
        count[document.querySelector ('ul').lastElementChild.textContent ]= true;
        localStorage.count = JSON.stringify (count)
    }
}


