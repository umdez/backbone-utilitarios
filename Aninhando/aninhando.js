/* Oferece suporte básico para modelos e coleções aninhados. */

define([
  'underscore'
], function(
  _
) {
  'use strict';
  
  var Aninhando = {
    
    /* @Método [aninharColecao] oferece suporte a modelos e coleções aninhadas. 
     *
     * @Parametro {Modelo} [modelo] Uma instancia de um modelo.
     * @Parametro {Texto} [nomeDoAtributo] Nome do atributo do modelo onde a coleção aninhada está.
     * @Parametro {Colecao} [colecaoAninhada] Uma coleção a ser aninhada.
     * @Retorna {Colecao} A coleção informada.
     */
    aninharColecao: function(modelo, nomeDoAtributo, colecaoAninhada) {
      
      // Inicia as referencias
      for (var i = 0; i < colecaoAninhada.length; i++) {
        modelo.attributes[nomeDoAtributo][i] = colecaoAninhada.at(i).attributes;
      }
      
      // A cada modelo adicionado nós iremos armazena-lo.
      colecaoAninhada.bind('add', function (modeloAdicionado) {
        if (!modelo.get(nomeDoAtributo)) {
          // Cria uma matriz vazia se não achar o atributo
          modelo.attributes[nomeDoAtributo] = [];
        }
        // Insere o modelo adicionado 
        modelo.get(nomeDoAtributo).push(modeloAdicionado.attributes);
      });
      
      colecaoAninhada.bind('remove', function (modeloRemovido) {
        var objetoDeAtualizacao = {};
        objetoDeAtualizacao[nomeDoAtributo] = _.without(modelo.get(nomeDoAtributo), modeloRemovido.attributes);
        modelo.set(objetoDeAtualizacao);
      });
  
      return colecaoAninhada;
    }
    
  };
  
  return Aninhando;
});