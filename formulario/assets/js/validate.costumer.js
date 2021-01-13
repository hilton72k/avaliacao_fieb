
function validate() {
//Valida Data PT-BR
jQuery.validator.addMethod("dateBR", function (value, element) {
    //contando chars
    console.log(value);
    if (value.length != 10)
        return this.optional(element) || false;
    // verificando data
    var data = value;
    var dia = data.substr(0, 2);
    var barra1 = data.substr(2, 1);
    var mes = data.substr(3, 2);
    var barra2 = data.substr(5, 1);
    var ano = data.substr(6, 4);
    if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) {
        return this.optional(element) || false;
    }
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
        return this.optional(element) || false;
    }
    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 !== 0))) {
        return this.optional(element) || false;
    }
    if (ano < 1900) {
        return this.optional(element) || false;
    }
    return this.optional(element) || true;
}, "Informe uma data válida"); /* Mensagem padrão */

  jQuery.validator.addMethod("cpf", function(value, element) {
   value = jQuery.trim(value);

  value = value.replace('.','');
  value = value.replace('.','');
  cpf = value.replace('-','');
  while(cpf.length < 11) cpf = "0"+ cpf;
  var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
  var a = [];
  var b = new Number;
  var c = 11;
  for (i=0; i<11; i++){
    a[i] = cpf.charAt(i);
    if (i < 9) b += (a[i] * --c);
  }
  if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
  b = 0;
  c = 11;
  for (y=0; y<10; y++) b += (a[y] * c--);
  if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

  var retorno = true;
  if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

  return this.optional(element) || retorno;

});

jQuery.validator.addMethod("passwordCheck",
        function(value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[A-Z]/.test(value)) {
                return false;
            } else if (!/[0-9]/.test(value)) {
                return false;
            }else if (!/[!@#$%"!@#$%&*()+=_.,;:'Ã‚Â§/|\\?]/.test(value)) {
                return false;
            }
            return true;
        },
        "Sua senha está fora dos nossos padrões."
	);


jQuery.validator.addMethod("cnpj", function (value, element) {

            var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
            if (value.length == 0) {
                return false;
            }

            value = value.replace(/\D+/g, '');
            digitos_iguais = 1;

            for (i = 0; i < value.length - 1; i++)
                if (value.charAt(i) != value.charAt(i + 1)) {
                    digitos_iguais = 0;
                    break;
                }
            if (digitos_iguais)
                return false;

            tamanho = value.length - 2;
            numeros = value.substring(0, tamanho);
            digitos = value.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) {
                return false;
            }
            tamanho = tamanho + 1;
            numeros = value.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            return (resultado == digitos.charAt(1));
        })

		$( document ).ready( function () {
			$( "#FormValidate" ).validate( {
				rules: {
					cpf: {cpf: true, required: true},
                    nome: { required: true, minlength: 14},
					email: { required: true, email: true },
					telefone: { required: true, minlength: 14 },
					data_nascimento: {required: true, dateBR: true},
					cep: {required: true, minlength: 9},
					endereco: {required: true},
					bairro: {required: true},
					numero: {required: true},
					complemento: {required: false},
					cidade: {required: true},
					estado: {required: true},
                    nivel: {required: true},
                    habilitacao: {required: true},
                    categoria: {required: true},
                    salario: {required: true},
                    cargo: {required: true},
				},
				messages: {
					cpf: {required: 'Por favor, insira seu CPF', cpf: 'CPF inválido'},
					data_nascimento: { dateBR: 'Data de nascimento inválida', required: 'Por favor, insira sua data de nascimento'},
                    nome: { required: "Por favor, insira seu nome completo", minlength: "Nome inválido"},                    
					email: "Por favor, insira um endereço de e-mail válido",
					telefone: { required: "Por favor, insira seu celular", minlength: "Digite o telefone corretamente"	},
					cep:{required: 'Por favor, digite seu CEP', minlength: 'Digite o CEP corretamente.'},
					endereco:{required: 'Por favor, digite seu endereço'},
					bairro:{required: 'Por favor, digite seu bairro'},
					numero:{required: 'Por favor, digite seu número'},
					cidade:{required: 'Por favor, selecione sua cidade'},
                    estado:{required: 'Por favor, selecione seu estado'},
                    habilitacao:{required: 'Por favor, selecione a habilitação'},
                    categoria:{required: 'Por favor, preencha a categoria da habilitação'},
                    salario: {required: "Por favor, informe o salário proposto"},
                    cargo: {required: 'Por favor, selecione o cargo desejado'}					
				},
				errorElement: "em",
				errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "invalid-feedback text-left" );

					// Add `has-feedback` class to the parent div.form-group
					// in order to add icons to inputs
					element.parents( ".col-sm-5" ).addClass( "has-feedback" );

					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "label" ) );
					} else {
						error.insertAfter( element );
                    }

					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !element.next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
					}
				},
				success: function ( label, element ) {
					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !$( element ).next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
					}
				},
				highlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".md-form" ).addClass( "invalid-input" ).removeClass( "valid-input" );
                    $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );             
                    $( element ).addClass( "invalid-input" ).removeClass( "valid-input" );           
				},
				unhighlight: function (element, errorClass, validClass) {
          $( element ).parents( ".md-form" ).addClass( "valid-input" ).removeClass( "invalid-input" );
                    $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
                    $( element ).addClass( "valid-input" ).removeClass( "invalid-input" );
                        
				}
			} );


			});

}

validate();