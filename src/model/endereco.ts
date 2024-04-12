export default class Endereco{
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;

    constructor(
        cep: string,
        rua: string,
        bairro: string,
        cidade: string,
        uf: string
    ) {
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }
}