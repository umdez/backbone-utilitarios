# Backbone Roteando

Filtros anteriores e posteriores para um roteador do Backbone. Útil para fazer coisas do tipo
páginas não encontradas - qualquer hora que você quiser fazer algo antes e depois de qualquer rota, isso é
uma boa forma de realizar isso.

## Visão geral

O Roteando trabalha substituindo o Backbone.Router.prototype.route. Sempre que um método de rota é chamado, 
o Roteando envolver a função Chamar Denovo (ou suporte de rota) e dessa forma conseguimos adicionar uma 
Chamar Denovo chamada anteriormente e posteriormente uma determinada rota.

## Suporte de rota e filtro de um construtor do roteador
Você poderá especificar os filtros de três formas:

- Uma única função para anterior/posterior:
```javascript
var UmRoteadorQualquer = Backbone.Router.extend({
  routes: {
    "": "inicio",
    "pagina/:id": "pagina"
  },
  anterior: function(rota, parametros) { ... },
  posterior: function(rota, parametros) { ... },
  inicio: function(){ ... },
  pagina: function(rota){ ... }
});
```
- Um objeto com rotas e suas funções Chamar Denovo
```javascript
var UmRoteadorQualquer = Backbone.Router.extend({
  routes: {
    "": "inicio",
    "pagina/:id": "pagina"
  },
  anterior: {
    "": function(rota) { ... },
    "pagina/:id": function(rota) { ... }
  },
  posterior: function(rota, parametros) { ... },
  inicio: function(){ ... },
  pagina: function(rota){ ... }
});
```

- Ou então, chamando diretamente os métodos
```javascript
var UmRoteadorQualquer = new Backbone.Router.extend({});

UmRoteadorQualquer.anterior = function(rota, parametros) { ... }
UmRoteadorQualquer.route("pagina/:id", "pagina", function(rota) { ... });
```

## Parametros das rotas
O segundo argumento para qualquer função filtro é uma matriz com os valores dos parametros. Então se seu
roteador for tipo isso: pagina/:id/usuarios/:idUsuario, e você disparar a rota: #pagina/12/usuarios/122, então
suas variaveis de parametro serão setadas para: [12,122].

Note que se você estiver especificando seus filtros para cada rota ao invez de apenas uma função Chamar Denovo,
não sobrescreva isso chamando UmRoteadorQualquer.anterior = function... já que isso vai sobrescrever o objeto
completo que você já tinha definido e todas as outras rotas! então nesse caso, apenas defina uma rota em 
especifico que vai adicionar um filtro dessa forma:

```javascript
UmRoteadorQualquer.anterior["pagina/:id"] = function(rota) { ... }
```

## Retornando falso em um filtro anterior
Se caso você retornar falso dentro de um filtro anterior, nem o suporte e o suporte posterior vão ser executados.
Isso é importante no caso de você quiser realizar uma checagem anterior e proibir o acesso de acordo com isso.
Por exemplo:
```javascript
UmRoteadorQualquer.anterior = function(rota, parametros) {
  if( !minhasRotasAceitas.indexOf(rota) ){
    return false;
  }
}
```

## O que acontecerá se minha rota não possuir um suporte?
O Backbone suporta binding de rotas para os nomes delas sem ao menos fornecer um suporte Chamar Denovo para a 
rota. Fazendo isso o Backbone apenas despacha o evento rota:[nome] no roteador onde o nome for encontrado. caso
você tiver escrito uma rota anterior e posterior, eles serão chamadas em qualquer rota que coincida, mesmos que
isso não tenha um suporter de Chamar Denovo.

## Iniciando o uso
Um exemplo simples para iniciar a utilização do Roteando é informada a seguir:

```javascript
var UmRoteadorQualquer = new Backbone.Router.extend({ });

var Controlador = {
  iniciar: function() {
    _.bindAll(this, 'suporteAnterior', 'suporteDeLeitura', 'suportePosterior');

    // Aqui adicionamos a rota anterior e posterior a um suporte qualquer. 
    UmRoteadorQualquer.adcRotaAnterior('UsuariosLeitura/:idUsuario', this.suporteAnterior);
    UmRoteadorQualquer.adcRota('UsuariosLeitura/:idUsuario', this.nome, this.suporteDeLeitura);
    UmRoteadorQualquer.adcRotaPosterior('UsuariosLeitura/:idUsuario', this.suportePosterior);
  },

  suporteAnterior: function() { ... },
  suporteDeLeitura: function() { ... },
  suportePosterior: function() { ... }
};

```

## Créditos
- Todos aqueles que participaram no desenvolvimento do [backbone.routefilter](https://github.com/boazsender/backbone.routefilter)
pois ele foi uma fonte de inspiração.
- Todos os colaboradores da Devowly Sistemas.