
# A função aninharColecao() faz o trabalho de aninhar modelos e coleções mais fácil

Uma das maiores fraquezas do Backbone é em não possuir um suporte para o aninhamento de coleções e modelos. O proposito deste 
pequeno e rápido utilitário é oferecer uma implementação para resolver parte desse problema de design. Se você pretende desenvolver
um projeto de tamanho médio a grande então, acho que você pode necessitar de usar alguma forma de aninhar seus modelos e coleções.

# Como utiliza-lo

    var umModeloQualquer = Backbone.Model.extend({
     initialize: function () {
       // Agora as alterações em 'colecaoAninhada' refletirão também em 'umModeloQualquer'
       this.colecaoAninhada = Aninhando.aninharColecao(this, 'colecaoAninhada', new ColecaoAninhada(this.get('colecaoAninhada')));
     }
    });

# Outros projetos

Este utilitário é uma forma de oferecer suporte a esse projeto de design. E estou utilizando ele em alguns projetos. Agora, caso
você esteja iniciando um novo projeto com o Backbone.js, você pode também considerar o uso de outras implementações mais robustas.
Existem diversos outros projetos interessantes e eu listo alguns abaixo:

- http://codrspace.com/vote539/nested-models-and-collections-in-backbone-js/
- https://github.com/afeld/backbone-nested
- https://github.com/PaulUithol/Backbone-relational
- https://github.com/powmedia/backbone-deep-model
