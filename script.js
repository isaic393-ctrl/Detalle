(function() {
  const startBtn = document.getElementById('start-btn');
  const contentGarden = document.getElementById('content-garden');
  let gardenActive = false;
  
  let globalPositions = [];

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function getSafeSafeHorizontalPos() {
    let intentos = 0;
    let posValida = false;
    let nuevaPos = 0;

    while (!posValida && intentos < 50) {
      nuevaPos = getRandomArbitrary(5, 85); // Abarca desde el 5% al 85% de la pantalla
      posValida = true;
      intentos++;

      for (let i = 0; i < globalPositions.length; i++) {
        if (nuevaPos > globalPositions[i] - 18 && nuevaPos < globalPositions[i] + 18) {
          posValida = false;
          break;
        }
      }
    }
    
    if (globalPositions.length > 5) {
      globalPositions.shift(); 
    }

    globalPositions.push(nuevaPos);
    return nuevaPos;
  }

  const createSingleFlower = (forcedLeft = null) => {
    let flwr = document.createElement('div');
    let leftPos = forcedLeft !== null ? forcedLeft : getSafeSafeHorizontalPos();

    flwr.classList.add('sunflwr');
    flwr.innerHTML = `<div class="sunflwr__leaf--left"></div>
                      <div class="sunflwr__leaf--right"></div>
                      <div class="sunflwr__stem"></div>
                      <div class="sunflwr__center"></div>
                      <div class="sunflwr__pedal--1"></div>
                      <div class="sunflwr__pedal--2"></div>
                      <div class="sunflwr__pedal--3"></div>
                      <div class="sunflwr__pedal--4"></div>
                      <div class="sunflwr__pedal--5"></div>
                      <div class="sunflwr__pedal--6"></div>
                      <div class="sunflwr__pedal--7"></div>
                      <div class="sunflwr__pedal--8"></div>
                      <div class="sunflwr__pedal--9"></div>
                      <div class="sunflwr__pedal--10"></div>
                      <div class="sunflwr__pedal--11"></div>
                      <div class="sunflwr__pedal--12"></div>`;
    flwr.style.left = `${leftPos}vw`;
    
    let esCelular = window.innerWidth <= 600;
    
    if (esCelular) {
      let dimCel = getRandomArbitrary(55, 75);
      flwr.style.width = `${dimCel}vw`;
      flwr.style.height = `${dimCel}vw`;
      flwr.style.zIndex = Math.round(100 - dimCel);
    } else {
      let dimPC = getRandomArbitrary(35, 50);
      flwr.style.width = `${dimPC}vmin`;
      flwr.style.height = `${dimPC}vmin`;
      flwr.style.zIndex = Math.round(100 - dimPC);
    }
    
    flwr.style.filter = `saturate(${getRandomArbitrary(95, 100)}%) brightness(${getRandomArbitrary(95, 115)}%)`;
    document.body.appendChild(flwr);
  };

  const growInitialGarden = () => {
    let initialPositions = [10, 35, 60, 85]; // Perfectamente distribuidos de lado a lado
    
    initialPositions.forEach((pos) => {
      globalPositions.push(pos);
    });

    initialPositions.forEach((pos, index) => {
      setTimeout(() => {
        createSingleFlower(pos);
      }, index * 250); 
    });
  };

  startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
    startBtn.classList.add('hidden'); 
    contentGarden.classList.remove('hidden'); 
    
    document.body.classList.remove('inicio-negro');
    document.body.classList.add('jardin-rosa');
    
    growInitialGarden(); 
    gardenActive = true; 
  });

  document.body.addEventListener('click', () => {
    if (gardenActive) {
      createSingleFlower(); 
    }
  });
})();
