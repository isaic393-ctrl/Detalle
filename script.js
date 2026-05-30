(function() {
  const startBtn = document.getElementById('start-btn');
  const contentGarden = document.getElementById('content-garden');
  let gardenActive = false;
  
  // Guardaremos las posiciones ocupadas para evitar amontonamientos
  let globalPositions = [];

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  // Genera una posición horizontal cuidando que no esté cerca de otra
  function getSafeSafeHorizontalPos() {
    let intentos = 0;
    let posValida = false;
    let nuevaPos = 0;

    while (!posValida && intentos < 50) {
      nuevaPos = getRandomArbitrary(8, 82); // Ajustado para que no se corten en bordes
      posValida = true;
      intentos++;

      // Revisa que esté lejos de CUALQUIER flor ya existente en pantalla
      for (let i = 0; i < globalPositions.length; i++) {
        if (nuevaPos > globalPositions[i] - 18 && nuevaPos < globalPositions[i] + 18) {
          posValida = false; // Muy cerca, rechazada
          break;
        }
      }
    }
    
    // Si la pantalla ya está muy llena, limpia el historial para permitir clics infinitos
    if (globalPositions.length > 6) {
      globalPositions.shift(); 
    }

    globalPositions.push(nuevaPos);
    return nuevaPos;
  }

  const createSingleFlower = (forcedLeft = null) => {
    let flwr = document.createElement('div');
    
    // Girasoles un poco más estilizados y menos gigantescos para evitar colisiones visuales
    let dim = getRandomArbitrary(40, 65); 
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
    flwr.style.height = `${dim}vmin`;
    flwr.style.width = `${dim}vmin`;
    flwr.style.zIndex = Math.round(100 - dim);
    flwr.style.filter = `saturate(${getRandomArbitrary(90, 100)}%) brightness(${getRandomArbitrary(95, 120)}%)`;
    document.body.appendChild(flwr);
  };

  // Genera las primeras 4 flores bien espaciadas en la primera tanda
  const growInitialGarden = () => {
    // Posiciones balanceadas fijas a lo ancho de la pantalla para el arranque perfecto
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

  // Acción del botón principal
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
    startBtn.classList.add('hidden'); 
    contentGarden.classList.remove('hidden'); 
    
    document.body.classList.remove('inicio-negro');
    document.body.classList.add('jardin-rosa');
    
    growInitialGarden(); 
    gardenActive = true; 
  });

  // Toques infinitos en la pantalla
  document.body.addEventListener('click', () => {
    if (gardenActive) {
      createSingleFlower(); 
    }
  });
})();
