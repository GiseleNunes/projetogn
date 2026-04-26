// ===================================================================
//   Titulo do documento: Sistema de Carrossel de Imagens e Funcionalidades da Página Sobre
// ===================================================================
// Objetivo: Implementar um carrossel de imagens funcional com botões
//           de navegação (anterior/próximo) e indicadores (dots)
//           que permitem a troca manual de slides, além de gerenciar
//           as funcionalidades da página sobre (cálculo de idade,
//           botões de copiar, fallback de imagens, etc.)
//           O carrossel exibe 2 cards por vez em desktop/tablet,
//           1 card em mobile, com rolagem um a um.
// Autor : Gisele Nunes
// Data  : 2026
// ===================================================================

(function () {
  // ===================================================================
  //   PARTE 1: SISTEMA DE CARROSSEL - ROLAGEM UM A UM
  // ===================================================================

  // Obtém o elemento HTML que contém todos os slides (container flex)
  const slidesContainer = document.getElementById('carrosselSlides');

  // Obtém todos os elementos individuais que representam cada slide (card)
  const items = document.querySelectorAll('.carrossel-item');

  // Obtém o botão de navegação para o slide anterior
  const prevBtn = document.getElementById('btnPrev');

  // Obtém o botão de navegação para o próximo slide
  const nextBtn = document.getElementById('btnNext');

  // Obtém o container onde os indicadores (dots) serão inseridos
  const indicatorsContainer = document.getElementById('carrosselIndicadores');

  // Índice do primeiro slide visível (começa no primeiro slide: índice 0)
  let currentIndex = 0;

  // Quantidade total de slides presentes no carrossel
  const totalSlides = items.length;

  // Número de cards visíveis por vez (ajustado dinamicamente com base na largura)
  let cardsPerView = getCardsPerView();

  // Função para determinar quantos cards exibir por vez com base na largura da tela
  function getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 651) {
      return 2; // Desktop e tablet: 2 cards
    } else {
      return 1; // Mobile: 1 card
    }
  }

  // Número total de "páginas" no carrossel
  let totalPages = Math.ceil(totalSlides / cardsPerView);

  // Função que atualiza a largura de cada item com base nos cards por vez
  function updateItemWidth() {
    if (!slidesContainer) return;

    // Calcula a largura baseada no número de cards por vez
    const gap = 1.5; // gap em rem
    const gapPx = gap * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const containerWidth = slidesContainer.parentElement.clientWidth;

    items.forEach(item => {
      if (cardsPerView === 2) {
        // Para 2 cards: (100% - gap) / 2
        item.style.width = `calc((100% - ${gap}rem) / 2)`;
      } else {
        // Para 1 card: 100%
        item.style.width = `calc(100% - 0rem)`;
      }
    });
  }

  // Função responsável por atualizar a posição do carrossel e os indicadores
  function updateCarrossel() {
    if (!slidesContainer) return;

    // Recalcula total de páginas
    totalPages = Math.ceil(totalSlides / cardsPerView);

    // Garante que currentIndex esteja dentro dos limites
    if (currentIndex >= totalPages) {
      currentIndex = totalPages - 1;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    // Calcula o deslocamento baseado no índice atual
    // Cada "página" equivale a 100% da largura visível do container
    const offset = -currentIndex * 100;

    // Aplica a transformação CSS translateX no eixo horizontal
    slidesContainer.style.transform = `translateX(${offset}%)`;

    // Atualiza os indicadores (dots)
    updateIndicators();
  }

  // Função que altera a classe visual dos indicadores (dots)
  function updateIndicators() {
    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Função que cria os indicadores (dots) dinamicamente no HTML
  function createIndicators() {
    if (!indicatorsContainer || totalPages === 0) return;

    // Limpa o conteúdo interno do container
    indicatorsContainer.innerHTML = '';

    // Cria um dot para cada página disponível
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');

      // Adiciona evento de clique para navegar diretamente para a página
      dot.addEventListener('click', (function (index) {
        return function () {
          currentIndex = index;
          updateCarrossel();
        };
      })(i));

      indicatorsContainer.appendChild(dot);
    }
  }

  // Função que avança para o próximo conjunto de cards (um a um)
  function nextSlide() {
    if (totalPages === 0) return;
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      updateCarrossel();
    }
  }

  // Função que volta para o conjunto anterior de cards (um a um)
  function prevSlide() {
    if (totalPages === 0) return;
    if (currentIndex > 0) {
      currentIndex--;
      updateCarrossel();
    }
  }

  // Função para reconfigurar o carrossel em caso de redimensionamento
  function reconfigureCarrossel() {
    const newCardsPerView = getCardsPerView();

    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      totalPages = Math.ceil(totalSlides / cardsPerView);

      // Ajusta o índice atual se necessário
      if (currentIndex >= totalPages) {
        currentIndex = totalPages - 1;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }

      updateItemWidth();
      createIndicators();
      updateCarrossel();
    } else {
      updateItemWidth();
      updateCarrossel();
    }
  }

  // Configura os event listeners apenas se os elementos existirem
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Adiciona suporte para teclas de navegação (setas do teclado)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Adiciona listener para redimensionamento da tela
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(reconfigureCarrossel, 250);
  });

  // Inicializa o carrossel apenas se houver slides
  if (totalSlides > 0) {
    cardsPerView = getCardsPerView();
    totalPages = Math.ceil(totalSlides / cardsPerView);
    updateItemWidth();
    createIndicators();
    updateCarrossel();
  }

  // ========== BOTÃO DE PROJETO FUTURO ==========
  const btnFuturo = document.getElementById('btnProjetoFuturo');

  if (btnFuturo) {
    btnFuturo.addEventListener('click', () => {
      alert('✨ Novos horizontes em construção — IDEIAS • CÓDIGO • SOLUÇÕES ✨');
    });
  }
})();

// ===================================================================
//   PARTE 2: PÁGINA SOBRE GISELE NUNES
// ===================================================================
(function () {
  // ===================================================================
  //   Cálculo Automático de Idade e Funcionalidade Copiar
  // ===================================================================

  // ========== CÁLCULO DE IDADE ==========
  const idadeSpan = document.getElementById('idadeDinamica');

  if (idadeSpan) {
    function calcularIdade(dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();
      const diaAtual = hoje.getDate();
      const diaNascimento = nascimento.getDate();

      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
      }
      return idade;
    }

    const idade = calcularIdade('1992-04-10');
    idadeSpan.innerHTML = `● ${idade} anos • Apaixonada por dados e educação`;
  }

  // ========== FUNCIONALIDADE DE COPIAR TEXTO ==========
  const botoesCopiar = document.querySelectorAll('.btn-copiar');

  botoesCopiar.forEach(botao => {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-copiar');

      if (targetId) {
        const textoElement = document.getElementById(targetId);

        if (textoElement) {
          const texto = textoElement.innerText.trim();

          navigator.clipboard.writeText(texto).then(() => {
            const textoOriginal = this.innerText;
            this.innerText = '✓ Copiado!';

            setTimeout(() => {
              this.innerText = textoOriginal;
            }, 1500);
          }).catch(err => {
            console.warn('Erro ao copiar: ', err);
            alert('Não foi possível copiar automaticamente. Selecione o texto manualmente.');
          });
        }
      }
    });
  });

  // ========== FALLBACK PARA IMAGEM DE AVATAR ==========
  const avatarImg = document.querySelector('.avatar-img');

  if (avatarImg) {
    if (avatarImg.complete && avatarImg.naturalWidth === 0) {
      aplicarFallbackAvatar(avatarImg);
    } else {
      avatarImg.addEventListener('error', function () {
        aplicarFallbackAvatar(this);
      });
    }
  }

  function aplicarFallbackAvatar(imgElement) {
    imgElement.style.display = 'none';

    const fallback = document.createElement('div');
    fallback.className = 'avatar-fallback';
    fallback.textContent = 'GN';
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

    imgElement.parentNode.appendChild(fallback);
  }

  // ========== FALLBACK PARA LOGOS DAS INSTITUIÇÕES ==========
  const logosInstituicao = document.querySelectorAll('.logo-instituicao');

  logosInstituicao.forEach(logo => {
    const aplicarFallbackBranco = (imgElement) => {
      if (imgElement.src && imgElement.src.includes('placehold.co')) return;
      const cursoNome = imgElement.alt || 'Instituição';
      imgElement.src = `https://placehold.co/110x90?text=${encodeURIComponent(cursoNome)}&bg=ffffff&textColor=0a4b5e`;
      imgElement.onerror = null;
      imgElement.style.background = '#ffffff';
      imgElement.style.backdropFilter = 'none';
      imgElement.classList.add('fallback-logo');
    };

    if (logo.complete && logo.naturalWidth === 0) {
      aplicarFallbackBranco(logo);
    } else {
      logo.addEventListener('error', function () {
        aplicarFallbackBranco(this);
      });
    }

    logo.style.background = '#ffffff';
    logo.style.backdropFilter = 'none';
  });

  // ========== BOTÃO DE VOLTAR (PARA PÁGINA INICIAL) ==========
  const btnVoltar = document.querySelector('.btn-voltar');

  if (btnVoltar) {
    btnVoltar.addEventListener('click', function (e) {
      if (window.location.pathname.includes('bio.html')) {
        e.preventDefault();
        window.location.href = '../index.html';
      }
    });
  }

})();