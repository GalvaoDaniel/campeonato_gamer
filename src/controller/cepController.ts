import Endereco from "../model/endereco";


export class CepController {
    static endereco?: Endereco;

    static async fetchCep(cep: string): Promise<void> {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                this.endereco = new Endereco(data.cep, data.logradouro, data.bairro, data.localidade, data.uf);
            } else {
                console.log('Cep não encontrado');
                this.endereco = undefined;
            } 
        } catch (error) {
            console.error('Error fetching data: ', error);
            this.endereco = undefined;
        }
    }

    static getEndereco() {
        return this.endereco;
    }
}