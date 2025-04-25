/* Desenvolva um sistema de validação de formulário utilizando o padrão Chain of Responsibility, 
onde cada manipulador valida um campo específico. */

// classe base
class ValidadorHandler{
    constructor(){
        this.proximaEtapa = null;
    }

    setProximaEtapa(proximaEtapa){
        this.proximaEtapa = proximaEtapa;
    }

    handleValidador(validador){
        throw new Error("Este método deve ser implementado pelas subclasses.");
    }
}

// sistemas de validação concretos
class ValidadorEmail extends ValidadorHandler{
    handleValidador(validador){
        if (validador.formato === "email") {
            console.log("[--OK--] Formato de formulário verificado. Sucesso.");
        } else {
            console.log("[--FAIL-] Formato inválido. Operação encerrada.");
        }
    }
}

function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(senha);
} 

function validarUsername(user) {
    const lista = [user1234, user1111, user2222, user3333, user4444];
    return lista.test(user);
} 

class ValidadorSenha extends ValidadorHandler{
    handleValidador(validador){
        console.log("[--WAIT--] Verificando...");
        if (validador.formato === "senha") {
            validarSenha(validador.formato)
                console.log("[--OK--] Formato válido.")
        } else {
            console.log("[--FAIL-] Senha inválida. Operação encerrada.");
        }
    }
}

class ValidadorUsername extends ValidadorHandler{
    handleValidador(validador){
        console.log("[--WAIT--] Verificando...");
        if (validador.formato === "username") {
            console.log("[--OK--] Formato válido.")
        } else {
            validarUsername(validador.formato)
            console.log("[--FAIL-] Username inválido. Operação encerrada.")
        }
    }
}