import Endereco from "../model/endereco";

type EnderecoSuccessResponse = {
    isOk: true;
    data: Endereco;
    error: null;
  };
  
  type EnderecoErrorResponse = {
    isOk: false;
    data: null;
    error: string;
  };
  
  type EnderecoResponse =
    | EnderecoSuccessResponse
    | EnderecoErrorResponse;

export const getEnderecoDetails = async ( cep:string ): Promise<EnderecoResponse> => {
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: any = await resp.json();

      return {
        isOk: true,
        data: new Endereco(data.cep, data.logradouro, data.bairro, data.localidade, data.uf),
        error: null,
      };
    } catch (e) {
      console.log("Erro ao executar fetch da api de cep: " + e);
      return {
        isOk: false,
        data: null,
        error: (e as Error).message,
      };
    }
  };