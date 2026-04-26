// ===================================================================
//   Titulo do documento: Sistema de Carrossel de Imagens e Funcionalidades da Página Sobre
// ===================================================================
// Objetivo: Implementar um carrossel de imagens funcional com botões
//           de navegação (anterior/próximo) e indicadores (dots)
//           que permitem a troca manual de slides, além de gerenciar
//           as funcionalidades da página sobre (cálculo de idade,
//           botões de copiar, fallback de imagens, etc.)
// Autor : Gisele Nunes
// Data  : 2026
// ===================================================================

(function () {
  // ===================================================================
  //   PARTE 1: SISTEMA DE CARROSSEL
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
    if (!slidesContainer) return;
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
    if (!indicatorsContainer || totalSlides === 0) return;

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
    if (totalSlides === 0) return;
    // Incrementa o índice em 1
    // O operador % (módulo) garante que, ao chegar no último slide, volte para o primeiro (índice 0)
    // Exemplo: se totalSlides = 5 e currentIndex = 4, então (4+1)%5 = 0
    currentIndex = (currentIndex + 1) % totalSlides;

    // Atualiza a interface do carrossel com o novo índice
    updateCarrossel();
  }

  // Função que volta para o slide anterior
  function prevSlide() {
    if (totalSlides === 0) return;
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

  // Inicializa os indicadores (dots) pela primeira vez (apenas se houver slides)
  if (totalSlides > 0) {
    createIndicators();
    // Posiciona o carrossel no primeiro slide (índice 0)
    updateCarrossel();
  }

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

// ===================================================================
//   PARTE 2: PÁGINA SOBRE GISELE NUNES
// ===================================================================
// Esta IIFE (função imediatamente invocada) gerencia a página sobre
(function () {
  // ===================================================================
  //   Cálculo Automático de Idade e Funcionalidade Copiar
  // ===================================================================
  // Objetivo: Calcular dinamicamente a idade da Gisele Nunes com base
  //           na data de nascimento (10/04/1992) e exibir no elemento
  //           HTML correspondente. Também fornece funcionalidade de copiar
  //           texto para os botões de contato e fallback para imagens.
  // ===================================================================

  // ========== CÁLCULO DE IDADE ==========
  // Verifica se estamos na página da Gisele Nunes
  // Procura o elemento com ID 'idadeDinamica' (que só existe nessa página)
  const idadeSpan = document.getElementById('idadeDinamica');

  // Se o elemento NÃO foi encontrado, não executa o cálculo de idade nesta página
  if (idadeSpan) {
    // Função que calcula a idade atual com base na data de nascimento fornecida
    // Parâmetro: dataNascimento - string no formato 'YYYY-MM-DD' (ex: '1992-04-10')
    // Retorno: número inteiro representando a idade em anos
    function calcularIdade(dataNascimento) {
      // Obtém a data atual (hoje)
      const hoje = new Date();

      // Converte a string de nascimento para um objeto Date
      const nascimento = new Date(dataNascimento);

      // Calcula a diferença inicial de anos (apenas comparando os anos)
      let idade = hoje.getFullYear() - nascimento.getFullYear();

      // Obtém o mês atual (0 = janeiro, 11 = dezembro)
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();

      // Obtém o dia atual
      const diaAtual = hoje.getDate();
      const diaNascimento = nascimento.getDate();

      // Verifica se o aniversário deste ano já aconteceu
      // Condição: se o mês atual for menor que o mês de nascimento
      //          OU se for o mesmo mês mas o dia atual é menor que o dia de nascimento
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        // Se ainda não fez aniversário este ano, subtrai 1 ano
        idade--;
      }

      // Retorna a idade calculada
      return idade;
    }

    // Calcula a idade da Gisele (nascida em 10 de abril de 1992)
    const idade = calcularIdade('1992-04-10');

    // Insere a idade calculada dentro do elemento HTML <div id="idadeDinamica">
    idadeSpan.innerHTML = `● ${idade} anos • Apaixonada por dados e educação`;
  }

  // ========== FUNCIONALIDADE DE COPIAR TEXTO ==========
  // Seleciona todos os botões com a classe 'btn-copiar'
  const botoesCopiar = document.querySelectorAll('.btn-copiar');

  botoesCopiar.forEach(botao => {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      // Obtém o ID do elemento que contém o texto a ser copiado
      const targetId = this.getAttribute('data-copiar');

      if (targetId) {
        // Obtém o elemento de texto pelo ID
        const textoElement = document.getElementById(targetId);

        if (textoElement) {
          // Obtém o texto do elemento
          const texto = textoElement.innerText.trim();

          // Usa a API Clipboard para copiar o texto
          navigator.clipboard.writeText(texto).then(() => {
            // Feedback visual: muda o texto do botão temporariamente
            const textoOriginal = this.innerText;
            this.innerText = '✓ Copiado!';

            // Restaura o texto original após 1.5 segundos
            setTimeout(() => {
              this.innerText = textoOriginal;
            }, 1500);
          }).catch(err => {
            console.warn('Erro ao copiar: ', err);
            // Fallback para navegadores antigos
            alert('Não foi possível copiar automaticamente. Selecione o texto manualmente.');
          });
        }
      }
    });
  });

  // ========== FALLBACK PARA IMAGEM DE AVATAR ==========
  // Tenta encontrar a imagem de avatar na página (classe 'avatar-img')
  const avatarImg = document.querySelector('.avatar-img');

  // Se a imagem existir, configura um tratamento de erro
  if (avatarImg) {
    // Verifica se a imagem já falhou ao carregar
    if (avatarImg.complete && avatarImg.naturalWidth === 0) {
      aplicarFallbackAvatar(avatarImg);
    } else {
      avatarImg.addEventListener('error', function () {
        aplicarFallbackAvatar(this);
      });
    }
  }

  function aplicarFallbackAvatar(imgElement) {
    // Esconde a imagem original (quebrada) do layout
    imgElement.style.display = 'none';

    // Cria um elemento fallback (alternativo) com as iniciais 'GN'
    const fallback = document.createElement('div');

    // Adiciona a classe CSS 'avatar-fallback'
    fallback.className = 'avatar-fallback';

    // Define o texto interno como 'GN' (iniciais de Gisele Nunes)
    fallback.textContent = 'GN';

    // A classe CSS já contém os estilos, mas aplicamos inline como garantia
    fallback.style.width = '180px';
    fallback.style.height = '180px';
    fallback.style.borderRadius = '50%';
    fallback.style.background = 'linear-gradient(135deg, #1a8aaa, #0e6e8a)';
    fallback.style.display = 'flex';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.style.fontSize = '3rem';
    fallback.style.fontWeight = 'bold';
    fallback.style.color = 'white';
    fallback.style.border = '3px solid #2acce0';

    // Insere o elemento fallback no mesmo container pai da imagem
    imgElement.parentNode.appendChild(fallback);
  }

  // ========== FALLBACK PARA LOGOS DAS INSTITUIÇÕES ==========
  // Para as logos das instituições: garantir fundo BRANCO mesmo nos fallbacks
  const logosInstituicao = document.querySelectorAll('.logo-instituicao');

  logosInstituicao.forEach(logo => {
    // Função para garantir que o fallback mantenha o fundo branco
    const aplicarFallbackBranco = (imgElement) => {
      if (imgElement.src && imgElement.src.includes('placehold.co')) return;
      const cursoNome = imgElement.alt || 'Instituição';
      imgElement.src = `https://placehold.co/110x90?text=${encodeURIComponent(cursoNome)}&bg=ffffff&textColor=0a4b5e`;
      imgElement.onerror = null;
      // Garante estilo de fundo branco mesmo após fallback
      imgElement.style.background = '#ffffff';
      imgElement.style.backdropFilter = 'none';
      imgElement.classList.add('fallback-logo');
    };

    // Verifica se a imagem já falhou ao carregar
    if (logo.complete && logo.naturalWidth === 0) {
      aplicarFallbackBranco(logo);
    } else {
      logo.addEventListener('error', function () {
        aplicarFallbackBranco(this);
      });
    }

    // Garantia inline para fundo branco (reforço visual)
    logo.style.background = '#ffffff';
    logo.style.backdropFilter = 'none';
  });

})();

