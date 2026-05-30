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
    let leftPos = forcedLeft !== null ? forcedLeft : getSafeSafeHorizontalPos();
    
    // Configuración de tamaño común para ambas flores
    let esCelular = window.innerWidth <= 600;
    let dim = 0;
    if (esCelular) {
      dim = getRandomArbitrary(65, 90);
    } else {
      dim = getRandomArbitrary(45, 70);
    }
    let zIndex = Math.round(100 - dim);
    let filtro = `saturate(${getRandomArbitrary(95, 100)}%) brightness(${getRandomArbitrary(95, 115)}%)`;

    // 🌻 1. FLOR DE ABAJO (La original)
    let flwrBottom = document.createElement('div');
    flwrBottom.classList.add('sunflwr');
    flwrBottom.style.left = `${leftPos}vw`;
    flwrBottom.style.width = esCelular ? `${dim}vw` : `${dim}vmin`;
    flwrBottom.style.height = esCelular ? `${dim}vw` : `${dim}vmin`;
    flwrBottom.style.zIndex = zIndex;
    flwrBottom.style.filter = filtro;
    
    // Contenido de pétalos (se mantiene igual)
    const petalHTML = `<div class="sunflwr__leaf--left"></div>
                      <div class="sunflwr__leaf--right"></div>
                      <div class="sunflwr__stem"></div>
                      <div class="sunflwr__center"></div>
                      <div class="sunflwr__petal--1"></div>
                      <div class="sunflwr__petal--2"></div>
                      <div class="sunflwr__petal--3"></div>
                      <div class="sunflwr__petal--4"></div>
                      <div class="sunflwr__petal--5"></div>
                      <div class="sunflwr__petal--6"></div>
                      <div class="sunflwr__petal--7"></div>
                      <div class="sunflwr__petal--8"></div>
                      <div class="sunflwr__petal--9"></div>
                      <div class="sunflwr__petal--10"></div>
                      <div class="sunflwr__petal--11"></div>
                      <div class="sunflwr__petal--12"></div>`;
                      
    flwrBottom.innerHTML = petalHTML;
    document.body.appendChild(flwrBottom);

    // 🌻 2. FLOR DE ARRIBA (La nueva gemela)
    let flwrTop = document.createElement('div');
    flwrTop.classList.add('sunflwr', 'sunflwr--top'); // 👈 Añadimos la clase espejo
    flwrTop.style.left = `${leftPos}vw`;
    flwrTop.style.width = esCelular ? `${dim}vw` : `${dim}vmin`;
    flwrTop.style.height = esCelular ? `${dim}vw` : `${dim}vmin`;
    flwrTop.style.zIndex = zIndex;
    flwrTop.style.filter = filtro;
    flwrTop.innerHTML = petalHTML;
    document.body.appendChild(flwrTop);
  };

    
    // 📊 ALTURA MÁXIMA EN CELULARES TOTALMENTE INCREMENTADA
    let esCelular = window.innerWidth <= 600;
    
    if (esCelular) {
      // En celular usamos un rango mucho más alto y variado (de 65% a 90% del ancho de pantalla)
      let dimCel = getRandomArbitrary(65, 90);
      flwr.style.width = `${dimCel}vw`;
      flwr.style.height = `${dimCel}vw`;
      flwr.style.zIndex = Math.round(100 - dimCel);
    } else {
      // En computadoras se mantiene el rango estético previo
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
