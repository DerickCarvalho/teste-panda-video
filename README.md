# Teste Técnico - Panda Video
Resolução de teste técnico para desenvolvedor front-end.

# Tecnologias usadas:
- [x] **VueJS 3: Toda a base do projeto**
- [x] **VueCLI: Criação e gerenciamento do projeto**
- [x] **Vuetify: Biblioteca de componentes**

# Como rodar o projeto:
- Com VueCLI já instalado:
  - Clone o repositório
  - Navegue até a pasta panda-video
  - Execute o comando: npm i
  - Após o fim do comando anterior, execute o comando: npm run serve
  - Acesse um dos links que aparecerem no console, e pronto, projeto em execução.
    
- Sem o VueCLI instalado:
    - Abra o terminal do seu sistema
    - Execute o comando: npm install -g @vue/cli
    - Após o fim do comando anterior, execute o seguinte comando para confirmar que deu tudo certo: vue --version
    - Caso apareça a versão do vue instalada, tudo está nos conformes.
    - Clone o repositório
    - Navegue até a pasta panda-video
    - Execute o comando: npm i
    - Após o fim do comando anterior, execute o comando: npm run serve
    - Acesse um dos links que aparecerem no console, e pronto, projeto em execução.

# Lista de páginas criadas:
- [x] **Login (Validação de API Key)**
- [x] **HomePage - Página inicial do sistema**
- [x] **FolderPage - Página exibida ao acessar alguma pasta**
- [x] **PlayerPage - Página do player de vídeo, incluindo título e descrição editáveis**

# Estimativa de horas gastas em cada atividade feita durante todo o processo:
- [x] **Estudar VueJS (praticamente do 0): 22h**
- [x] **Testes aleatórios para pegar prática com VueJS: 4h**
- [x] **Desenvolvimento total do projeto: 26h**
- **Horas totais gastas: 52h**

# Pontos observados e coisas que eu faria caso não fosse um projeto MVP:
- Pontos observados:
  - VueJS facilita muito o desenvolvimento do projeto. Por eu estar acostumado a criar projetos usando HTML CSS e JS vanilla, quando parti para o Vue, vi o quanto um framework ajuda o desenvolvedor na hora de criar um projeto como esse do teste, ou projetos maiores.
  - O Vuetify facilita bastante a criação das interfaces e a melhora do UX, porém no meu caso, ao incluí-lo no projeto, acabei demorando mais que o habitual para desenvolver as páginas, e por isso acabei optando por não fazer as páginas 100% feitas com ele, e sim mesclando um pouco de Vuetify com CSS vanilla.

- Coisas que eu faria em um projeto maior:
  - Para casos de clientes com uma grande quantidade de vídeos e pastas, seria inviável utilizar array JS normal para tratar essa quantidade de dados, então, em uma breve pesquisa, encontrei a API IndexedDB, então tentaria estudar essa API e implementar.
  - Ainda sobre otimização, durante meus estudos, vi uma técnica chamada virtual-table, que serve para otimizar a renderização de tabelas, então, no caso de um projeto maior, eu buscaria implementar essa técnica para buscar otimizar ainda mais o projeto.


**O.B.S.: Durante o desenvolvimento, observei um possivel erro de digitaçao de um dos endpoints na documentação da API. No site está escrito assim: 
'https://api-v2.pandavideo.com.br/videos//' com duas barras, e observei que com apenas uma barra continua funcionando normal.**
