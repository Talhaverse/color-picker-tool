const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColorText = document.getElementById('alteredColorText');
const alteredColor = document.getElementById('alteredColor');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const copyBtn = document.getElementById('copyBtn');

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!validHex(hex)) return;

     const changedHex = hex.replace('#', '');

    inputColor.style.backgroundColor =  `#${changedHex}`;
    reset();
})

toggleBtn.addEventListener('click', () => {

if(toggleBtn.classList.contains('toggled')){

    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');

} else {

    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');

}

reset();


})


const validHex = (hex) => {

    if(!hex) return false;

    const changedHex = hex.replace('#','');
    return changedHex.length ===3  || changedHex.length ===6;
}

const convertHexToRgb = (hex) => {

if(!validHex(hex)) return null;
let changedHex = hex.replace('#','');

if(changedHex.length === 3) {


    changedHex = changedHex[0] + changedHex[0]
    + changedHex[1] + changedHex[1]
    + changedHex [2] + changedHex[2];
 }

 const r = parseInt(changedHex.substring(0,2), 16);
 const g = parseInt(changedHex.substring(2,4), 16);
 const b = parseInt(changedHex.substring(4,6), 16);

 return {r , g , b};


}

function rgbtohex(r,g,b){

    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const Hex = firstPair + secondPair + thirdPair;

    return Hex;

}


function alterColor(hex, percentage) {

    let {r,g,b} = convertHexToRgb(hex);
    let hexAmount = Math.floor((percentage/100)*255);

    const newR =  inRange(r,hexAmount);
    const newG = inRange(g,hexAmount);
    const newB = inRange(b,hexAmount);

    return rgbtohex(newR, newG, newB);

}

function inRange(hex,amount) {

    const newHex = hex + amount;

    if(newHex < 0) return 0;

    else if(newHex > 255) return 255;

    return newHex;

}

alterColor("fff", 10);


slider.addEventListener('input', ()=>{

    if(!validHex(hexInput.value)) return ;


    sliderText.textContent = `${slider.value}%`;

    const valueChange = toggleBtn.classList.contains('toggled')?
       -slider.value :
       slider.value ;

    const alteredHex = alterColor(hexInput.value, valueChange);
    alteredColor.style.backgroundColor = `#${alteredHex}` ;
    alteredColorText.innerText = `Altered Color #${alteredHex}`; 


})

function reset() {
slider.value = 0;
sliderText.innerText = '0%';
alteredColor.style.backgroundColor = hexInput.value;
alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}

copyBtn.addEventListener('click',() => {
  
  var alterHex = alteredColorText.innerText;
let result = alterHex.substr(13, 19);
  navigator.clipboard.writeText(result).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    alert(`Copied the text: ${result}` );
});
navigator.clipboard.writeText(result).then(() => {
    /* Resolved - text copied to clipboard */
  },() => {
    /* Rejected - clipboard failed */
  });
  navigator.clipboard
  .readText()
  .then((copiedText) => {
        // Do something with copied text
   });
  



        
})



