// ===================================================================
//   Titulo do documento: Sistema de Carrossel de Imagens e Funcionalidades da Página Sobre
// ===================================================================
// Objetivo: Implementar um carrossel de imagens funcional com botões
//           de navegação (anterior/próximo) e indicadores (dots)
//           que permitem a troca manual de slides, além de gerenciar
//           as funcionalidades da página sobre (cálculo de idade,
//           botões de copiar, fallback de imagens, etc.)
//           
//           🆕 VERSÃO CARROSSEL ATUALIZADA: Sistema de scroll suave
//           com navegação por setas, dots clicáveis e suporte a teclado
//           (totalmente compatível com o estilo do projetosrb)
//           
// Autor : Gisele Nunes
// Data  : 2026 (Atualizado com sistema de carrossel estilo projetosrb)
// ===================================================================

// IIFE (Immediately Invoked Function Expression) para isolar o escopo
(function () {
  // ============================================================
  // FUNCIONALIDADES DO PORTFÓLIO PRINCIPAL (index.html)
  // ============================================================

  // 1. Obtém o elemento do botão "Projeto Futuro" pelo seu ID
  const btnFuture = document.getElementById('btnProjetoFuturo');

  // Verifica se o botão existe na página
  if (btnFuture) {
    // Adiciona um listener para o evento de clique no botão
    btnFuture.addEventListener('click', (e) => {
      e.preventDefault();
      alert('✨ Novos horizontes em construção — IDEIAS • CÓDIGO • SOLUÇÕES ✨');
    });
  }

  // 2. Seleciona todos os links externos que abrem em nova aba
  const externalLinks = document.querySelectorAll('.btn-projeto[target="_blank"]');

  // Para cada link encontrado, aplica configurações de segurança
  externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // ============================================================
  // 🆕 FUNCIONALIDADES DO CARROSSEL (SISTEMA DE SCROLL SUAVE)
  // ============================================================

  // Verifica se os elementos do carrossel existem na página
  const carrosselSlides = document.getElementById('carrosselSlides');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const indicadoresContainer = document.getElementById('carrosselIndicadores');

  // Só executa a lógica do carrossel se os elementos existirem
  if (carrosselSlides && btnPrev && btnNext && indicadoresContainer) {

    // Obtém todos os slides (itens do carrossel)
    const slides = document.querySelectorAll('.carrossel-item');
    const totalSlides = slides.length;

    // Variável para controlar o índice atual
    let currentIndex = 0;

    // Flag para evitar múltiplos scrolls simultâneos
    let isScrolling = false;

    /**
     * Função: atualizarIndicadores
     * Descrição: Atualiza a classe 'ativo' nos indicadores (dots)
     *            baseado no slide que está visível no momento
     */
    function atualizarIndicadores() {
      // Calcula qual slide está mais visível baseado na posição de scroll
      const scrollLeft = carrosselSlides.scrollLeft;
      const slideWidth = slides[0]?.offsetWidth || 0;
      const gap = 32; // Gap entre os slides (2rem = 32px)
      const slideTotalWidth = slideWidth + gap;

      // Calcula o índice aproximado baseado no scroll
      let newIndex = Math.round(scrollLeft / slideTotalWidth);

      // Garante que o índice esteja dentro dos limites
      newIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));

      // Atualiza o índice atual
      currentIndex = newIndex;

      // Remove a classe 'ativo' de todos os indicadores e adiciona ao atual
      document.querySelectorAll('.indicador').forEach((indicador, idx) => {
        if (idx === currentIndex) {
          indicador.classList.add('ativo');
        } else {
          indicador.classList.remove('ativo');
        }
      });
    }

    /**
     * Função: scrollParaSlide
     * Parâmetro: index (número do slide desejado)
     * Descrição: Rola o carrossel suavemente até o slide especificado
     */
    function scrollParaSlide(index) {
      // Impede execução durante scroll em andamento
      if (isScrolling) return;

      // Garante que o índice esteja dentro dos limites válidos
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;

      // Calcula a posição de scroll baseada na largura do slide + gap
      const slideWidth = slides[0]?.offsetWidth || 0;
      const gap = 32;
      const scrollPosition = index * (slideWidth + gap);

      // Marca que está em scroll
      isScrolling = true;

      // Realiza o scroll suave
      carrosselSlides.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      // Atualiza o índice atual
      currentIndex = index;

      // Após o scroll, reativa a flag
      setTimeout(() => {
        isScrolling = false;
        atualizarIndicadores();
      }, 500);
    }

    /**
     * Função: slideAnterior
     * Descrição: Navega para o slide anterior
     */
    function slideAnterior() {
      if (currentIndex > 0) {
        scrollParaSlide(currentIndex - 1);
      } else {
        // Efeito visual para indicar que está no primeiro slide
        carrosselSlides.style.transform = 'translateX(5px)';
        setTimeout(() => {
          carrosselSlides.style.transform = '';
        }, 200);
      }
    }

    /**
     * Função: proximoSlide
     * Descrição: Navega para o próximo slide
     */
    function proximoSlide() {
      if (currentIndex < totalSlides - 1) {
        scrollParaSlide(currentIndex + 1);
      } else {
        // Efeito visual para indicar que está no último slide
        carrosselSlides.style.transform = 'translateX(-5px)';
        setTimeout(() => {
          carrosselSlides.style.transform = '';
        }, 200);
      }
    }

    /**
     * Função: criarIndicadores
     * Descrição: Cria os indicadores (dots) dinamicamente baseado no número de slides
     */
    function criarIndicadores() {
      // Limpa o container de indicadores
      indicadoresContainer.innerHTML = '';

      // Cria um indicador para cada slide
      for (let i = 0; i < totalSlides; i++) {
        const indicador = document.createElement('div');
        indicador.classList.add('indicador');
        // Adiciona evento de clique para navegar diretamente ao slide correspondente
        indicador.addEventListener('click', () => {
          scrollParaSlide(i);
        });
        indicadoresContainer.appendChild(indicador);
      }

      // Marca o primeiro indicador como ativo
      if (totalSlides > 0) {
        document.querySelectorAll('.indicador')[0]?.classList.add('ativo');
      }
    }

    /**
     * Função: debounce
     * Descrição: Limita a taxa de execução de uma função
     */
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Cria os indicadores ao carregar a página
    criarIndicadores();

    // Adiciona os listeners de eventos para os botões de navegação
    btnPrev.addEventListener('click', slideAnterior);
    btnNext.addEventListener('click', proximoSlide);

    // Adiciona listener para o evento de scroll no carrossel
    carrosselSlides.addEventListener('scroll', debounce(() => {
      atualizarIndicadores();
    }, 100));

    // Adiciona listener para redimensionamento da janela
    window.addEventListener('resize', debounce(() => {
      atualizarIndicadores();
    }, 200));

    // Suporte a teclado para acessibilidade
    document.addEventListener('keydown', (e) => {
      const carrosselContainer = document.querySelector('.carrossel-container');
      if (carrosselContainer && carrosselContainer.offsetParent !== null) {
        if (e.key === 'ArrowLeft') {
          slideAnterior();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          proximoSlide();
          e.preventDefault();
        }
      }
    });

    // Suporte a touch para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carrosselSlides.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carrosselSlides.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          slideAnterior();
        } else {
          proximoSlide();
        }
      }
    });

    console.log(`🎠 Carrossel inicializado com ${totalSlides} slides`);
  }

  // ============================================================
  // FUNCIONALIDADES DA PÁGINA "SOBRE" (bio.html)
  // ============================================================

  // 1. Cálculo automático da idade
  function calcularIdade(dataNascimentoStr) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimentoStr);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = nascimento.getMonth();
    const diaNasc = nascimento.getDate();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }
    return idade;
  }

  const dataNasc = "1992-04-10";
  const idade = calcularIdade(dataNasc);
  const idadeElemento = document.getElementById('idadeDinamica');
  if (idadeElemento) {
    idadeElemento.innerHTML = `● ${idade} anos • Apaixonada por dados e educação`;
  }

  // 2. Funcionalidade de copiar texto
  const botoesCopiar = document.querySelectorAll('.btn-copiar');
  botoesCopiar.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = botao.getAttribute('data-copiar');
      if (targetId) {
        const elementoTexto = document.getElementById(targetId);
        if (elementoTexto) {
          const textoParaCopiar = elementoTexto.innerText.trim();
          navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const textoOriginal = botao.innerText;
            botao.innerText = '✓ Copiado!';
            setTimeout(() => {
              botao.innerText = textoOriginal;
            }, 1500);
          }).catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Não foi possível copiar automaticamente. Copie manualmente.');
          });
        }
      }
    });
  });

  // 3. Tratamento de fallback para imagem de avatar
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

  // 4. Tratamento de fallback para logos das instituições
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

  // 5. Botão de voltar para página inicial
  const btnVoltar = document.querySelector('.btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', function (e) {
      if (window.location.pathname.includes('bio.html')) {
        e.preventDefault();
        window.location.href = '../index.html';
      }
    });
  }

  // ============================================================
  // MENSAGENS DE CONSOLE
  // ============================================================
  console.log("🚀 projetosgn | IDEIAS • CÓDIGO • SOLUÇÕES");
  console.log("🎠 Carrossel interativo ativo: navegação por setas, dots e teclado.");

  if (document.querySelector('.sobre-container')) {
    console.log(`📄 Sobre | projetosgn — Idade calculada: ${idade} anos. Contatos com cópia segura.`);
  }

  if (document.querySelector('.carrossel-container')) {
    const totalSlidesCarrossel = document.querySelectorAll('.carrossel-item').length;
    console.log(`✨ Carrossel com ${totalSlidesCarrossel} projetos disponíveis`);
  }
})();

