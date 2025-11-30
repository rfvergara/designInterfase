class MyHeader extends HTMLElement {
  constructor() {
    super(); 
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <style>
        header{
        position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px; /* Ajuste a altura do header */
            background-color: #4CAF50;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            z-index: 1000;
          }
    </style>
      <header>
        <h1>
          ${this.getAttribute('titulo') || 'Página Inicial'}
        </h1>
      </header>
    `;
  }
}
customElements.define('my-header', MyHeader);

class MyNav extends HTMLElement{
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <style>       
         nav {
            position: fixed;
            display: flex;
            gap: 30px;
            top: 60px; /* Logo abaixo do header */
            left: 0;
            width: 100%;
            height: 50px; /* Ajuste a altura do nav */
            background-color: #333;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999; /* Um nível abaixo do header */
        }

        nav a {
          display: block;
          padding: 10px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          transition: 0.3s;    
        }

        nav a:hover {
          background-color: #fff;
          color: #23232e;
          border-radius: 5px;
        }
    </style>
    <nav>
        <a href="index01.html">Pesquisa país!</a>
        <a href="index02.html">Dogs vs Cats</a>
    </nav>
    `;
  } 
 }
customElements.define('my-nav', MyNav);


class MyFooter extends HTMLElement {
  
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <style>
         footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px; /* Ajuste a altura do footer */
            background-color: #4CAF50;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            z-index: 999          
          }
    </style>
    <footer>
        <p>
          &copy; ${this.getAttribute('mensagem') || '2025 Meu Site'}
        </p>
      </footer>
    `;    
  }
}      
customElements.define('my-footer', MyFooter);