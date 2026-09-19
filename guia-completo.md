# Casa de Oração Ebenézer — guia de edição

## Estrutura
```text
casa-oracao-ebenezer/
  index.html
  style.css
  script.js
  imagens/
```

## Abrir e testar no VS Code
1. Extraia o ZIP para uma pasta no computador.
2. No VS Code, use **Arquivo > Abrir Pasta** e escolha a pasta extraída.
3. Abra `index.html` no navegador pelo Explorador de Arquivos. Não é necessário instalar pacotes ou compilar.
4. Depois de salvar alterações no VS Code, atualize o navegador com Ctrl+R.
5. Diminua a janela para conferir o menu de celular. Use Tab para navegar e Enter para ativar links e botões.
6. Depois de inserir uma foto real na galeria, abra-a e teste o botão Fechar e a tecla Escape.
7. Confira cada contato e o endereço do mapa antes de divulgar o site.

## Onde editar
| Alteração | Arquivo e local |
| --- | --- |
| Cores | `style.css`, variáveis em `:root` |
| História, pastores e valores | `index.html`, marcadores entre colchetes |
| Cultos e horários | `index.html`, seção `programacao` |
| Ministérios e eventos | `index.html`, seções `ministerios` e `eventos` |
| Endereço visível | `index.html`, elemento `address` |
| WhatsApp, e-mail, mapa e redes | `script.js`, objeto `config` |
| Fotos | pasta `imagens` e referências no HTML |

## Fotos e logotipo
Use fotos reais autorizadas. Prefira nomes simples, sem espaços, como `pastor-1.webp`.
Troque o espaço `.destaque` ou `.retrato` pelo elemento de imagem indicado nos comentários do HTML. Exemplo:
```html
<img src="imagens/pastor-1.webp" alt="Pastor: nome real" width="150" height="195" loading="lazy">
```
Para o logotipo, substitua o span de classe `logo` por uma imagem com dimensões, por exemplo 60 × 60. Escolha texto alternativo que identifique a igreja.
Na galeria, preencha os dois atributos de cada botão:
```html
<button disabled data-foto="imagens/foto-1.webp" data-descricao="Descrição verdadeira do encontro">[FOTO 1]</button>
```
O JavaScript carrega a imagem e só libera o botão quando ela estiver disponível. A descrição será usada como texto alternativo e legenda. Arquivos inexistentes permanecem desativados.

## Contatos
No início de `script.js`, preencha `whatsapp` com país + DDD + número, sem espaços, parênteses ou sinal de mais. Use o número real da igreja. Preencha `email` com o endereço real.
Em `mapasUrl`, cole o link obtido ao compartilhar o local correto no Google Maps. Em `mapaIncorporado`, cole somente o conteúdo do atributo `src` do código oferecido em **Incorporar um mapa**. Não cole o iframe inteiro.
Para redes sociais, adicione objetos à lista `redes`, cada um com `nome` e `url`. Use URLs completas iniciadas por `https://`.
Os contatos continuam identificados por marcadores quando a configuração está vazia. Não há envio simulado: o WhatsApp abre uma conversa e o e-mail abre o programa de e-mail do visitante.

## Como o código funciona
- **HTML** organiza o conteúdo. `header`, `main`, `section` e `footer` dão significado a cada parte. Um link como `#historia` leva à seção com esse `id`.
- **CSS** controla apresentação. As variáveis em `:root` centralizam cores. `grid` distribui colunas e as regras `@media` adaptam a página a telas menores.
- **JavaScript** controla menu, contatos, ano e galeria. O objeto `config` reúne as informações que ativam links externos.
- **Acessibilidade:** o menu informa se está aberto; o diálogo nativo prende o foco enquanto está aberto e fecha com Escape; depois o foco retorna à foto. A rolagem respeita movimento reduzido.
- Não existe banco de dados: os conteúdos são atualizados manualmente nos arquivos. O site não recebe pedidos de oração diretamente; o contato acontece pelo WhatsApp configurado.

## Informações que faltam
Logotipo; foto de destaque; história e fundação; missão, visão e valores aprovados; nomes, cargos, apresentações e fotos dos pastores; dias e horários; ministérios confirmados e descrições; fotos autorizadas com legendas; eventos com datas; orientações sobre recepção e crianças; endereço e CEP; localização no Maps; WhatsApp; e-mail e redes sociais.

## Verificação desta entrega
Sintaxe do JavaScript, referências locais e destinos dos links internos verificados. Não foi executado teste visual em navegador. Teste também com os dados reais antes da divulgação.

## Código completo

### index.html

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Conheça a Casa de Oração Ebenézer. História, programação, ministérios e informações para sua visita.">
  <title>Casa de Oração Ebenézer</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header>
  <a class="marca" href="#inicio" aria-label="Casa de Oração Ebenézer — início">
    <!-- Substitua o espaço abaixo por seu logotipo com texto alternativo. -->
    <span class="logo">[LOGO]</span><span>CASA DE ORAÇÃO<strong>Ebenézer</strong></span>
  </a>
  <button id="menu-botao" aria-controls="menu" aria-expanded="false" hidden>Menu ☰</button>
  <nav id="menu" aria-label="Navegação principal">
    <a href="#historia">Nossa igreja</a><a href="#programacao">Programação</a>
    <a href="#ministerios">Ministérios</a><a href="#galeria">Galeria</a>
    <a href="#eventos">Eventos</a><a class="botao pequeno" href="#visita">Venha nos visitar</a>
  </nav>
</header>
<main id="conteudo">
  <section id="inicio" class="hero">
    <div><p class="sobretitulo">CASA DE ORAÇÃO EBENÉZER</p>
      <h1>Um lugar para<br><em>ser bem-vindo.</em></h1>
      <p>Seja bem-vindo à Casa de Oração Ebenézer.<br>Conheça nossa igreja e planeje sua visita.</p>
      <div class="acoes"><a class="botao" href="#historia">Conheça nossa igreja</a><a class="botao contorno" href="#programacao">Horários dos cultos</a></div>
      <p class="nota">Uma casa de portas abertas para receber você.</p>
    </div>
    <!-- Troque este espaço por <img src="imagens/destaque.webp" alt="Descrição da foto real" width="900" height="1000"> -->
    <div class="destaque reservado"><span class="numero">01 / NOSSA CASA</span><span>[FOTO DE DESTAQUE DA IGREJA]<small>Um espaço para nossos encontros.</small></span><span class="legenda">CASA DE ORAÇÃO <b>Ebenézer</b></span></div>
  </section>
  <section id="historia" class="secao">
    <p class="sobretitulo">NOSSA ESSÊNCIA</p><div class="duas"><h2>Uma história para<br>conhecer e compartilhar.</h2><div><p>[INSERIR HISTÓRIA]</p><p>[ANO DE FUNDAÇÃO E TRAJETÓRIA DA IGREJA]</p></div></div>
    <div class="grade tres valores"><article><span>01</span><h3>Missão</h3><p>[INSERIR MISSÃO]</p></article><article><span>02</span><h3>Visão</h3><p>[INSERIR VISÃO]</p></article><article><span>03</span><h3>Valores</h3><p>[INSERIR VALORES]</p></article></div>
  </section>
  <section id="pastores" class="secao suave">
    <p class="sobretitulo">NOSSA LIDERANÇA</p><h2>Nossos pastores</h2>
    <!-- Duplique um article para incluir outros pastores. Use somente fotos autorizadas. -->
    <div class="grade duas"><article class="pastor"><div class="reservado retrato">[FOTO DO PASTOR]</div><div><p class="sobretitulo">[FUNÇÃO]</p><h3>[NOME DO PASTOR]</h3><p>[BREVE APRESENTAÇÃO]</p></div></article><article class="pastor"><div class="reservado retrato">[FOTO DO PASTOR]</div><div><p class="sobretitulo">[FUNÇÃO]</p><h3>[NOME DO PASTOR]</h3><p>[BREVE APRESENTAÇÃO]</p></div></article></div>
  </section>
  <section id="programacao" class="secao azul">
    <div class="duas"><div><p class="sobretitulo">TEMPO DE ESTAR JUNTOS</p><h2>Cultos e<br>programação</h2><p>Encontre aqui os dias e horários<br>dos nossos encontros.</p></div>
      <!-- Edite cada linha com os horários confirmados. -->
      <div class="agenda"><article><span>[DIA]</span><div><h3>[NOME DO CULTO]</h3><p>[HORÁRIO]</p></div></article><article><span>[DIA]</span><div><h3>[REUNIÃO DE ORAÇÃO]</h3><p>[HORÁRIO]</p></div></article><article><span>[DIA]</span><div><h3>[ATIVIDADE SEMANAL]</h3><p>[HORÁRIO]</p></div></article></div>
    </div>
  </section>
  <section id="ministerios" class="secao">
    <p class="sobretitulo">CONHEÇA NOSSOS GRUPOS</p><h2>Ministérios</h2><p class="introducao">Nomes e atividades a confirmar com a igreja.</p>
    <div class="grade quatro"><article class="card"><span class="indice">01</span><h3>Infantil</h3><p>[DESCRIÇÃO DO MINISTÉRIO INFANTIL]</p></article><article class="card"><span class="indice">02</span><h3>Jovens</h3><p>[DESCRIÇÃO DO MINISTÉRIO DE JOVENS]</p></article><article class="card"><span class="indice">03</span><h3>Louvor</h3><p>[DESCRIÇÃO DO MINISTÉRIO DE LOUVOR]</p></article><article class="card"><span class="indice">04</span><h3>[OUTRO GRUPO]</h3><p>[DESCRIÇÃO DO MINISTÉRIO]</p></article></div>
  </section>
  <section id="galeria" class="secao suave">
    <p class="sobretitulo">VIDA EM COMUNIDADE</p><h2>Momentos da nossa casa</h2><p>Fotografias da igreja serão adicionadas em breve.</p>
    <!-- Para ativar uma foto, preencha data-foto="imagens/foto-1.webp" e data-descricao com uma descrição real. -->
    <div class="grade tres fotos"><button disabled data-foto="" data-descricao="">[FOTO 1]</button><button disabled data-foto="" data-descricao="">[FOTO 2]</button><button disabled data-foto="" data-descricao="">[FOTO 3]</button></div>
  </section>
  <section id="eventos" class="secao">
    <p class="sobretitulo">NOSSA AGENDA</p><h2>Próximos eventos</h2>
    <!-- Duplique o card e substitua os marcadores quando houver eventos confirmados. -->
    <div class="grade duas"><article class="card evento"><span class="data">[DATA]<small>[HORÁRIO]</small></span><div><h3>[TÍTULO DO EVENTO]</h3><p>[DESCRIÇÃO DO EVENTO]</p></div></article><article class="card evento"><span class="data">[DATA]<small>[HORÁRIO]</small></span><div><h3>[TÍTULO DO EVENTO]</h3><p>[DESCRIÇÃO DO EVENTO]</p></div></article></div>
  </section>
  <section id="visita" class="secao visita">
    <p class="sobretitulo">SUA PRIMEIRA VISITA</p><h2>Será uma alegria<br>receber você.</h2><p>Você está convidado a conhecer a Casa de Oração Ebenézer.</p>
    <div class="grade duas"><div><h3>Ao chegar</h3><p>[INFORMAÇÕES CONFIRMADAS SOBRE A RECEPÇÃO]</p></div><div><h3>Vem com crianças?</h3><p>[INFORMAÇÕES CONFIRMADAS SOBRE ATIVIDADES INFANTIS]</p></div></div><a class="botao" href="#localizacao">Veja nossa localização</a>
  </section>
  <section id="localizacao" class="secao duas">
    <div><p class="sobretitulo">ENCONTRE NOSSA CASA</p><h2>Localização</h2><address>[ENDEREÇO DA IGREJA]<br>[BAIRRO, CIDADE — UF]<br>[CEP]</address><p id="rota-pendente">Localização a confirmar.</p><a id="rota" class="botao" hidden>Como chegar</a></div>
    <div id="mapa" class="reservado mapa">[MAPA APÓS CONFIRMAÇÃO DO ENDEREÇO]</div>
  </section>
  <section id="contato" class="secao contato">
    <div><p class="sobretitulo">VAMOS CONVERSAR</p><h2>Estamos por aqui.</h2><p>Entre em contato, tire suas dúvidas<br>ou envie seu pedido de oração.</p></div>
    <div><p id="whatsapp-pendente">[WHATSAPP DA IGREJA]</p><a id="whatsapp" class="botao" hidden>Conversar pelo WhatsApp</a><p id="email-pendente">[E-MAIL DA IGREJA]</p><a id="email" hidden></a><p id="redes-pendente">[LINKS DAS REDES SOCIAIS]</p><div id="redes" class="acoes"></div></div>
  </section>
</main>
<footer><div class="marca"><span>CASA DE ORAÇÃO<strong>Ebenézer</strong></span></div><nav aria-label="Links do rodapé"><a href="#pastores">Pastores</a><a href="#localizacao">Localização</a><a href="#contato">Contato</a><a href="#inicio">Voltar ao início ↑</a></nav><p>© <span id="ano"></span> Casa de Oração Ebenézer.</p></footer>
<dialog id="ampliacao" aria-labelledby="foto-legenda"><button id="fechar" autofocus aria-label="Fechar foto ampliada">Fechar ×</button><img id="foto-ampliada" alt="" width="1200" height="800"><p id="foto-legenda"></p></dialog>
</body>
</html>

```

### style.css

```css
/* EDITE AQUI: cores usadas em todo o site. */
:root{--azul:#142c42;--dourado:#977238;--fundo:#fffefa;--suave:#f1f3f3;--texto:#45545e;--borda:#d9dedf}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:110px}body{margin:0;background:var(--fundo);color:var(--texto);font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7}h1,h2,h3,p{margin-top:0}h1,h2,h3{color:var(--azul)}h1,h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;line-height:1.13}h1{font-size:clamp(2.8rem,5.4vw,5.2rem);letter-spacing:-.04em;margin-bottom:24px}h1 em{font-weight:400;color:var(--dourado)}h2{font-size:clamp(2rem,3.3vw,3.4rem);letter-spacing:-.025em;margin-bottom:28px}h3{font-size:1.15rem;line-height:1.4;margin-bottom:12px}a{color:inherit;text-underline-offset:5px}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid var(--dourado);outline-offset:5px}[hidden]{display:none!important}header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:22px 5%;border-bottom:1px solid var(--borda);background:var(--fundo);position:sticky;top:0;z-index:5}.marca{display:flex;align-items:center;gap:13px;text-decoration:none;color:var(--azul);font-size:.7rem;letter-spacing:.13em;line-height:1.3}.marca strong{display:block;font-family:Georgia,serif;font-size:1.9rem;font-weight:400;letter-spacing:0}.logo{border:1px solid var(--dourado);padding:16px 6px;font-size:.65rem;letter-spacing:0}nav{display:flex;align-items:center;gap:25px}nav a{font-size:.875rem;text-decoration:none}nav a:hover{text-decoration:underline}.botao{display:inline-flex;align-items:center;justify-content:center;padding:14px 23px;background:var(--azul);color:white;border:1px solid var(--azul);text-decoration:none;font-size:.875rem;font-weight:600;transition:background .2s,transform .2s}.botao:hover{background:#25465f;transform:translateY(-2px)}.pequeno{padding:11px 16px}.contorno{background:transparent;color:var(--azul)}.contorno:hover{background:var(--suave)}.acoes{display:flex;gap:12px;flex-wrap:wrap}.hero{padding:64px 5% 70px;display:grid;grid-template-columns:1.1fr 1fr;gap:6%;align-items:center;max-width:1500px;margin:auto}.sobretitulo{font-size:.75rem;letter-spacing:.18em;font-weight:700;color:var(--dourado);margin-bottom:22px}.hero p:not(.sobretitulo):not(.nota){font-size:1.05rem;margin-bottom:30px}.nota{font-size:.8rem;margin-top:30px;margin-bottom:0}.reservado{background:#e8edef;color:#5c6b74;border:1px solid #d4dcdf;display:flex;align-items:center;justify-content:center;text-align:center;padding:25px;font-size:.8rem;letter-spacing:.06em}.destaque{min-height:510px;border-radius:48% 48% 3px 3px;flex-direction:column;justify-content:space-between;padding:60px 25px 32px;background:linear-gradient(145deg,#e4e9e8,#d6e0e4)}.destaque small{display:block;font:italic 1.35rem Georgia,serif;letter-spacing:0;margin-top:18px}.numero{font-size:.7rem}.legenda{font-size:.65rem;letter-spacing:.15em}.legenda b{display:block;font:400 2rem Georgia,serif;margin-top:7px;letter-spacing:0}.hero>img{width:100%;height:510px;object-fit:cover;border-radius:48% 48% 3px 3px}.secao{padding:80px max(5%,calc((100vw - 1350px)/2));scroll-margin-top:0}.duas{display:grid;grid-template-columns:1fr 1fr;gap:50px}.grade{display:grid;gap:24px}.grade.duas{grid-template-columns:repeat(2,minmax(0,1fr))}.tres{grid-template-columns:repeat(3,minmax(0,1fr))}.quatro{grid-template-columns:repeat(4,minmax(0,1fr))}.valores{margin-top:38px;border-top:1px solid var(--borda)}.valores article{padding-top:28px}.valores span,.indice{font-family:Georgia,serif;color:var(--dourado);display:block;margin-bottom:14px}.valores h3{font:1.7rem Georgia,serif}.suave{background:var(--suave)}.pastor{display:grid;grid-template-columns:150px 1fr;gap:24px;align-items:center}.retrato{height:195px}.pastor img{width:150px;height:195px;object-fit:cover}.pastor p{font-size:.875rem;margin-bottom:8px}.pastor .sobretitulo{font-size:.7rem}.azul{background:var(--azul);color:#d2dbe1}.azul h2,.azul h3{color:white}.azul .sobretitulo{color:#d8b877}.agenda article{display:flex;gap:28px;align-items:center;padding:20px 0;border-bottom:1px solid #405264}.agenda article:first-child{padding-top:0}.agenda article>span{color:#d8b877;font-size:.8rem;min-width:60px}.agenda h3,.agenda p{margin-bottom:3px}.agenda p{font-size:.9rem}.card{padding:30px;border:1px solid var(--borda);background:var(--fundo)}.card p{font-size:.875rem;margin-bottom:0;overflow-wrap:anywhere}.indice{font-size:1.7rem}.introducao{margin-top:-10px;margin-bottom:32px}.fotos{margin-top:30px}.fotos button{padding:0;min-height:225px;border:1px solid var(--borda);background:#e0e6e8;color:#5c6b74;font-size:.8rem}.fotos button:disabled{cursor:default}.fotos img{display:block;width:100%;height:225px;object-fit:cover}.evento{display:flex;gap:22px;align-items:center}.data{color:var(--dourado);font-family:Georgia,serif;font-size:1.35rem;min-width:95px}.data small{display:block;font: .75rem Arial,sans-serif;margin-top:8px}.visita{background:#edf0ed;text-align:center}.visita .grade{max-width:800px;margin:35px auto;gap:35px}.visita .grade p{font-size:.875rem}.visita h2{font-size:clamp(2.5rem,4vw,4rem)}address{font-style:normal}.mapa{min-height:290px}iframe{border:0;width:100%;height:300px}.contato{display:grid;grid-template-columns:1fr 1fr;gap:50px;border-top:1px solid var(--borda)}.contato p{font-size:.9rem}footer{background:var(--azul);padding:45px 5%;color:#d0d8df;display:flex;justify-content:space-between;gap:24px;align-items:center;flex-wrap:wrap}footer .marca{color:white}footer p{font-size:.75rem;margin:0}footer nav{flex-wrap:wrap;gap:18px}dialog{max-width:min(1000px,92vw);max-height:92vh;padding:20px;border:0;background:var(--fundo);color:var(--azul)}dialog::backdrop{background:#091522db}dialog img{display:block;max-width:100%;width:auto;height:auto;max-height:70vh;margin:12px auto;object-fit:contain}dialog button{display:block;margin-left:auto;background:var(--azul);color:white;border:0;padding:10px 16px}dialog p{margin:12px 0 0}.skip{position:fixed;left:20px;top:-100px;background:white;padding:12px;z-index:20}.skip:focus{top:10px}#menu-botao{background:transparent;border:1px solid var(--borda);color:var(--azul);padding:8px 12px}
@media(max-width:1100px){header{flex-wrap:wrap}nav{gap:16px}.quatro{grid-template-columns:repeat(2,minmax(0,1fr))}.pastor{grid-template-columns:110px 1fr}.retrato,.pastor img{width:110px;height:155px}}
@media(max-width:760px){html{scroll-padding-top:95px}header{padding:15px 5%}.marca strong{font-size:1.6rem}.logo{padding:12px 5px}#menu-botao:not([hidden]){display:block}#menu{width:100%;flex-direction:column;align-items:stretch;padding:12px 0}body.js #menu{display:none}body.js #menu.aberto{display:flex}#menu a{padding:8px}.hero{grid-template-columns:1fr;gap:35px;padding-top:45px}.destaque{min-height:350px;max-width:500px;width:100%;margin:auto}.hero>img{height:350px}.secao{padding:55px 6%}.duas,.grade.duas,.tres,.contato{grid-template-columns:1fr;gap:28px}.quatro{gap:14px}.card{padding:23px}.pastor{grid-template-columns:110px 1fr}.valores{gap:0}.valores article{border-bottom:1px solid var(--borda)}.fotos{grid-template-columns:1fr}.evento{gap:14px}.visita .grade{gap:15px}footer{align-items:flex-start;flex-direction:column}.sobretitulo{letter-spacing:.12em}h1{font-size:3.2rem}}
@media(max-width:380px){.quatro{grid-template-columns:1fr}.acoes{flex-direction:column}h1{font-size:2.6rem}.evento{flex-direction:column;align-items:flex-start}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important;animation:none!important}}

```

### script.js

```javascript
'use strict';
/* CONFIGURE AQUI. Deixe vazio enquanto a informação não for confirmada.
   WhatsApp: código do país + DDD + número, somente dígitos.
   mapasUrl: link real obtido em "Compartilhar" no Google Maps.
   mapaIncorporado: somente o endereço src do iframe em "Incorporar um mapa".
   Redes: { nome: 'Instagram', url: 'https://...' }. */
const config = {
  whatsapp: '',
  email: '',
  mapasUrl: '',
  mapaIncorporado: '',
  redes: []
};
const porId = id => document.getElementById(id);
const urlSegura = valor => {
  try { return new URL(valor).protocol === 'https:'; }
  catch { return false; }
};
// O menu continua visível quando o JavaScript está desativado.
document.body.classList.add('js');
const menu = porId('menu');
const menuBotao = porId('menu-botao');
menuBotao.hidden = false;
const fecharMenu = () => {
  menu.classList.remove('aberto');
  menuBotao.setAttribute('aria-expanded', 'false');
};
menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBotao.setAttribute('aria-expanded', String(aberto));
});
menu.addEventListener('click', evento => {
  if (evento.target.closest('a')) fecharMenu();
});
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
    fecharMenu();
    menuBotao.focus();
  }
});
porId('ano').textContent = new Date().getFullYear();
// Nenhum link de contato é ativado sem uma configuração válida.
function ativarLink(id, url) {
  const link = porId(id);
  link.href = url;
  link.hidden = false;
  porId(id + '-pendente').hidden = true;
}
if (/^\d{10,15}$/.test(config.whatsapp)) {
  ativarLink('whatsapp', 'https://wa.me/' + config.whatsapp + '?text=' +
    encodeURIComponent('Olá! Gostaria de conversar com a Casa de Oração Ebenézer.'));
}
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
  ativarLink('email', 'mailto:' + config.email);
  porId('email').textContent = config.email;
}
if (urlSegura(config.mapasUrl)) ativarLink('rota', config.mapasUrl);
if (urlSegura(config.mapaIncorporado)) {
  const url = new URL(config.mapaIncorporado);
  if (['www.google.com', 'maps.google.com'].includes(url.hostname) && url.pathname.startsWith('/maps')) {
    const mapa = document.createElement('iframe');
    mapa.src = url.href;
    mapa.title = 'Localização da Casa de Oração Ebenézer';
    mapa.loading = 'lazy';
    mapa.referrerPolicy = 'no-referrer-when-downgrade';
    porId('mapa').replaceChildren(mapa);
  }
}
config.redes.forEach(rede => {
  if (!urlSegura(rede.url) || !rede.nome) return;
  const link = document.createElement('a');
  link.href = rede.url;
  link.textContent = rede.nome;
  porId('redes').append(link);
  porId('redes-pendente').hidden = true;
});
// <dialog> mantém o foco dentro da foto e fecha com Escape nativamente.
const dialogo = porId('ampliacao');
let fotoOrigem;
document.querySelectorAll('[data-foto]').forEach(botao => {
  if (!botao.dataset.foto || !botao.dataset.descricao) return;
  const foto = document.createElement('img');
  foto.alt = botao.dataset.descricao;
  foto.width = 600;
  foto.height = 400;
  foto.loading = 'lazy';
  foto.addEventListener('load', () => {
    botao.replaceChildren(foto);
    botao.disabled = false;
    botao.setAttribute('aria-label', 'Ampliar: ' + foto.alt);
  });
  foto.addEventListener('error', () => {
    botao.textContent = 'Foto indisponível';
    botao.disabled = true;
  });
  foto.src = botao.dataset.foto;
  botao.addEventListener('click', () => {
    fotoOrigem = botao;
    porId('foto-ampliada').src = foto.src;
    porId('foto-ampliada').alt = foto.alt;
    porId('foto-legenda').textContent = foto.alt;
    dialogo.showModal();
    document.body.style.overflow = 'hidden';
  });
});
porId('fechar').addEventListener('click', () => dialogo.close());
dialogo.addEventListener('close', () => {
  document.body.style.overflow = '';
  fotoOrigem?.focus();
});

```
