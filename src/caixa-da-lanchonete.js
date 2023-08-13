class CaixaDaLanchonete {

    tabela_preco = [{item:"cafe", preco:3.00, flag_extra:0}, {item:"chantily", preco:1.50, flag_extra:1, principal:"cafe"}, 
    {item:"suco", preco:6.20, flag_extra:0}, {item:"sanduiche", preco: 6.50, flag_extra:0}, 
    {item:"queijo", preco:2.00, flag_extra:1, principal:"sanduiche"}, {item:"salgado", preco:7.25, flag_extra:0}, 
    {item:"combo1", preco:9.50, flag_extra:0}, {item:"combo2", preco:7.50, flag_extra:0}];

    forma_pagamento = [{tipo:"dinheiro",desconto:5, acrescimo:0}, 
    {tipo:"debito", desconto:0, acrescimo:0}, {tipo:"credito", desconto:0, acrescimo:3}];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length <= 0) return "Não há itens no carrinho de compra!";
        // condição para se não tiver item

        let array_itens = itens.map(i => i.split(","));
        // faz um array com o item e quantidade
        let total_pedido = 0;
        let pagamento = this.forma_pagamento.find(p => p.tipo === metodoDePagamento.trim().toLowerCase());
        // pega a forma de pagamento na lista

        if(pagamento === undefined) return "Forma de pagamento inválida!";
        // condição para se a forma de pagamento for invalida
        
        array_itens.map((res)=>{
            let item = this.tabela_preco.find(i => i.item === res[0].trim().toLowerCase());
            // pega o item na lista de preço

            if(item === undefined){
                total_pedido = 'Item inválido!';
                // verifica se o item é valido 
                return;
            }
            else if(parseInt(res[1])<=0){
                total_pedido = 'Quantidade inválida!';
                // verifica se a quantidade é valida
                return;
            }
            else if(item.flag_extra === 1 && !array_itens.map(r => r[0].trim().toLowerCase()===item.principal).includes(true)){
                total_pedido = 'Item extra não pode ser pedido sem o principal';
                // verifica se o intem extra está correto
                return;
            }
            else if(!isNaN(total_pedido)){
                total_pedido += item.preco * parseInt(res[1]);
            }
            return;
        });

        // inicio da verificação se tem desconto ou acrescimo
        if(pagamento.acrescimo > 0 && !isNaN(total_pedido)){
            total_pedido = total_pedido + ((pagamento.acrescimo/100)*total_pedido);
            total_pedido = total_pedido.toFixed(2);
            total_pedido = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total_pedido);
            // fazendo calculo de acrescimo e convertendo para dinheiro 
            return `${total_pedido}`;
        }
        else if(pagamento.desconto > 0 && !isNaN(total_pedido)){
            total_pedido = total_pedido - ((pagamento.desconto/100)*total_pedido);
            total_pedido = total_pedido.toFixed(2);
            total_pedido = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total_pedido);
            // fazendo calculo de desconto e convertendo para dinheiro
            return `${total_pedido}`;
        }
        // fim da verificação se tem desconto ou acrescimo

        total_pedido = isNaN(total_pedido)? total_pedido: 
        Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total_pedido.toFixed(2));
        // verificando se é um numero ou string e se for numero ele formata para dinheiro

        return `${total_pedido}`;
    }

}

export { CaixaDaLanchonete };
