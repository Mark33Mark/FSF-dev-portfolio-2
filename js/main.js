/*=======================================================================
 *
 *   Javascript 
 *        - Script common to all 3 pages: main.html, works.html, contact.html
 *        - This script handles a number of actions - function names adopted
 *          descripe the function.
 *   File created: 14 October 2021
 *   File updated: 11 December 2021
 *   Created by:   Mark Watson
 *
 *=======================================================================*/ 

  
const toggle   = document.querySelector( ".site--theme-text" );
const slider   = document.getElementById( "slider-position" );
const darkside = document.querySelector( ".darkside" ); 
const sunny    = document.querySelector( ".sunny" ); 
const dimmed   = 0.25;

themeOff = () => {

  if ( localStorage.getItem( "t-dark" ) ) {
    
    localStorage.removeItem( "t-dark" );
    document.body.classList.remove( "t-dark" );
    darkside.style.color = "#443d3d";
    darkside.style.textShadow = "none"; 
    darkside.style.opacity = dimmed;

    sunny.style.opacity = "1";
    sunny.style.color = "ForestGreen";
    sunny.style.textShadow = "0.05rem 0.05rem 1rem white"; 

  } else {

    localStorage.setItem( "t-dark", true );
    document.body.classList.add( "t-dark" );
    darkside.style.color = "ForestGreen";
    darkside.style.textShadow = "0.05rem 0.05rem 1rem white"; 
    darkside.style.opacity = "1";

    sunny.style.opacity = dimmed;
  }
};

setupPage = () => {
  if( localStorage.getItem( 't-dark' ) ) {
    slider.checked = true;
    document.body.classList.add( "t-dark" );
    darkside.style.color = "ForestGreen";
    darkside.style.textShadow = "0.05rem 0.05rem 1rem white"; 
    darkside.style.opacity = "1";

    sunny.style.opacity = dimmed;

  } else {

    slider.checked = false;

    darkside.style.color = "#443d3d";
    darkside.style.textShadow = "none"; 
    darkside.style.opacity = dimmed;

    sunny.style.opacity = "1";
    sunny.style.color = "ForestGreen";
    sunny.style.textShadow = "0.05rem 0.05rem 1rem white"; 

  }
};


/* =========================================================================================== */
// Found this idea at: https://www.creativebloq.com/inspiration/css-animation-examples
// Part of my exploration of fun animation effects. 
const moveableEl = document.getElementById("movable");

handleMouseMove = e => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const yAxisDegree = e.pageX / width * 1 * 80 - 60;
  const xAxisDegree = e.pageY / height * -1 * 80 + 10;

  moveableEl.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
  // Set the sheen position
  setSheenPosition(e.pageX / width, e.pageY / width);
};

setSheenPosition = (xRatio, yRatio) => {
 
  // This creates a "distance" up to 400px each direction to offset the sheen
  const xOffset = 1 - (xRatio - 0.5) * 800;
  const yOffset = 1 - (yRatio - 0.5) * 800;
 
  moveableEl.style.setProperty( '--sheenX', `${xOffset}px` );
  moveableEl.style.setProperty( '--sheenY', `${yOffset}px` );
};

clearCoOrdinates = () =>{
  const xReset = 0;
  const yReset = 0;

  moveableEl.style.transform = `rotateY(${yReset}deg) rotateX(${xReset}deg)`;
};

/* =========================================================================================== */


const aQuote       = document.getElementById("quote-me");
let quotesCalled = []; 

quoteGenerator = () => {

  console.log( "Quotes available = " + quotes.length);
  // Running this once to avoid delay from the setInterval for the 1st run.
  // User should see a quote as quickly as possible from opening the page.

    let randomInt = randomSelection( 0, quotes.length );

    let html = `<blockquote class="vertical-centre animate-fading">"${quotes[randomInt].text}"
    <br /><span class="quote-by"><strong>quoting:</strong> ${quotes[randomInt].author}</span></blockquote>`;
    aQuote.innerHTML = html;
  
    setInterval( () => {
      
      randomInt = randomSelection( 0, quotes.length );

      let html = `<blockquote class="vertical-centre animate-fading">"${quotes[randomInt].text}"
      <br /><span class="quote-by"><strong>quoting:</strong> ${quotes[randomInt].author}</span></blockquote>`;
      aQuote.innerHTML = html;
    }, 14000);  // align this setting with the CSS fade, line 572 of the style.css file.

  };

  randomSelection = ( min, max ) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1) + min); 
  };

 /* =========================================================================================== */

const closeTip     = document.getElementById("close-me"),
      tooltipLabel = document.getElementById("tooltip-label"),
      logoHover    = document.getElementById("watson-logo");

closeTip.addEventListener('click', event => {
  tooltipLabel.style.visibility = "hidden";
  closeTip.style.visibility = "hidden";
  localStorage.setItem( "tooltip-off", true );
});

logoHover.addEventListener('mouseover', event => {
  tooltipLabel.style.visibility = "visible"; 
  closeTip.style.visibility = "hidden";
});

logoHover.addEventListener('mouseout', event => {
  tooltipLabel.style.visibility = "hidden"; 
});

 /* =========================================================================================== */

// Doing this to avoid the resume prompt every time the user opens the page - you only need it 
// once.  I implemented this to be user friendly for mobile phone users.

checkTooltipStatus = () => {
  localStorage.getItem( "tooltip-off" ) ? tooltipLabel.style.visibility = "hidden" 
                                        : console.log(`resume tooltip off`)
};

 /* =========================================================================================== */

checkTooltipStatus();
quoteGenerator();
setupPage();

// ====================================================================================
