//página 01
class MyMain01 extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = `
      <style>
        .country{
          margin: 40px auto;
          width: 400px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 10px  #23232e;
          border-radius: 10px;
        }

        .country_input {
          width: 100%;
          padding-bottom: 8px;  
          border: none;
          border-bottom: 4px solid  #23232e;
          outline: none;
          font-size: 16px;
        }

        .country_flag {
          width: 50%;
          heigth: 50%
        }

        .country_name {
          font-size: 32px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .country_capital {
          font-size: 24px;
          font-weight: 200;
          color:#999;
        }
      </style>
      <main>
        <div class="country">
          <input type="text" id="country-input" class="country_input" placeholder="Digite o nome de um país"> 
          <img id="country-flag" class="country_flag" src="./js.png" alt="Bandeira do país">
          <h2 id="country-name" class="country_name">Java Script</h2>
          <p id="country-capital" class="country_capital">Front-End</p>
        </div>
      </main>
    `;
  }
}
customElements.define('my-main01', MyMain01);

function exibirDadosPais(infoPais) {
  console.log(infoPais)
  document.getElementById('country-flag').src = infoPais.flags.png
  document.getElementById('country-name').textContent = infoPais.name.common
  document.getElementById('country-capital').textContent = infoPais.capital[0]
}

async function obterPais(pais) {
  try {
    const url = `https://restcountries.com/v3.1/name/${pais}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Falha ao buscar dados do país: ${pais}`);
    }

    const data = await response.json()
    return data[0]
  } catch (error) {
    console.error('Erro ao obter dados do país:', error);
  }
}

document
  .getElementById('country-input')
  .addEventListener('keydown', async (evento) => {
    if (evento.key == 'Enter') {
      try {
        const infoPais = await obterPais(evento.target.value)

        if (!infoPais) {
          throw new Error('País não encontrado');
        }

        exibirDadosPais(infoPais)
      } catch (error) {
        console.error('Erro ao processar a pesquisa do país:', error);
      }
    }
  })