'use strict';

/* Oferece um suporte b�sico para realizar o carregamento de cole��es. */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  
  var colecaoAninhada = {
    
    /* @M�todo adicionar(). 
     * Uma forma simples de adicionar as cole��es aninhadas de um modelo.
     *
     * @Parametro {Modelo} [modelo] O modelo onde iremos adicionar o nome das cole��es aninhadas.
     * @Parametro {Matriz} [colecoesAninhadas] Aquelas cole��es aninhadas aos modelos de uma cole��o.
     * @Retorna {Matriz} Contendo os nomes das cole��es aninhadas ao modelo.
     */
    adicionar: function(modelo, colecoesAninhadas) {
      modelo['colecoesAninhadas'] = colecoesAninhadas;
      return modelo['colecoesAninhadas'];
    },
    
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
        
        if (!colecoesAninhadas) {
          colecoesAninhadas = modelo['colecoesAninhadas'];
        }
        
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
        }, deferidos, this);
      });
      
      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return colecaoAninhada;
});