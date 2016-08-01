'use strict';

/* Oferece um suporte b�sico para realizar o carregamento de cole��es. */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  
  var CarregarColecao = {
    
    /* @M�todo carregar(). 
     * Faz carregar toda uma cole��o e tamb�m as cole��es dos seus modelos.
     *
     * @Parametro {Cole��o} [colecao] Uma cole��o de modelos.
     * @Parametro {Matriz} [colecoesAninhadas] Aquelas cole��es aninhadas aos modelos de uma cole��o.
     * @Parametro {Fun��o} [cd] Ser� chamada quando se estiver carregado todas colecoes aninhadas.
     */
    carregar: function(colecao, colecoesAninhadas, cd) { 
      
      var deferidos = [];
      
      if (!colecao.length) {
        colecao.fetch();
      }
      
      _.each(colecao.models, function(modelo) {
        
        deferidos = _.reduce(colecoesAninhadas, function(lista, umaColecaoAninhada) {
          
          if (modelo && modelo[umaColecaoAninhada] !== undefined) {  
            lista.push(function() {
              modelo[umaColecaoAninhada].fetch({
                async: false, error: function(colecao, resp, opcs){
                  console.log('N�o foi poss�vel carregar a cole��o '+ umaColecaoAninhada + ' do modelo ' + modelo.id); 
                }
              }); 
            });
          } else {
            console.log('A cole��o ' + umaColecaoAninhada + ' n�o foi encontrada');
          }
          return lista;
        }, [], this);
      });
      
      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return CarregarColecao;
});