$(function() {
    $('.data_nasc').mask('99/99/9999');
    $('.time').mask('00:00');
    $('.number').mask('999999999999999');  
    $('.cep').mask('00000-000');
    $('.cpf').mask('000.000.000-00', {reverse: false});
    $('.money').mask('#.##0,00', {reverse: true});  
    var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
      onKeyPress: function(val, e, field, options) {
          field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };  
    $('.sp_celphones').mask(SPMaskBehavior, spOptions);
  });