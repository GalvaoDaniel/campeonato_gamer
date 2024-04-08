export default class Competidor {
    id: string;
    primeiroNome: string;
    segundoNome: string;
    email: string;
    telefone: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    UF: string;

    constructor(
        id: string,
        primeiroNome: string,
        segundoNome: string,
        email: string,
        telefone: string,
        cep: string,
        rua: string,
        numero: string,
        bairro: string,
        cidade: string,
        UF: string
    ) {
        this.id = id;
        this.primeiroNome = primeiroNome;
        this.segundoNome = segundoNome;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.UF = UF;
    }

}