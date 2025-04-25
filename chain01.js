// classe abstrata
class DescontoHandler{
    constructor(){
        this.proximo = null;
    }

    setProximo(proximo){
        this.proximo = proximo;
    }

    aprovarDesconto(percentual){
        throw new Error("Esse método deve ser implementado pelas subclasses");
    }
}

// classes concretas
class GerenteVendas extends DescontoHandler{
    aprovarDesconto(percentual){
        if(percentual <= 0.05){
            console.log(`Gerente de vendas aprovou desconto de ${percentual * 100}%`);
        }else if (this.proximo){
            this.proximo.aprovarDesconto(percentual);
        }else{
            console.log("Desconto não pode ser aprovado.");
        }
    }
}

class DiretorVendas extends DescontoHandler{
    aprovarDesconto(percentual){
        if(percentual <= 0.15){
            console.log(`Diretor de vendas aprovou desconto de ${percentual * 100}%`);
        }else if (this.proximo){
            this.proximo.aprovarDesconto(percentual);
        }else{
            console.log("Desconto não pode ser aprovado.");
        }
    }
}

class CEO extends DescontoHandler{
    aprovarDesconto(percentual){
        console.log(`CEO aprovou o desconto de ${percentual * 100}%`);
    }
}

// utilização - chamado pelo cliente
const gerente = new GerenteVendas();
const diretor = new DiretorVendas();
const ceo = new CEO();

gerente.setProximo(diretor);
diretor.setProximo(ceo);

// pedido de desconto
gerente.aprovarDesconto(0.02);
gerente.aprovarDesconto(0.10);
gerente.aprovarDesconto(0.20);