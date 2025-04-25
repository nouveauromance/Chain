// classe base
class EtapaProcesso{
    constructor(){
        this.proximaEtapa = null;
    }

    setProximaEtapa(proximaEtapa){
        this.proximaEtapa = proximaEtapa;
    }

    processar(pagamento){
        throw new Error("Este método deve ser implementado pelas subclasses.");
    }
}

// etapas concretas - manipulador
class EtapaConexao extends EtapaProcesso{
    processar(pagamento){
        console.log("[--START--] Início do processo de pagamento!");
        // lógica de conexão
        console.log("[01] Estabelecendo Conexão...");
        if(true){ // operação bem sucedida
            console.log("[--OK--] Conexão estabelecida.");
        }if(this.proximaEtapa){
            this.proximaEtapa.processar(pagamento);
        }else{ // tratativa para caso de falha de conexão nesse bloco
            console.log("[--FAIL--] Falha de conexão. Processamento Encerrado.");
        }
    }
}

class EtapaValidacao extends EtapaProcesso{
    processar(pagamento){
        console.log("[02] Validação de informação de pagamento...");
        if(pagamento.valor > 0){ // lógica de validação de informação de pagamento
            console.log("[--OK--] Informações validadas.");
            if(this.proximaEtapa){
                this.proximaEtapa.processar(pagamento);
            }
        }else{ // tratativa para caso de falha de conexão nesse bloco
            console.log("[--FAIL--] Informações inválidas. Processo encerrado.");
        }
    }
}

class EtapaEnvioInformacao extends EtapaProcesso{
    processar(pagamento){
        console.log("[03] Envio de informações de pagamento...");
        // logica de envio das informações de pagamento
        console.log("[--OK--] Informações enviadas.");
        if(this.proximaEtapa){
            this.proximaEtapa.processar(pagamento);
        }
    }
}

class EtapaAutenticacao extends EtapaProcesso{
    processar(pagamento){
        console.log("[04] Autenticação do pagamento...");
        if(true){ // logica da autenticação do pagamento
            console.log("[--OK--] Pagamento autenticado.");
            if(this.proximaEtapa){
                this.proximaEtapa.processar(pagamento);
            }else{ // tratativa para caso de falha de autenticação
                console.log("[--FAIL--] Autenticação inválidas.Processo encerrado.");
            }
        }
    }
}

class EtapaConfirmacao extends EtapaProcesso{
    processar(pagamento){
        console.log("[--OK--] Confirmação do pagamento.");
        // lógica de confirmação do pagamento
        console.log("[--END--] Pagamento realizado com sucesso!");
    }
}

// objeto pagamento
class Pagamento{
    constructor(valor){
        this.valor = valor;
        // outros dados relevantes (se necessário)
    }
}

// cliente
class Cliente{
    iniciarProcessoPagamento(valor){
        // criação de etapas
        const etapaConexao = new EtapaConexao;
        const etapaValidacao= new EtapaValidacao;
        const etapaEnvio = new EtapaEnvioInformacao;
        const etapaAutenticacao = new EtapaAutenticacao;
        const etapaConfirmacao = new EtapaConfirmacao;

        // configuração da cadeia
        etapaConexao.setProximaEtapa(etapaValidacao);
        etapaValidacao.setProximaEtapa(etapaEnvio);
        etapaEnvio.setProximaEtapa(etapaAutenticacao);
        etapaAutenticacao.setProximaEtapa(etapaConfirmacao);

        // criação do pagamento
        const pagamento = new Pagamento(valor);

        // início do processo
        etapaConexao.processar(pagamento);
    }
}

// uso
const cliente = new Cliente;
cliente.iniciarProcessoPagamento(500);

/* uso (vai dar erro)
const cliente1 = new Cliente;
cliente.iniciarProcessoPagamento(); */