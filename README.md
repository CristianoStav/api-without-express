# API-WITHOUT-EXPRESS

## Visão geral
Aplicação criada sem o uso de frameworks, para testar os conhecimentos.

## Tecnologias e Bibliotecas
Foram utilizadas bibliotecas apenas para a criação dos testes.

- NodeJs;
- Mocha;
- Chai;

## Iniciando a aplicação
Para iniciar a aplicação basta digitar o comando:

```bash
  $ npm start
```

## Rotas

`GET` - (http://localhost:3000/quote/{origem}/{destino}) - Retorna a rota mais barata entra os dois pontos;

`POST` - (http://localhost:3000/route) - Insere uma nova rota no sistema;

EX:
```json
  body: {
    "from": "GRU",
    "to": "CDG",
    "price": 54
  }
```

## Testes
Para executar os testes da aplicação, execute o seguinte comando:

```bash
  $ npm i

  $ npm test
```