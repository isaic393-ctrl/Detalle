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
      nuevaPos = getRandomArbitrary(8, 80);
      posValida = true;
      intentos++;

      for (let i = 0; i < globalPositions.length; i++) {
        if (nuevaPos > globalPositions[i] - 22 && nuevaPos < globalPositions[i] + 22) {
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
    
    // Decidir aleatoriamente si sale de arriba o de abajo
    let esArriba = Math.random() > 0.5;
    if (esArriba) {
      flwr.classList.add('sunflwr--top');
    }

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
      let dimCel = getRandomArbitrary(65, 90);
      flwr.style.width = `${dimCel}vw`;
      flwr.style.height = `${dimCel}vw`;
      flwr.style.zIndex = Math.round(100 - dimCel);
    } else {
      let dimPC = getRandomArbitrary(45, 70);
      flwr.style.width = `${dimPC}vmin`;
      flwr.style.height = `${dimPC}vmin`;
      flwr.style.zIndex = Math.round(100 - dimPC);
    }
    
    flwr.style.filter = `saturate(${getRandomArbitrary(95, 100)}%) brightness(${getRandomArbitrary(95, 115)}%)`;
    document.body.appendChild(flwr);
  };

  const growInitialGarden = () => {
    let initialPositions = [12, 35, 58, 80]; 
    
    initialPositions.forEach((pos) => {
      globalPositions.push(pos);
    });

    initialPositions.forEach((pos, index) => {
      setTimeout(() => {
        createSingleFlower(pos);
      }, index * 250); 
    });
  };

  // Ajustado para asegurar que responda al clic en cualquier pantalla
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
