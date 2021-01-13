        $(document).ready(function($) {
            // AO ABRIR A PÁGINA FAZ REQUISIÇÃO PARA RETORNAR OS ESTADOS
            $.ajax({
                url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
                method: 'GET',
                beforeSend: function() {},
                success: function(data) {
                    var html = '<option value="">Selecione o estado</option>';
                    let estados = JSON.parse(data);
                    estados = estados.sort(function(a, b) {
                        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                    });
                    estados.forEach((element) => {
                        html += `<option value="${element.sigla}">${element.nome}</option>`
                    });
                    $("#estado").html(html);
                },
                dataType: 'html'
            });
        });

        $("#estado").change(function({target}) {
            let sigla = target.value;
            if (sigla) {
                $.ajax({
                    url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + sigla + "/municipios",
                    method: 'GET',
                    // ANTES DE ENVIAR VOCÊ PODE ADICIONAR O LOADING
                    beforeSend: function() {
                        $('#cidade').html('<option value="">Carregando...</option>');
                    },
                    success: function(data) {
                        var html = '<option value="">Selecione a cidade</option>';
                        let cidades = JSON.parse(data);
                        cidades = cidades.sort(function(a, b) {
                            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                        });
                        cidades.forEach((element) => {
                            html += `<option value="${element.nome}">${element.nome}</option>`
                        });
                        $("#cidade").html(html);
                    },
                    dataType: 'html'
                });
            } else {
                $("#cidade").html('<option value="">Selecione a cidade</option>');
            }
        });

        $(document).on("keyup", "#cep", function(e) {
            var tamanho_input = $("#cep").val().length;
            if (tamanho_input < 9) {
                $('.carregando').css('display', 'none');
                $('#dados-en').css('display', 'none');
            }
            if (tamanho_input == 9) {
                $('#cep').prop('disabled', true);
                //CASO QUEIRA COLOCAR UM LOADING, BASTA ADICIONAR O GIF COM A CLASSE carregando
                function loading_show() {
                    $('.carregando').css('display', 'block');
                    $('#dados-en').css('display', 'none');
                }
                //Função que esconde a imagem da gif de loading
                function loading_hide() {
                    $('.carregando').css('display', 'none');
                }
                var cep_consultado = $('#cep').val();
                var numsStr = cep_consultado.replace(/[^0-9]/g, '');
                $.ajax({
                    url: "https://viacep.com.br/ws/" + numsStr + "/json/unicode/",
                    method: 'GET',
                    crossDomain: true,
                    // ANTES DE ENVIAR VOCÊ PODE ADICIONAR O LOADING
                    beforeSend: function() {
                        //Chama a função para mostrar a imagem gif de loading antes do carregamento
                        loading_show();
                    },
                    success: function(data) {
                        $('#dados-en').css('display', 'block');
                        console.log(data);
                        var endereco = JSON.parse(data);
                        if (endereco['erro'] == true) {
                            $('.carregando').css('display', 'none');
                            $('#dados-en').css('display', 'none');
                            Swal.fire('Oops...', 'CEP inválido, tente novamente.', 'error');
                            $('.cep').parents(".md-form").addClass("invalid-input").removeClass("valid-input");
                            $('.cep').addClass("is-invalid").removeClass("is-valid");
                            $('.cep').val('');
                        } else {
                            $('#endereco').val(endereco['logradouro']);
                            $('#bairro').val(endereco['bairro']);
                            $('#complemento').val(endereco['complemento']);
                        }
                        $('#cep').prop('disabled', false).focus();
                        // ESCONDE O LOADING
                        loading_hide();
                        return;
                    },
                    dataType: 'html'
                });
            }
        }); //END AJAX