(function () {
  // ===================================================================
  //   Titulo do documento: Sistema de Carrossel de Imagens com Controles
  // ===================================================================
  // Objetivo: Implementar um carrossel de imagens funcional com botões
  //           de navegação (anterior/próximo) e indicadores (dots)
  //           que permitem a troca manual de slides.
  // Autor : Gisele Nunes
  // Data  : 2026
  // ===================================================================

  // Obtém o elemento HTML que contém todos os slides (container flex)
  const slidesContainer = document.getElementById('carrosselSlides');

  // Obtém todos os elementos individuais que representam cada slide
  const items = document.querySelectorAll('.carrossel-item');

  // Obtém o botão de navegação para o slide anterior
  const prevBtn = document.getElementById('btnPrev');

  // Obtém o botão de navegação para o próximo slide
  const nextBtn = document.getElementById('btnNext');

  // Obtém o container onde os indicadores (dots) serão inseridos
  const indicatorsContainer = document.getElementById('carrosselIndicadores');

  // Índice do slide que está sendo exibido no momento (começa no primeiro slide: índice 0)
  let currentIndex = 0;

  // Quantidade total de slides presentes no carrossel
  const totalSlides = items.length;

  // Função responsável por atualizar a posição do carrossel e os indicadores
  function updateCarrossel() {
    // Calcula o deslocamento (offset) baseado no índice atual
    // Multiplica por 100% para mover o container exatamente a largura de um slide
    const offset = -currentIndex * 100;

    // Aplica a transformação CSS translateX no eixo horizontal
    // Isso desloca o container dos slides para a esquerda/direita
    slidesContainer.style.transform = `translateX(${offset}%)`;

    // Atualiza os indicadores (dots) para refletir o slide ativo
    updateIndicators();
  }

  // Função que altera a classe visual dos indicadores (dots)
  // Adiciona a classe 'active' apenas ao dot correspondente ao slide atual
  function updateIndicators() {
    // Seleciona todos os elementos que possuem a classe 'dot'
    const dots = document.querySelectorAll('.dot');

    // Percorre cada dot (indicador) encontrado
    dots.forEach((dot, idx) => {
      // Verifica se o índice do dot é igual ao índice do slide atual
      if (idx === currentIndex) {
        // Adiciona a classe 'active' para destacar visualmente
        dot.classList.add('active');
      } else {
        // Remove a classe 'active' dos outros dots
        dot.classList.remove('active');
      }
    });
  }

  // Função que cria os indicadores (dots) dinamicamente no HTML
  function createIndicators() {
    // Verifica se o container dos indicadores existe na página
    // Se não existir, sai da função (evita erros)
    if (!indicatorsContainer) return;

    // Limpa o conteúdo interno do container para evitar duplicação
    indicatorsContainer.innerHTML = '';

    // Loop que percorre todos os slides disponíveis
    for (let i = 0; i < totalSlides; i++) {
      // Cria um novo elemento botão (será o dot/indicador)
      const dot = document.createElement('button');

      // Adiciona a classe CSS 'dot' ao botão criado
      dot.classList.add('dot');

      // Se o índice do dot for igual ao slide atual, adiciona a classe 'active'
      if (i === currentIndex) dot.classList.add('active');

      // Adiciona um evento de clique ao dot
      // Usamos uma IIFE (função autoexecutável) para capturar o valor correto do índice 'i'
      // Isso evita o problema clássico de closures em loops (todos os dots pegariam o último valor)
      dot.addEventListener('click', (function (index) {
        return function () {
          // Atualiza o índice atual para o índice do dot clicado
          currentIndex = index;
          // Move o carrossel para o slide correspondente
          updateCarrossel();
        };
      })(i));

      // Adiciona o dot criado ao container de indicadores
      indicatorsContainer.appendChild(dot);
    }
  }

  // Função que avança para o próximo slide
  function nextSlide() {
    // Incrementa o índice em 1
    // O operador % (módulo) garante que, ao chegar no último slide, volte para o primeiro (índice 0)
    // Exemplo: se totalSlides = 5 e currentIndex = 4, então (4+1)%5 = 0
    currentIndex = (currentIndex + 1) % totalSlides;

    // Atualiza a interface do carrossel com o novo índice
    updateCarrossel();
  }

  // Função que volta para o slide anterior
  function prevSlide() {
    // Decrementa o índice em 1
    // Adiciona totalSlides antes do módulo para garantir que o resultado nunca seja negativo
    // Exemplo: se totalSlides = 5 e currentIndex = 0, então (0-1+5)%5 = 4 (último slide)
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;

    // Atualiza a interface do carrossel com o novo índice
    updateCarrossel();
  }

  // Verifica se o botão "próximo" existe antes de adicionar o evento de clique
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Verifica se o botão "anterior" existe antes de adicionar o evento de clique
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Inicializa os indicadores (dots) pela primeira vez
  createIndicators();

  // Posiciona o carrossel no primeiro slide (índice 0)
  updateCarrossel();

  // ========== BOTÃO DE PROJETO FUTURO (funcionalidade extra) ==========
  // Tenta encontrar o botão com ID 'btnProjetoFuturo' na página
  const btnFuturo = document.getElementById('btnProjetoFuturo');

  // Se o botão existir, adiciona um evento de clique que exibe um alerta criativo
  if (btnFuturo) {
    btnFuturo.addEventListener('click', () => {
      alert('✨ Novos horizontes em construção — IDEIAS • CÓDIGO • SOLUÇÕES ✨');
    });
  }
})();

// ========== PÁGINA SOBRE GISELE NUNES ==========
// Esta IIFE (função imediatamente invocada) só será executada se estivermos na página da Gisele Nunes
// Ela calcula a idade automaticamente e trata fallback de imagem de avatar
(function () {
  // ===================================================================
  //   Titulo do documento: Cálculo Automático de Idade e Fallback de Avatar
  // ===================================================================
  // Objetivo: Calcular dinamicamente a idade da Gisele Nunes com base
  //           na data de nascimento (15/01/1990) e exibir no elemento
  //           HTML correspondente. Também fornece um fallback visual
  //           caso a imagem de avatar não seja carregada.
  // Autor : Gisele Nunes
  // Data  : 2026
  // ===================================================================

  // Verifica se estamos na página da Gisele Nunes
  // Procura o elemento com ID 'idadeGisele' (que só existe nessa página)
  const idadeSpan = document.getElementById('idadeGisele');

  // Se o elemento NÃO foi encontrado, sai da função imediatamente
  // Isso evita que o código seja executado em outras páginas onde não faz sentido
  if (!idadeSpan) return;

  // Função que calcula a idade atual com base na data de nascimento fornecida
  // Parâmetro: dataNascimento - string no formato 'YYYY-MM-DD' (ex: '1990-01-15')
  // Retorno: número inteiro representando a idade em anos
  function calcularIdade(dataNascimento) {
    // Obtém a data atual (hoje)
    const hoje = new Date();

    // Converte a string de nascimento para um objeto Date
    const nascimento = new Date(dataNascimento);

    // Calcula a diferença inicial de anos (apenas comparando os anos)
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    // Obtém o mês atual (0 = janeiro, 11 = dezembro)
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Verifica se o aniversário deste ano já aconteceu
    // Condição: se o mês atual for menor que o mês de nascimento
    //          OU se for o mesmo mês mas o dia atual é menor que o dia de nascimento
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      // Se ainda não fez aniversário este ano, subtrai 1 ano
      idade--;
    }

    // Retorna a idade calculada
    return idade;
  }

  // Calcula a idade da Gisele (nascida em 15 de janeiro de 1990)
  const idade = calcularIdade('1990-01-15');

  // Insere a idade calculada dentro do elemento HTML <span id="idadeGisele">
  // O template string `${idade} anos` garante que a palavra "anos" apareça junto
  idadeSpan.textContent = `${idade} anos`;

  // ========== FALLBACK PARA IMAGEM DE AVATAR ==========
  // Tenta encontrar a imagem de avatar na página (classe 'avatar-img')
  const avatarImg = document.querySelector('.avatar-img');

  // Se a imagem existir, configura um tratamento de erro
  if (avatarImg) {
    // Define o que acontece se a imagem não puder ser carregada (ex: URL quebrada)
    avatarImg.onerror = function () {
      // Esconde a imagem original (quebrada) do layout
      this.style.display = 'none';

      // Cria um elemento fallback (alternativo) com as iniciais 'GN'
      const fallback = document.createElement('div');

      // Adiciona a classe CSS 'avatar-fallback' (caso exista estilos definidos)
      fallback.className = 'avatar-fallback';

      // Define o texto interno como 'GN' (iniciais de Gisele Nunes)
      fallback.textContent = 'GN';

      // ========== APLICA ESTILOS INLINE PARA O FALLBACK ==========
      // Define largura de 150 pixels
      fallback.style.width = '150px';

      // Define altura de 150 pixels
      fallback.style.height = '150px';

      // Define bordas arredondadas (50% = círculo perfeito)
      fallback.style.borderRadius = '50%';

      // Define cor de fundo (azul médio/teal)
      fallback.style.background = '#1a8aaa';

      // Define o display como flex para centralizar o conteúdo
      fallback.style.display = 'flex';

      // Alinha os itens verticalmente ao centro
      fallback.style.alignItems = 'center';

      // Alinha os itens horizontalmente ao centro
      fallback.style.justifyContent = 'center';

      // Define o tamanho da fonte do texto 'GN'
      fallback.style.fontSize = '3rem';

      // Define o peso da fonte como negrito
      fallback.style.fontWeight = 'bold';

      // Define a cor do texto como branco
      fallback.style.color = 'white';

      // Adiciona uma borda sólida colorida ao redor do círculo
      fallback.style.border = '3px solid #2acce0';

      // Centraliza o elemento horizontalmente (útil se estiver dentro de um container)
      fallback.style.margin = '0 auto';

      // Insere o elemento fallback após a imagem original (no mesmo elemento pai)
      // parentNode é o container que envolve a imagem
      this.parentNode.appendChild(fallback);
    };
  }
})();
