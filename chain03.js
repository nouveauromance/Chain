/* Implemente um sistema de logging utilizando o padrão Chain of Responsibility, onde diferentes 
manipuladores de log tratam mensagens com base em seu nível de severidade. */

// classe base
class LogHandler{
    constructor(){
        this.proximo = null;
    }

    setProximoHandler(proximo){
        this.proximo = proximo;
    }

    handleLog(log){
        throw new Error("Este método deve ser implementado pelas subclasses.");
    }
}

// manipuladores de log concretos
class LoggerConsole extends LogHandler{
    handleLog(log) {
        if (log.nivel === "INFO"){
            console.log("[--OK--] LoggerConsole resolveu a informação básica.");
        }else if (this.proximo) {
            console.log("[--ERROR--] Encaminhando para próximo departamento...");
            this.proximo.handleLog(log);
        }else{
            console.log("[--ERROR--] Erro fatal. Operação encerrada.");
        }
    }
}

class LoggerArquivo extends LogHandler{
    handleLog(log) {
        if (log.nivel === "INFO" || log.nivel === "WARNING"){
            console.log("[--OK--] LoggerArquivo resolveu o aviso.");
        }else if (this.proximo) {
            console.log("[--ERROR--] Encaminhando para próximo departamento...");
            this.proximo.handleLog(log);
        }else{
            console.log("[--ERROR--] Erro fatal. Operação encerrada.");
        }
    }
}

class LoggerEmail extends LogHandler{
    handleLog(log) {
        if (log.nivel === "ERROR"){
            console.log("[--OK--] LoggerEmail resolveu o erro.");
        }else if (this.proximo) {
            console.log("[--ERROR--] Encaminhando para próximo departamento...");
            this.proximo.handleLog(log);
        }else{
            console.log("[--ERROR--] Erro fatal. Operação encerrada.");
        }
    }
}

// objeto log
class Log{
    constructor(nivel) {
        this.nivel = nivel;
    }
}

// configuração de cadeia de responsabilidade
const loggerConsole = new LoggerConsole();
const loggerArquivo = new LoggerArquivo();
const loggerEmail = new LoggerEmail();

loggerConsole.setProximoHandler(loggerArquivo);
loggerArquivo.setProximoHandler(loggerEmail);

// tipos de log
const logINFO = new Log("INFO");
const logWARNING = new Log("WARNING");
const logERROR = new Log("ERROR");

// processando os logs
loggerConsole.handleLog(logINFO);
loggerArquivo.handleLog(logWARNING);
loggerEmail.handleLog(logERROR);