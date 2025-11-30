class MyDog extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
      <style>
       .dog img{
            /*background-color: #23232e;*/
            box-shadow: 0 10px 11px #23232e;
            border-radius: 10px;
            width: 500px;
            height: 300px;
        }      
      </style>
      <main>
        <div class="dog" id="dog"></div>
      </main>
    `;
    }
}
customElements.define('my-dog', MyDog);

class MyCat extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
      <style>
        .gato img{
            box-shadow: 0 10px 11px #23232e;
            border-radius: 10px;
            width: 500px;
            height: 300px;
        }  
      </style>
      <main>
        <div class="gato" id="gato"></div>
      </main>
    `;
    }
}
customElements.define('my-cat', MyCat);

class MyClima extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
      <style>
  :root {
            --bg-color: black;
            --text-color: white;
            --body-color: #999
        }

        .weather-card {
            margin: 0 auto;
            height: 2px;
            width: 35vw;
            display: flex;
            gap: 50px;
            font-size: 24px;
            /*flex-direction: column;*/
            justify-content: space-between;
            align-items: center;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 18px 15px;
            box-shadow: 2px 2px 16px black;
            border-radius: 8px;
            transition: 1s;
        }    
      </style>
      <main>
        <div class="weather-card" id="weather-card">
            <div id="weather-city" class="weather-city">Cidade</div>
            <img id="weather-image" class="weather-image" src=" " alt="Imagem do clima">
            <div id="weather-temperature" class="weather-temperature">0 ° C</div>            
        </div>
      </main>
    `;
    }
}
customElements.define('my-clima', MyClima);

//API - cachorro
async function loadDog() {
    try {
        const breedName = document.getElementById('dog')
        const url = 'https://dog.ceo/api/breeds/image/random'
        const response = await fetch(url)
                
        if (!response.ok) {
            throw new Error('Falha ao carregar imagem do cachorro');
        }
        
        const data = await response.json()

        const img = document.createElement('img')
        img.src = data.message
        breedName.appendChild(img)
    } catch (error) {
        console.error('Erro ao carregar cachorro:', error);
    }
}

//API - gato
async function loadGato() {
    try {
        const gato = document.getElementById('gato')
        const url = 'https://api.thecatapi.com/v1/images/search'

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Falha ao carregar imagem do gato');
        }

        const cats = await response.json()
        console.log(cats)

        cats.forEach(cat => {
            const img = document.createElement('img')
            img.src = cat.url
            gato.appendChild(img)
        })
    } catch (error) {
        console.error('Erro ao carregar gato:', error);
    }
}

//API - clima
function alterarCorFundo(temperatura) {
    let corFundo = '';

    if (temperatura <= 0) {
        corFundo = '#4A90E2';
    } else if (temperatura <= 20) {
        corFundo = '#7BB3FF';
    } else if (temperatura <= 30) {
        corFundo = '#FFD166';
    } else {
        corFundo = '#FF6B6B';
    }

    document.documentElement.style.setProperty('--bg-color', corFundo);
    document.documentElement.style.setProperty('--text-color', '#000');
}

async function pesquisarClima(cidade) {
    try {
        const key = '6529d94be4584b0ca5d125906252601';
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no`;
        const response = await fetch(url)
                
        if (!response.ok) {
            throw new Error('Falha ao carregar clima');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao pesquisar clima:', error);
    }
}

async function preencherClimaCidade(cidade) {
    try {
        const info = await pesquisarClima(cidade);
        if (!info) {
            throw new Error('Dados de clima não encontrados');
        }
        
        const cidadeNome = info.location.name;
        const temperatura = Math.floor(info.current.temp_c);
        const imagemClima = info.current.condition.icon;
        
        document.getElementById('weather-image').src = imagemClima;
        document.getElementById('weather-temperature').textContent = `${temperatura}° C`;
        document.getElementById('weather-city').textContent = cidadeNome;
        alterarCorFundo(temperatura);
    } catch (error) {
        console.error('Erro ao preencher clima da cidade:', error);
    }
}

async function carregarClimaAleatorio() {
    try {
        const cidades = ["Aracaju", "Belém", "Belo Horizonte", "Boa Vista", "Brasília", "Campo Grande", "Cuiabá", "Curitiba", "Florianópolis", "Fortaleza", "Goiânia", "João Pessoa", "Macapá", "Maceió", "Manaus", "Natal", "Palmas", "Porto Alegre", "Porto Velho", "Recife", "Rio Branco", "Rio de Janeiro", "Salvador", "São Luís", "São Paulo", "Teresina", "Vitória"];
        const cidadeAleatoria = cidades[Math.floor(Math.random() * cidades.length)];
        await preencherClimaCidade(cidadeAleatoria);
    } catch (error) {
        console.error('Erro ao carregar clima aleatório:', error);
    }
}

async function init() {    
    try {
        await Promise.all([
            loadDog(),          
            loadGato(),      
            carregarClimaAleatorio()  
        ]);
    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
}

window.onload = init;
