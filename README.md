# Pontos importantes

- Evitar gastar processamento desnecessário
- Não ser uma lib intrusiva no Server Side Render
- Ser bem desacoplada do React
- Dar possibilidades para fazer addClass, FLIP animations, ou Libs prontas (GreenSock, VelocityJS)


## Base técnica
- Rodar a 60fps
- Disparar as animações somente quando o usuário estiver próximo de visualizar (baseando no formato como os jogos fazem)
- Não sobrecarregar o scroll (agendar os processamentos futuros)
- Não disparar a função do evento desnecessariamente