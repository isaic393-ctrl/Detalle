(function() {
  const startBtn = document.getElementById('start-btn');
  const contentGarden = document.getElementById('content-garden');
  let gardenActive = false;
  
  let globalPositions = [];

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  // Permite conseguir posiciones repartidas a lo largo de TODA la pantalla (del 5% al 90% del ancho)
  function getSafeSafeHorizontalPos() {
    let intentos = 0;
    let posValida = false;
    let nuevaPos = 0;

    while (!posValida && intentos < 50) {
      nuevaPos = getRandomArbitrary(5, 90); // Rango ampliado para ocupar más pantalla
      posValida = true;
      intentos++;

      // Tolerancia de separación para evitar que se encimen demasiado
      for (let i = 0; i < globalPositions.length; i++) {
        if (nuevaPos > globalPositions[i] - 15 && nuevaPos < globalPositions[i] + 15) {
          posValida = false;
          break;
        }
      }
    }
    
    if (globalPositions.length > 6) {
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
      // Ajuste de tamaño equilibrado para abarcar el ancho móvil
      let dimCel = getRandomArbitrary(45, 65);
      flwr.style.width = `${dimCel}vw`;
      flwr.style.height = `${dimCel}vw`;
      flwr.style.zIndex = Math.round(100 - dimCel);
    } else {
      // Ajuste de tamaño en PC para que no salgan gigantescos y llenen armónicamente la pantalla
      let dimPC = getRandomArbitrary(35, 50);
      flwr.style.width = `${dimPC}vmin`;
      flwr.style.height = `${dimPC}vmin`;
      flwr.style.zIndex = Math.round(100 - dimPC);
    }
    
    flwr.style.filter = `saturate(${getRandomArbitrary(95, 100)}%) brightness(${getRandomArbitrary(95, 115)}%)`;
    document.body.appendChild(flwr);
  };

  const growInitialGarden = () => {
    // CORREGIDO: Coordenadas iniciales bien distribuidas de izquierda a derecha (10%, 35%, 60%, 85%)
    let initialPositions = [10, 35, 60, 85]; 
    
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
