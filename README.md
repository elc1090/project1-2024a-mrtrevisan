# Projeto: Remake de site/app web
![Screenshot do projeto](https://github.com/elc1090/project1-2024a-mrtrevisan/blob/main/image.png "Screenshot do projeto")

#### Acesso:  
https://elc1090.github.io/project1-2024a-mrtrevisan/

#### Desenvolvedor
Mauro Roberto Machado Trevisan - Ciência da Computação

#### Site/app escolhido
Pesquisas/Pesquisadores Serrapilheira 

##### Link
https://serrapilheira.org/pesquisadores

##### Descrição
O site escolhido se trata de uma página portifólio de vários pesquisadores apoiados pelo Instituto Serrapilheira, separados por área de atuação. De aparência simples, o site possui estrutua repetitiva, e não utiliza frameworks como Bootstrap. Também, não há utilização de técnicas como HTML semântico (todos os elementos são tags 'div').

#### Desenvolvimento
Para obter o conteúdo da página, foi utilizado um script JavaScript rodando em NodeJS (scrapper). Nesse, são feitas requisições à pagina original até que todo o conteúdo seja carregado (total 13 requisições), então são extraídos dados como nome, área de projeto, frase legado e links.  

Esses dados são armazenados em um arquivo JSON. Esse arquivo é carregado via JS e seu conteúdo é estruturado dinamicamente no HTML.  

O header e o footer do site foram construídos manualmente, usando o código original do site como base (via F12).

Meu foco no remake do site foi deixar o conteúdo visível o mais enxuto e (ao mesmo tempo) interativo possível. 


#### Tecnologias

- HTML
- CSS
- JavaScript e JSON
- NodeJS
- Pacotes Axios e Cheerio

#### Ambiente de desenvolvimento

- Visual Studio Code
- Extensão Live Preview (Microsoft)
- Github
- Github Pages

#### Referências e créditos

- https://www.w3schools.com/ (Referencial teórico de diversos tópicos sobre HTML e CSS);
- https://stackoverflow.com/ (O bom e velho StackOverlow, para solucionar problemas como "centralizar uma div!!!" );
- https://chat.openai.com/  
(Perguntas ao Chat GPT! Como, por exemplo: "Me ajude com um código em node que faça scrapping do seguinte site "serrapilheira.org/pesquisadores" e extraia todos os itens do tipo 'serra-grid-item pesquisador'");
- https://icons8.com/icons/set/social-media  
(Biblioteca de ícones de mídias sociais usados no footer);
- A ajuda dos colegas Ramon Godoy Izidoro e Jhuan Luis Almeida Assumpção foi imprescindível para conclusão do trabalho!




---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2024a) em 2024a
