
# A função aninharColecao() faz o trabalho de aninhar modelos e coleções mais fácil

Uma das maiores fraquezas do Backbone é em não possuir um suporte para o aninhamento de coleções e modelos. O proposito deste 
pequeno e rápido utilitário é oferecer uma implementação para resolver parte desse problema de design. Se você pretende desenvolver
um projeto de tamanho médio a grande então, acho que você pode necessitar de usar alguma forma de aninhar seus modelos e coleções.

# O problema

A gente sempre precisa aninhar modelos com coleções, o exemplo abaixo sintetiza isso:

```javascript
var caixaDeEmail = Backbone.Model.extend({
  initialize: function() {
    this.mensagens = new Mensagens;
  }
});
 
var minhaCaixa = new caixaDeEmail;
```

Agora imagine que você está utilizando um banco de dados com o [Restificando](https://github.com/umdez/restificando) e vai requisitar todos os dados para seu modelo de email. Então quando você utilizar 'toJSON()' em seu modelo isso vai parecer tipo isso:

```javascript
{
  nomeDaCaixaDeEmail: "Mensagens importantes",
  mensagens: [
    {de: "Jose@dominio", titulo: "Feliz aniversário amigo!"},
    {de: "Maria@dominio", titulo: "Enviei para você todo o projeto da sua casa."}
  ]
}
```

Aqui é onde o grande perigo mora, porque se você mudar ou adicionar uma mensagem de email assim:

```javascript
var mensagemDoJose = minhaCaixa.mensagens.at(1);
mensagemDoJose.set({titulo: "Obrigado amigo!"});
```

O que realmente vai acontecer nesse exemplo é que 'minhaCaixa.toJSON()' vai continuar contendo os dados *originais*. Então o título
"Obrigado amigo!" não será salvo para o servidor... O resultados é que vamos ter que usar truques para corrigir isso. Então é aí que o aninharColecao() entra em jogo para ajudar a resolver essa bagunça.

# Como utiliza-lo

```javascript
var umModeloQualquer = Backbone.Model.extend({
 initialize: function () {
   // Agora as alterações em 'colecaoAninhada' refletirão também em 'umModeloQualquer'
   this.colecaoAninhada = Aninhando.aninharColecao(this, 'colecaoAninhada', new ColecaoAninhada(this.get('colecaoAninhada')));
 }
});
```

Depois de usar o código acima, o 'aninharColecao()' vai modificar os dados do atributo do modelo pai para apontar para os dados da coleção aninhada.

Além disso, toda hora que uma coleção aninhada usar add/remove em um item, esses dados vão ser adicionados nos dados do modelo pai. 
Isso simplesmente resolve de forma elegante o problema de aninhar modelos e coleções.

# Outros projetos

Este utilitário é uma forma de oferecer suporte a esse projeto de design. E estou utilizando ele em alguns projetos. Agora, caso
você esteja iniciando um novo projeto com o Backbone.js, você pode também considerar o uso de outras implementações mais robustas.
Existem diversos outros projetos interessantes e eu listo alguns abaixo:

- http://codrspace.com/vote539/nested-models-and-collections-in-backbone-js/
- https://github.com/afeld/backbone-nested
- https://github.com/PaulUithol/Backbone-relational
- https://github.com/powmedia/backbone-deep-model
