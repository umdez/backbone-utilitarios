'use strict';

/* Um gerente para visões do BackBone. */

define([], function() {
  
  var GDV = Backbone.View.extend({

    /* @Propriedade {Objeto} [visoes] Possui todas as referencias às visões existentes. 
     */
    visoes: {},
  
    /* @Método [fecharVisao] Fecha uma visão existente. 
     *
     * @Parametro {Texto} [nome] O nome de uma visão a ser fechada.
     */
    fecharVisao: function(nome) {
      if (typeof this.visoes[nome] !== 'undefined') {
        // Limpa a visão
        // Remove todos os eventos delegados a visão.
        this.visoes[nome].undelegateEvents();
        // Remove a visão do DOM.
        this.visoes[nome].remove();
        // Remove todas as funções CDs (callbacks)
        this.visoes[nome].off();
        
        // Se a visão possuir uma função para chamarmos depois da limpeza.
        if (typeof this.visoes[nome].aoFechar === 'function') {
          this.visoes[nome].aoFechar();
        }
      }
    },
    
    /* @Método [criarVisao] Sempre limpa uma visão existente antes de criar uma nova visão. 
     *
     * @Parametro {Texto} [nome] O nome de uma visão a ser fechada.
     * @Parametro {Função} [cd] Chamada depois para retornar nova instância da nova visão.
     */
    criarVisao: function(nome, cd) {
      this.fecharVisao(nome);
      this.visoes[nome] = cd();
      return this.visoes[nome];
    },

    /* @Método [reusarVisao] Sempre retorna uma visão existente ou chamará cd() para criar uma nova.
     *
     * @Parametro {Texto} [nome] O nome de uma visão a ser reusada ou criada.
     * @Parametro {Função} [cd] Chamada depois para retornar nova instância da nova visão.
     * @Retorna {Visão} Uma visão existente ou uma nova.
     */
    reusarVisao: function(nome, cd) {
      
      if (typeof this.visoes[nome] !== 'undefined') {
        return this.visoes[nome];
      }
      // Executa cd() para retornar nova visão.
      this.visoes[nome] = cd();
      return this.visoes[nome];
    }
 
  });

  return GDV;
});