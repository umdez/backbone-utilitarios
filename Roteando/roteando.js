/* Uma extenção do backbone router. provê forma de lidar com rotas dos módulos. 
 */

define([
  'backbone'
, 'underscore'
], function(
  Backbone
, _
) {
  'use strict';

  // Salvamos a referencia para a o método da rota original que será chamada
  // apos a gente modificar o seu comportamento
  var rotaOriginal = Backbone.Router.prototype.route;

  var sop = function() { };

  // Extende a mótodo do roteador com uma função padrão para uma função
  // anterior, uma padrão e uma posterior.
  _.extend(Backbone.Router.prototype, {

    registrador: sop,

    // Re-escreve o método Backbone.Router.prototype.route, que é o método
    // publico utilizado para a adição de rotas na instancia do roteador, e tbm
    // o método que o backbone utiliza internamente para bind de rotas e
    // suportes para o Backbone.history no momento que isso é instanciado.
    route: function(rota, nome, cd) {
      
      // Se não existir uma função chamar denovo (cd) para esta rota, então
      // setamos isso para ser o nome que foi setado na propriedade das rotas do
      // contrutor.
      if(!cd) {
        cd = this[nome];
      };

      // Criamos uma nova função Chamar Denovo para substituir o Chamar Denovo
      // original.
      var cdEnvolvido = _.bind( function() {

        // Registramos aqui cada rota acessada e também seus argumentos.
        if (this.registrador) {
          this.registrador.apply(this, [rota, _.toArray(arguments)]);
        } 

        // Se a função Chamar Denovo existir, então chama ela. 
        if(cd) {
          cd.apply(this, arguments);
        }

      }, this);

      // Chamamos a nossa rota original, substituindo a funcao chamar denovo
      // (cd) que era originalmente passada quando o Backbone.Router.route era
      // invocada com a nossa propria função envolvida.
      return rotaOriginal.call(this, rota, nome, cdEnvolvido);
    }

  });

});