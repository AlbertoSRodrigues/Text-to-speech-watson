<h1 align="center">Text To Speech - IBM Watson</h1>

## Sobre

<p style="color: black;"> Text to speech - IBM Watson, é uma ferramenta disponibilizada pela IBM, com uso grátis de 	
10.000 caracteres por mês, e nesse exemplo, utiliza-se o Text to speech, por meio de uma chamada de API, para ler diferentes frases inseridas pelo usuário </p>

## Pré-requisitos

Programas necessários para a inicialização: 

<a href="https://nodejs.org/en/"> * Node.js</a><br>
<a href="https://www.mysql.com/"> * MySQL</a>


## Dependências:

* Clone o projeto;
* Acesse o diretório /server ,abra o arquivo index.js e ajuste suas credenciais do banco de dados (user e password)
* Ainda no diretório /server ,execute o seguinte comando para instalar as dependências do servidor:
```sh
npm install
```
* Agora acesse o diretório /client , e execute o mesmo comando para instalar as dependências do cliente:
```sh
npm install
```


## Inicializando o servidor

* Acesse o diretorio /server, e execute o seguinte comando para inicializar o servidor (back-end):

```sh
node index.js
```
irá aparecer conectado a porta 3001, mantenha o terminal aberto e abra outra aba para executar o cliente.
## Inicializando o cliente

* Acesse o diretório /client, execute o seguinte comando para inicializar o cliente (front-end):

```sh
npm start
```
-Uma página abrirá automaticamente no endereço : http://localhost:3000/, mas caso não abra, basta acessar manualmente.

## Utilizando

Basta digitar um texto na caixa de comentário e clicar em 'cadastrar', o mesmo texto irá aparecer no lado direito, acompanhado de um botão "ouvir",<b> espere 5 segundos </b>, e pressione o botão "ouvir".

## Possíveis melhorias:
* Separar o login do servidor e da API watson em um arquivo especifico;
* Deixar o botão incapaz de ser clicado enquanto o arquivo de audio é baixado;
* Adicionar botão para deletar todos, ou individualmente os textos;

**Feito por :**

<p>Alberto Sartori Rodrigues</p>
