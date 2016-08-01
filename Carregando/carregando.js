'use strict';

/* Oferece um suporte básico para realizar o carregamento de coleções. */

define([
  'jquery'
, 'underscore'
], function(
  $
, _
) {
  
  var colecaoAninhada = {
    
    /* @Método adicionar(). 
     * Uma forma simples de adicionar as coleções aninhadas de um modelo.
     *
     * @Parametro {Modelo} [modelo] O modelo onde iremos adicionar o nome das coleções aninhadas.
     * @Parametro {Matriz} [colecoesAninhadas] Aquelas coleções aninhadas aos modelos de uma coleção.
     * @Retorna {Matriz} Contendo os nomes das coleções aninhadas ao modelo.
     */
    adicionar: function(modelo, colecoesAninhadas) {
      modelo['colecoesAninhadas'] = colecoesAninhadas;
      return modelo['colecoesAninhadas'];
    },
    
    /* @Método carregar(). 
     * Faz carregar toda uma coleção e também as coleções dos seus modelos.
     *
     * @Parametro {Coleção} [colecao] Uma coleção de modelos.
     * @Parametro {Matriz} [colecoesAninhadas] Aquelas coleções aninhadas aos modelos de uma coleção.
     * @Parametro {Função} [cd] Será chamada quando se estiver carregado todas colecoes aninhadas.
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
                  console.log('Não foi possível carregar a coleção '+ umaColecaoAninhada + ' do modelo ' + modelo.id); 
                }
              }); 
            });
          } else {
            console.log('A coleção ' + umaColecaoAninhada + ' não foi encontrada');
          }
          return lista;
        }, deferidos, this);
      });
      
      $.when.apply(null, deferidos).done(cd);
    }
  };
  
  return colecaoAninhada;
});