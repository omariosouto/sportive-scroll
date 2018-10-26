
export default function(scrollEvents) {
    let lastScrollTop = 0;
    let ticking = false;
    let scrollTopPosition
    
    const update = function() { // 5) Só disparamos os eventos registrados para scroll up/down quando o browser está livre pra isso
        const isScrolllingDown = scrollTopPosition > lastScrollTop

        scrollEvents.triggerScrollUpAndDown()
        // if (isScrolllingDown) {
        //     scrollEvents.triggerScrollDown() // [Disparando todos os handlers de scrollDown]
        // } else {
        //     scrollEvents.triggerScrollUp()   // [Disparando todos os handlers de scrollUp]
        // }

        lastScrollTop = scrollTopPosition
        
        ticking = false; // 6) Browser livre para atualizar os valores do scroll novamente, com isso diminuimos a quantidade de vezes que essa função é chamada
    };
    
    const requestTick = function() {
        if (!ticking) {
            window.requestAnimationFrame(update); // 3) Pedindo para o browser fazer um update dos valores de scroll no próximo repaint de tela
            ticking = true; // 4) Browser fazendo um update, não rodar nenhuma vez essa função novamente
        }
    };
    
    const scrollManagerHandler = function() { // 1) Função que roda em cada scroll
        scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
        requestTick(); // 2) Chamando o código que atualiza os valores do scroll sempre que for possível para o browser
    };

    return scrollManagerHandler
}
