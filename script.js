'use strict';

/*
  CASA DE ORAÇÃO EBENÉZER

  Funcionalidades:
  - Menu para celular.
  - Ano automático no rodapé.
  - Ampliação das imagens.
  - Navegação entre fotos.
  - Fechamento por Escape, botão ou clique fora.
*/

(() => {
  /*
    OPCIONAL: WhatsApp confirmado da igreja.

    Use país + DDD + número, somente dígitos.
    Deixe vazio para manter o botão oculto.

    Os contatos escritos no HTML permanecem visíveis.
  */
  const WHATSAPP = '';

  function iniciar() {
    const porId = id => document.getElementById(id);

    // ==========================================
    // 1. ANO DO RODAPÉ
    // ==========================================

    const ano = porId('ano');

    if (ano) {
      ano.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. MENU PARA CELULAR
    // ==========================================

    const menu = porId('menu');
    const menuBotao = porId('menu-botao');

    const telaPequena = window.matchMedia(
      '(max-width: 760px)'
    );

    if (menu && menuBotao) {
      document.body.classList.add('js');
      menuBotao.hidden = false;

      function fecharMenu(devolverFoco = false) {
        menu.classList.remove('aberto');
        menuBotao.setAttribute('aria-expanded', 'false');

        if (devolverFoco) {
          menuBotao.focus();
        }
      }

      menuBotao.addEventListener('click', () => {
        const aberto = menu.classList.toggle('aberto');

        menuBotao.setAttribute(
          'aria-expanded',
          String(aberto)
        );
      });

      menu.addEventListener('click', evento => {
        const link = evento.target.closest('a');

        if (!link) {
          return;
        }

        fecharMenu();

        const destino = link.hash
          ? porId(link.hash.slice(1))
          : null;

        // Leva o foco para a seção após fechar o menu.
        if (destino && telaPequena.matches) {
          if (!destino.hasAttribute('tabindex')) {
            destino.tabIndex = -1;
          }

          destino.focus({
            preventScroll: true
          });
        }
      });

      document.addEventListener('click', evento => {
        const clicouNoMenu = menu.contains(evento.target);

        const clicouNoBotao = menuBotao.contains(
          evento.target
        );

        if (!clicouNoMenu && !clicouNoBotao) {
          fecharMenu();
        }
      });

      document.addEventListener('keydown', evento => {
        if (
          evento.key === 'Escape' &&
          menu.classList.contains('aberto')
        ) {
          fecharMenu(true);
        }
      });

      telaPequena.addEventListener('change', () => {
        fecharMenu();
      });
    }

    // ==========================================
    // 3. WHATSAPP OPCIONAL
    // ==========================================

    const whatsapp = porId('whatsapp');

    if (whatsapp && /^\d{10,15}$/.test(WHATSAPP)) {
      const mensagem =
        'Olá! Gostaria de conversar com a Casa de Oração Ebenézer.';

      whatsapp.href =
        `https://wa.me/${WHATSAPP}` +
        `?text=${encodeURIComponent(mensagem)}`;

      whatsapp.hidden = false;
    }

    /*
      O mapa, o endereço e as redes sociais continuam
      utilizando os links que você colocou no HTML.
    */

    // ==========================================
    // 4. VISUALIZADOR DE IMAGENS
    // ==========================================

    const dialogo = porId('ampliacao');
    const fotoGrande = porId('foto-ampliada');
    const legenda = porId('foto-legenda');
    const fechar = porId('fechar');

    if (!dialogo || !fotoGrande || !legenda || !fechar) {
      return;
    }

    if (typeof dialogo.showModal !== 'function') {
      return;
    }

    /*
      Estilos exclusivos do visualizador.
      Não é necessário modificar o style.css.
    */
    const estilo = document.createElement('style');

    estilo.textContent = `
      [data-ampliavel] {
        cursor: zoom-in;
      }

      [data-ampliavel]:focus-visible {
        outline: 3px solid var(--dourado, #88632d);
        outline-offset: 4px;
      }

      #ampliacao {
        width: min(1100px, calc(100% - 24px));
        max-width: none;
        max-height: 92vh;
        max-height: 92dvh;
        overflow: auto;
      }

      #foto-ampliada {
        display: block;
        width: 100%;
        height: auto;
        max-height: 66vh;
        max-height: 66dvh;
        object-fit: contain;
        margin: 16px auto;
      }

      #foto-ampliada[hidden] {
        display: none !important;
      }

      #ampliacao .controles-foto {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 16px;
      }

      #ampliacao .controles-foto button {
        margin: 0;
        min-height: 44px;
      }

      #ampliacao button:focus-visible {
        outline: 3px solid var(--dourado, #88632d);
        outline-offset: 3px;
      }

      #ampliacao button:disabled {
        opacity: .5;
        cursor: default;
      }

      #foto-legenda {
        overflow-wrap: anywhere;
      }
    `;

    document.head.append(estilo);

    legenda.setAttribute('aria-live', 'polite');
    legenda.setAttribute('aria-atomic', 'true');

    fechar.type = 'button';

    // Cria os botões de navegação.
    const controles = document.createElement('div');
    controles.className = 'controles-foto';

    const anterior = document.createElement('button');
    anterior.type = 'button';
    anterior.textContent = '← Anterior';

    const proxima = document.createElement('button');
    proxima.type = 'button';
    proxima.textContent = 'Próxima →';

    controles.append(anterior, proxima);
    dialogo.append(controles);

    const fotos = [];

    let indice = 0;
    let origem = null;
    let overflowAnterior = '';
    let requisicao = 0;

    function mostrarFoto(novoIndice) {
      if (fotos.length === 0) {
        return;
      }

      indice = (
        novoIndice + fotos.length
      ) % fotos.length;

      const item = fotos[indice];
      const numeroRequisicao = ++requisicao;

      const descricao =
        `${indice + 1} de ${fotos.length} — ${item.descricao}`;

      fotoGrande.hidden = true;
      fotoGrande.removeAttribute('src');
      fotoGrande.alt = item.descricao;

      legenda.textContent = `Carregando… ${descricao}`;

      anterior.disabled = fotos.length < 2;
      proxima.disabled = fotos.length < 2;

      /*
        Carrega antes de exibir para evitar mostrar
        uma imagem anterior ou um ícone quebrado.
      */
      const carregamento = new Image();

      carregamento.onload = () => {
        if (
          numeroRequisicao !== requisicao ||
          !dialogo.open
        ) {
          return;
        }

        fotoGrande.src = carregamento.src;
        fotoGrande.hidden = false;

        legenda.textContent = descricao;
      };

      carregamento.onerror = () => {
        if (
          numeroRequisicao !== requisicao ||
          !dialogo.open
        ) {
          return;
        }

        legenda.textContent =
          `Não foi possível carregar a imagem. ${descricao}`;
      };

      /*
        Opcional: data-ampliada pode indicar uma
        versão maior da foto no HTML.
      */
      carregamento.src =
        item.imagem.dataset.ampliada ||
        item.imagem.currentSrc ||
        item.imagem.src;
    }

    function abrirFoto(posicao, elemento) {
      origem = elemento;

      if (!dialogo.open) {
        overflowAnterior = document.body.style.overflow;

        dialogo.showModal();

        // Impede que a página role atrás da imagem.
        document.body.style.overflow = 'hidden';
      }

      mostrarFoto(posicao);
      fechar.focus();
    }

    // Fecha pelo botão.
    fechar.addEventListener('click', () => {
      dialogo.close();
    });

    // Navegação pelos botões.
    anterior.addEventListener('click', () => {
      mostrarFoto(indice - 1);
    });

    proxima.addEventListener('click', () => {
      mostrarFoto(indice + 1);
    });

    // Navegação pelas setas do teclado.
    dialogo.addEventListener('keydown', evento => {
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        mostrarFoto(indice - 1);
      }

      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        mostrarFoto(indice + 1);
      }

      /*
        A tecla Escape e o foco dentro da janela
        são controlados pelo elemento dialog.
      */
    });

    // Identifica cliques fora da janela.
    function foraDaCaixa(evento) {
      const caixa = dialogo.getBoundingClientRect();

      return (
        evento.clientX < caixa.left ||
        evento.clientX > caixa.right ||
        evento.clientY < caixa.top ||
        evento.clientY > caixa.bottom
      );
    }

    let pressionouFora = false;

    dialogo.addEventListener('pointerdown', evento => {
      pressionouFora =
        evento.target === dialogo &&
        foraDaCaixa(evento);
    });

    dialogo.addEventListener('click', evento => {
      if (
        pressionouFora &&
        evento.target === dialogo &&
        foraDaCaixa(evento)
      ) {
        dialogo.close();
      }

      pressionouFora = false;
    });

    // Restaura a página quando a janela fecha.
    dialogo.addEventListener('close', () => {
      requisicao++;

      document.body.style.overflow = overflowAnterior;

      fotoGrande.hidden = true;
      fotoGrande.removeAttribute('src');

      if (origem?.isConnected) {
        origem.focus({
          preventScroll: true
        });
      }
    });

    // ==========================================
    // 5. PREPARAÇÃO DA GALERIA
    // ==========================================

    /*
      Aceita os dois formatos:

      1. Botão com uma imagem dentro:
         <button disabled>
           <img src="imagens/foto1.png" alt="Descrição">
         </button>

      2. Botão usando data-foto:
         <button
           disabled
           data-foto="imagens/foto1.png"
           data-descricao="Descrição">
         </button>
    */

    document
      .querySelectorAll('#galeria button[data-foto]')
      .forEach(botao => {
        const imagemExistente = botao.querySelector('img');
        const caminho = botao.dataset.foto?.trim();

        if (imagemExistente || !caminho) {
          return;
        }

        const imagem = document.createElement('img');

        imagem.src = caminho;
        imagem.alt =
          botao.dataset.descricao || 'Foto da igreja';

        imagem.width = 600;
        imagem.height = 400;
        imagem.loading = 'lazy';

        botao.replaceChildren(imagem);
      });

    // ==========================================
    // 6. HABILITA A AMPLIAÇÃO DAS IMAGENS
    // ==========================================

    document.querySelectorAll('img').forEach(imagem => {
      // Não inclui a imagem do próprio visualizador.
      if (
        imagem.closest('dialog') ||
        !imagem.getAttribute('src')
      ) {
        return;
      }

      const botao = imagem.closest('button');
      const link = imagem.closest('a');

      /*
        Usa o botão ou link já existente.
        Fotos avulsas recebem acesso pelo teclado.
      */
      const gatilho = botao || link || imagem;

      const descricaoConfigurada = imagem
        .closest('[data-descricao]')
        ?.dataset.descricao;

      const nomeDoCard = imagem
        .closest('article')
        ?.querySelector('h3')
        ?.textContent.trim();

      const descricao =
        descricaoConfigurada ||
        imagem.alt.trim() ||
        nomeDoCard ||
        'Foto da Casa de Oração Ebenézer';

      const posicao = fotos.push({
        imagem,
        descricao
      }) - 1;

      function habilitar() {
        if (!imagem.naturalWidth) {
          return;
        }

        // Ativa os botões da galeria após carregar a foto.
        if (botao) {
          botao.disabled = false;
          botao.type = 'button';
        }

        if (!botao && !link) {
          imagem.tabIndex = 0;
          imagem.setAttribute('role', 'button');
        }

        gatilho.dataset.ampliavel = '';

        gatilho.setAttribute(
          'aria-label',
          `Ampliar: ${descricao}`
        );

        gatilho.setAttribute('aria-haspopup', 'dialog');
        gatilho.setAttribute('aria-controls', 'ampliacao');
      }

      imagem.addEventListener('load', habilitar);

      // Também funciona com imagens que já estão no cache.
      if (imagem.complete) {
        habilitar();
      }

      gatilho.addEventListener('click', evento => {
        if (!imagem.naturalWidth) {
          return;
        }

        evento.preventDefault();

        abrirFoto(posicao, gatilho);
      });

      /*
        Botões já respondem a Enter e Espaço.
        Links já respondem a Enter.
        Adiciona as teclas que faltam às fotos avulsas.
      */
      if (!botao) {
        gatilho.addEventListener('keydown', evento => {
          const apertouEspaco = evento.key === ' ';

          const apertouEnterNaImagem =
            !link && evento.key === 'Enter';

          if (apertouEspaco || apertouEnterNaImagem) {
            if (!imagem.naturalWidth) {
              return;
            }

            evento.preventDefault();

            abrirFoto(posicao, gatilho);
          }
        });
      }
    });
  }

  // Aguarda o HTML estar disponível.
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      iniciar,
      { once: true }
    );
  } else {
    iniciar();
  }
})();