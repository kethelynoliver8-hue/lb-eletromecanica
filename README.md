# LB Eletromecânica — banner e serviços

Site estático, pronto para GitHub Pages. HTML, CSS e JavaScript separados, sem dependências externas.

## Publicar no GitHub Pages

1. Extraia o ZIP e abra a pasta `LB Eletromecânica`.
2. Envie o conteúdo dessa pasta para a raiz do repositório: `index.html`, `styles.css`, `script.js`, `README.md` e `assets/`.
3. Em Settings → Pages, selecione Deploy from a branch, a branch `main` e a pasta `/ (root)`. Salve.
4. Aguarde a publicação e abra o endereço exibido pelo GitHub. Se estiver substituindo uma versão, atualize todos os arquivos alterados e faça uma recarga completa.

## Trocar telefone e atendimento

Em `script.js`, preencha `WHATSAPP_NUMBER` somente com dígitos, incluindo 55 e o DDD. Altere `MESSAGE` para a mensagem inicial desejada. Todos os botões de orçamento reutilizam essa função.

O telefone ainda não foi informado. Enquanto estiver vazio, os botões exibem uma mensagem na própria seção; nenhum número fictício foi inserido.

## Imagens, logo e ícones

- Banner aprovado: `assets/images/hero-concertina.png`.
- Cerca elétrica da seção de serviços: `assets/images/cerca-eletrica-servicos.png`.
- Ícones 3D: os quatro PNGs em `assets/icons/`, com nomes correspondentes a cada serviço.
- Logo original: `assets/logo/logo-original.png`. O cabeçalho utiliza camadas CSS para clarear as letras e preservar o símbolo e a faixa laranja. Confira `.brand-base`, `.brand-symbol` e `.brand-strip` caso substitua o arquivo por uma marca de proporção diferente.
- Favicon: `assets/icons/favicon.svg`.

As imagens de serviços têm largura e altura declaradas, carregamento lazy e proporção preservada. Os arquivos originais dos ícones foram usados sem redesenho. A transparência foi conferida sobre grafite.

## Textos, cores e efeitos

- Edite os textos diretamente no `index.html`. A seção usa `id="servicos"`, título H2 e quatro títulos H3.
- Cores, fontes e espaçamentos são variáveis em `:root` no `styles.css`. A seção usa `--services-background`, `--services-heading`, `--service-icon` e `--section-space`.
- A transição entre banner e serviços é feita por `.hero::after` e `.section-transition`.
- As luminárias usam `.light-pair`, `lamp-breathe` e coordenadas `data-wall-*`/`data-ground-*` no HTML, alinhadas ao recorte da imagem por `alignLights()`.
- A profundidade da cena funciona em dispositivos com mouse. No celular, fica estática.
- A entrada dos serviços usa IntersectionObserver; sem JavaScript, o conteúdo permanece visível. A preferência por movimento reduzido desativa as animações.

## Próximas seções

Projetos, Regiões e Dúvidas ainda não têm conteúdo e seus nomes no menu permanecem como texto. “Serviços” e “Conhecer serviços” já levam à seção implementada.

Galeria e avaliações ainda não foram adicionadas. Quando houver fotos, podem ser guardadas em `assets/images/`; use apenas avaliações e informações reais fornecidas pela empresa.

## Capturas

A pasta `preview/`, quando incluída, contém capturas reais do site para revisão. É opcional na publicação e pode ser removida.

## Energia na imagem dos serviços

A camada `.fence-energy` desenha pequenas descargas luminosas entre os fios da ilustração. As posições originais ficam no array `wires` em `script.js`; atualize-as se trocar a imagem. Cada arco dura 480 ms, com intervalo variável entre 4,8 e 7,1 segundos. O efeito para fora da tela, quando a aba está em segundo plano ou quando há preferência por movimento reduzido. É um efeito visual ilustrativo, sem modificar o PNG original.

## Galeria de projetos
Nove fotos em `assets/images/projetos/`, com filtros Todos, Concertina e Cerca elétrica. Os quadros têm proporção 4:3 e usam `object-fit: cover` para preencher toda a área sem faixas. Isso recorta discretamente as fotos mais largas. Ao clicar, o diálogo mostra a imagem completa com `object-fit: contain`; Escape fecha. A foto vertical com a escada foi removida. Categorias e legendas ficam em `index.html` nos atributos `data-category`. No celular, uma coluna mantém as fotos legíveis.

## Regiões de atendimento
A seção `#regioes` contém somente as 12 cidades aprovadas. Edite os botões `data-city` em `index.html` para mudar a lista. O mapa público do Google Maps inicia em Curitiba, é carregado sob demanda e atualiza ao selecionar outra cidade. Requer conexão à internet. O mapa representa a cidade, não um endereço comercial. O link abaixo abre a seleção no Google Maps. O botão e o link para cidades não listadas reutilizam `WHATSAPP_NUMBER` em `script.js`; configure o telefone real antes de publicar.

## Depoimentos
Seção `#depoimentos` antes de Regiões, com seis avaliações transcritas dos anexos, estrelas e símbolo do Google em `assets/icons/google.svg`. Para trocar nomes e textos, edite os artigos `.review-slide` em `index.html`. Rosilda contém somente o trecho visível no print, identificado como trecho. Navegação manual por setas ou gesto no celular; sem avanço automático e sem datas relativas. Respeita movimento reduzido.

O fundo dos depoimentos usa `--testimonials-background` (cinza #111923), na mesma cor da seção de Projetos, com espaçamento interno. As aspas decorativas foram invertidas.

## Principais Dúvidas
Seção `#duvidas` após Regiões, com perguntas e respostas em HTML. Edite os elementos `<details>` em `index.html`. O acordeão nativo funciona com teclado e sem JS. O botão de dúvidas reutiliza o telefone de `script.js`. Respostas não afirmam preço, prazo fixo, garantia ou certificação.

## Rodapé e WhatsApp flutuante
Rodapé na mesma cor das avaliações (`--testimonials-background`), usando as três camadas da logo corrigida. Links apontam para as seções. O botão flutuante e o contato no rodapé usam `WHATSAPP_NUMBER` em `script.js`: preencha com o telefone real antes de publicar; enquanto vazio, mostram aviso e não abrem um número fictício. Ícone em `assets/icons/whatsapp.svg`. Barra de rolagem laranja via CSS; sua aparência depende do navegador e do sistema.

Cabeçalho fixo com fundo grafite durante a rolagem. No celular, links aparecem em uma segunda linha. A altura é medida para posicionar as âncoras abaixo do menu. Ícone do WhatsApp corrigido em SVG.

Contato configurado: (41) 99613-8842 (`5541996138842` no WhatsApp). Todos os botões de orçamento, dúvidas, rodapé e botão flutuante usam esse número.

O rodapé usa o mesmo azul da seção do mapa (`--regions-background`, #18222d). As avaliações continuam com o grafite da seção de Projetos.

Depoimentos em carrossel de cartões iguais. A altura acompanha o maior texto em cada largura; nenhum depoimento é truncado. Setas e deslize nativo, sem avanço automático.

O cabeçalho acompanha a página até Dúvidas: ao chegar ao rodapé, sai da tela junto com o fim do conteúdo.

Carrossel tradicional: 3 cartões no desktop, 2 no tablet e 1 no celular. Os cartões têm tamanhos iguais. Textos longos usam resumo visual de seis linhas e botão para abrir a avaliação completa.

Ordem das avaliações: textos mais longos primeiro, seguidos pelos mais curtos.

## Quem Somos
Seção `#quem-somos` logo após o banner, antes de Serviços. Texto aprovado em `index.html`; selo 3D transparente em `assets/images/selo-qualidade.png`. O selo representa o compromisso de qualidade da empresa, não uma certificação externa. Links adicionados ao cabeçalho e rodapé.

Botão Solicitar orçamento em Quem Somos usa o mesmo WhatsApp configurado em `script.js`.

Quem Somos usa o mesmo fundo de Projetos (`--projects-background`, #111923).

Transição do banner para Quem Somos com degradê no fim da imagem e fundo contínuo #111923, sem faixa azul intermediária.


### Transição do banner para Quem Somos
A transição usa uma única camada de degradê que atravessa a junção das seções. A faixa intermediária foi ocultada para eliminar a divisão marcada. Conferido em 1440, 360, 390 e 430 px, sem rolagem horizontal.


Transição atual: Quem Somos sobrepõe o final do banner com fundo transparente que se torna azul escuro gradualmente. CSS versionado no HTML para carregar a alteração após publicação.


Selo: giro para a esquerda em ciclo de 10 segundos, duas faces e reflexo dourado com máscara transparente. Animações pausam fora da tela e respeitam prefers-reduced-motion. Ajustes em seal-turn e seal-reflection no styles.css.

Selo atualizado: inclinação suave até 24 graus para a esquerda e retorno, sem volta completa. Reflexo branco reforçado. Os três destaques entram em sequência (intervalo de 200 ms), uma única vez ao aparecerem na tela.

Reflexo atualizado: menor intensidade, limitado ao anel das inscrições, sem halo externo.

Destaques entram da esquerda em sequência. Máscara do reflexo dimensionada pelo raio do selo (closest-side), excluindo o check central.

Ajustes mobile (até 750 px): menu hambúrguer acessível, textos do banner abaixo da concertina e direitos reservados em linha única. Desktop preservado.
