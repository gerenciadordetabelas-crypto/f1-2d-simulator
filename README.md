# Kart 2T Manager

Simulador e gerenciador de campeonato de kart 2 tempos (2T) para navegador.

## Conceito inicial
- Uma única categoria: **Kart 2T**.
- Interface em português, com tema escuro e detalhes amarelos.
- Tela principal de gerenciamento separada da tela de simulação 2D.
- Dados demonstrativos de kartistas e equipes enquanto o cadastro oficial do campeonato não é definido.
- Progresso da simulação salvo localmente no navegador.

## Simulação 2D
- Kartódromo Serra Azul cadastrado como primeira pista oficial, com mapa aéreo no diretório de pistas e traçado correspondente na simulação 2D.
- Karts desenhados individualmente no mapa.
- Classificação atualizada durante a prova.
- Controles de largada, iniciar, pausar, reiniciar e velocidade 1x, 2x, 4x e 8x.
- Seleção de kartista na pista ou na classificação.

O Kartódromo Serra Azul utiliza o mapa cadastrado para a etapa 01. A segunda pista do Campeonato Brasileiro Mirim 2T permanece como traçado provisório até sua definição.

## Publicação
O projeto é uma aplicação estática para GitHub Pages. A publicação é feita pelo workflow em `.github/workflows/deploy.yml`.
