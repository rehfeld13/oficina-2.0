![OFICINA](https://github.com/rehfeld13/oficina-2.0/assets/88861731/e9ef3fe0-8335-4d42-a5c3-63497926faac)

# Projeto OFICINA 2.0

Bem-vindo ao projeto Oficina 2.0! Este repositório contém o código-fonte do front-end utilizando React.js e do back-end utilizando Laravel. Siga as instruções abaixo para configurar o ambiente de desenvolvimento.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- PHP (PHP 8.2.7 ou superior)
  ```
  Certifique-se que no arquivo php.ini ("C:\php\php.ini") os seguintes arquivos: extension=fileinfo, extension=pdo_mysql, extension=zip não estejam com ";" antes do nome, por exemplo ";extension".
  ```
- MySQL (8.0.33 ou superior)
- Node.js (18.15.0 ou superior)
- Composer(v2.5.8 ou superior)

## Configuração do Front-end

Com o Node.js devidamente instalado, siga os passos abaixo para configurar o front-end:

1. Abra o terminal e navegue até o diretório `frontend`.
2. Execute o seguinte comando para instalar as dependências do projeto:

   ```
   npm install
   ```
3. Após a conclusão da instalação, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

   ```
   npm run dev
   ```
   
4. Pronto, isso iniciará o servidor e abrirá o projeto em seu navegador padrão. :)


## Configuração do Back-end

Com o PHP e o Composer devidamente instalados, siga os passos abaixo para configurar o back-end:

1. Abra o terminal e navegue até o diretório `backend`.
2. Execute o seguinte comando para instalar as dependências do projeto:

   ```
   composer install
   ```
3. Repare que no seu código tem um arquivo `.env.example`, copie ele e renomeie a cópia como `.env`.
4. Abra o arquivo .env e configure as variáveis de ambiente necessárias:
`DB_DATABASE`: O nome do seu database criado no MYSQL
`DB_PASSWORD`: A senha do seu MYSQL.

![image](https://github.com/rehfeld13/oficina-2.0/assets/88861731/a33aff06-7d3a-4d8d-b164-b4420b6de420)

5. Antes que me esqueça, execute o seguinte comando para gerar uma chave única(`APP_KEY`) para o projeto:
   ```
   php artisan key:generate
   ```
   
6. Agora, você deve criar um DATABASE em seu banco de dados com o mesmo nome que você colocou no seu `DB_DATABASE`, vamos lá:
- Abra o terminal e execute o seguinte comando para acessar o prompt de comando do MySQL:
   ```
   mysql -u seu_usuario -p
   ```
   Em `_seu_usuario` coloque seu nome de usúario, se você não alterou nada, ele é `root`.
   
- Insira sua senha quando solicitado.
- No prompt do MySQL, execute o seguinte comando para criar um novo banco de dados:
    ```
   CREATE DATABASE nome_do_banco_de_dados;
   ```
   Em `nome_do_banco_de_dados` coloque o nome do seu banco de dados, lembre-se de colocar o mesmo nome no `DB_DATABASE` dentro do arquivo `.env`.
   
- Você pode sair do prompt do MySQL executando o seguinte comando:
    ```
   exit
   ```
7. Agora no terminal do back-end, execute o seguinte comando para executar as migrações e criar as tabelas no banco de dados:
    ```
   php artisan migrate
   ```
8. Por fim, inicie o servidor do back-end com o seguinte comando:
    ```
   php artisan serve
   ```
9. O servidor será iniciado e você poderá acessar o back-end em http://localhost:8000.

    Pronto! Agora você configurou com sucesso o ambiente de desenvolvimento para o projeto oficina 2.0. Você pode acessar o front-end em http://localhost:5173 e o back-end em http://localhost:8000.
    
    Importante: Certifique-se de que o MySQL esteja em execução e todas as configurações de conexão com o banco de dados estejam corretas no arquivo .env.
    
    Se encontrar algum problema durante o processo de configuração, verifique se todas as dependências estão instaladas corretamente e se todas as etapas foram seguidas corretamente.

