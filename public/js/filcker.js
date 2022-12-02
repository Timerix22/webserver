document.addEventListener("DOMContentLoaded", flicker);

function flicker() {
    const elems = document.getElementsByClassName('flicker')
    let pos = 0;
    let id = setInterval(()=>
        {
            if (pos==1) {
                for(let i=0; i<elems.length; i++){
                    elems[i].style.color="#f0f0f0"
                };
                pos=0
            }
            else {
                for(let i=0; i<elems.length; i++){
                    elems[i].style.color="#ef9709"
                };
                pos=1
            }
        }
    , 600)
}
