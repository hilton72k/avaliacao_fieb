// Essa função calcula a carga horária do dia.
function diferencaHoras(horaInicial, horaFinal, horaDescanso){
    var ms = moment(horaFinal,"HH:mm").diff(moment(horaInicial,"HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours());
    var result = s - horaDescanso;
    return result;
}

// Essa função calcula a carga horária 
function cargaHorariaSemanal() {
    let hr_total1 = parseInt($('#hr_total1').val());
    let hr_total3 = parseInt($('#hr_total3').val());
    let hr_total2 = parseInt($('#hr_total2').val());
    let hr_total4 = parseInt($('#hr_total4').val());
    let hr_total5 = parseInt($('#hr_total5').val());
    let carga_total = hr_total1 + hr_total2 + hr_total3 + hr_total4 + hr_total5;
    
    $("#carga_total").html(carga_total);
    if(carga_total < 20){
        alert('Atenção, sua carga horária semanal está abaixo de 20 horas.');
    } else if (carga_total > 40){
        alert('Atenção, sua carga horária semanal está acima de 40 horas.');
    }
    
}


  function empty(mixedVar, noZero = true) {
      if (noZero) var key, i, len, emptyValues = [undefined, 'unknown', 'undefined', NaN, 'none', '0000-00-00', 'NaN', 'null', 'false', null, false, 0, '', '0', []];
      else var key, i, len, emptyValues = [undefined, 'unknown', 'undefined', NaN, 'none', '0000-00-00', 'NaN', 'null', 'false', null, false, '', []];
      for (i = 0, len = emptyValues.length; i < len; i++) {
          if (mixedVar === emptyValues[i]) {
              return true
          }
      }
      if(!mixedVar)
          return false;
      if (typeof mixedVar === 'object') {
          for (key in mixedVar) {
              if (mixedVar.hasOwnProperty(key)) {
                  return false
              }
          }
          return true
      }
      return false
  }