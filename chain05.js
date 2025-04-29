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

    handleValidador(validador, valor){
        throw new Error("Este método deve ser implementado pelas subclasses.");
    }
}

// sistemas de validação concretos
function validarEmail(email){
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
   return regexEmail.test(email)
}

function validarSenha(senha){
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexSenha.test(senha);
}

class ValidadorEmail extends ValidadorHandler{
    handleValidador(validador, valor){
        if (validador === "email") {
            if (validarEmail(valor)) {
                console.log("[--OK--] Formato de formulário verificado. Sucesso.");
            } else {
                console.log("[--FAIL-] Formato inválido. Operação encerrada.");
            }
        }
    }
}

class ValidadorSenha extends ValidadorHandler{
    handleValidador(validador, valor){
        if (validador === "senha") {
            if (validarSenha(valor)) {
                console.log("[--OK--] Formato válido.")
            } else {
                console.log("[--FAIL-] Senha inválida. Operação encerrada.");
            }
        }
    }
}

class ValidadorUsername extends ValidadorHandler{
    handleValidador(validador, valor){
        if (validador === "username") {
            if (validarUsername(valor)) {
                console.log("[--OK--] Formato válido.")
            } else {
                validarUsername(validador.formato)
                console.log("[--FAIL-] Username inválido. Operação encerrada.")
            }
        }
    }
}

// uso
const usuariosRegistrados = ["usuario123", "usuarioFATEC", "usuario777"]

function validarUsername(user){
    return !usuariosRegistrados.includes(user);
}
 
const validaEmail = new ValidadorEmail();
const validaSenha = new ValidadorSenha();
const validaUsername = new ValidadorUsername();
 
validaEmail.setProximaEtapa(validaSenha);
validaSenha.setProximaEtapa(validaUsername);
 
console.log(validaEmail.handleValidador("email", "emailTeste@gmail.com"));
console.log(validaSenha.handleValidador("senha", "SenhaTeste158"))
console.log(validaUsername.handleValidador("username", "Nat579"));
