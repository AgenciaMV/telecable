(function(mycode) {
    // The global jQuery object is passed as a parameter
  	mycode(window.jQuery, window, document);
}(function($, window, document) {
	// The $ is now locally scoped
	"use strict";

    $.extend($.validator.messages, {
        required: "Esta campo es requerido.",
        remote: "Please fix this field.",
        email: "Por favor ingresar un email válido.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Por favor ingresar un número válido.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}.")
    });

	var mensajes = {
        nombre: "Por favor ingresar nombre",
        email: "Por favor ingrese un email válido",
        cedula: "Por favor ingresar cédula",
        telefono: "Por favor ingresar teléfono",
        areas: "Por favor ingresar área de interés",
        escolaridad: "Por favor ingresar el nivel de escolaridad",
        horario: "Por favor ingresar horario de interés",
        // curriculum: "curriculum onvalid",
        condiciones : "Debe aceptar los términos y condiciones"
    };

	$('.pickadate').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy es',
        clear: 'Limpiar',
        formatSubmit: 'yyyy-mm-dd',
        min: true
    });

	// oculta el submenu residencial inicialmente, seria mejor generarlo con un style display none, ya que a veces se muestra inicialmente
    // $('#menu-menu-principal > li:first-child .sub-menu').first().hide();
    // Muestra el submenu residencial al hacer clic en el item correspondiente
    $('#menu-menu-principal > li:first-child').on(
        'click',
        function() {
            $(this).find('.sub-menu').first().slideToggle().toggleClass('nav-flex').parent('li').toggleClass('down-nav');
            $('#page').prepend('<div class="hide-nav"></div>');

        }
    );

    $('body').on('click', '.hide-nav' , function(){
        setTimeout(function(){
            $('.hide-nav').remove();
        }, 500)
        $('#menu-menu-principal > li:first-child').find('.sub-menu').first().slideUp().removeClass('nav-flex').parent('li').removeClass('down-nav');
    })

    window.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (window.isMobile.Android() || window.isMobile.BlackBerry() || window.isMobile.iOS() || window.isMobile.Opera() || window.isMobile.Windows());
        }
    };

   	// Listen for the jQuery ready event on the document
   	$(function() {
		// The DOM is ready!
		var globals = window.globals,
            loading = getLoading(),
            btn_results = $('.btn_results'),
            icons_services = ['icon_done.png' , 'icon_error.png' ],
            files = '';
		// p(globals);

        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

        $('.select2').select2();

        if($('.box').length == 1){
            $('.box').addClass('only_one');
        }

        if($('.circles div').length == 1){
            $('.circles').addClass('circle_red_one');
        }

        if((window.location.href).indexOf("contactanos") <= -1){
            resetOnce('prov');
            resetOnce('cant');
            resetOnce('dist');
        }

        // if (isFirefox || isSafari) {
        //     $('.circle').remove();
        //     $('.circles').addClass('circles--bg');
        // }

        //animate
        function isScrolledIntoView(elem){
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
        }

        $.each($('.animate-ele'), function(){
        if(isScrolledIntoView($(this))){
            if(!$(this).hasClass('fadeInUp')){
                $(this).addClass('fadeInUp');
                }
            }
        })

        $(document).scroll(function() {
            if($('.animate-ele').length > 0){
                $.each($('.animate-ele'), function(){
                if(isScrolledIntoView($(this))){
                    if(!$(this).hasClass('fadeInUp')){
                        $(this).addClass('fadeInUp');
                        }
                    }
                })
            }
            // if($('.circles').length > 0){
            //         $('.circles').css({ 'top': ($(window).scrollTop())/3 });
            // }
        });


        $('.circle').each(function(){
            var width = $(this).width();
            $(this).css('height', width);
            $(this).attr('data-style', 'height:' + width + 'px;');
        })


        // $('.collapse').collapse();

        $('#tabs_contact').on('click', 'a', function(e){
            e.preventDefault();
            $(this).tab('show');
        });

        $('.cards').on('init', function(event, slick, direction) {
          // workaround para lidiar con un bug en slick cuando se utiliza variableWidth junto con infinite
          slick.slickSetOption('slidesToShow', slick.slideCount - 1, true);
        });
        $('.cards').slick({
            infinite: true,
            speed: 300,
            centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 5000
        });

        $('.cards_telebeneficio').on('init', function(event, slick, direction) {
          // workaround para lidiar con un bug en slick cuando se utiliza variableWidth junto con infinite
          slick.slickSetOption('slidesToShow', slick.slideCount - 1, true);
        });
        $('.cards_telebeneficio').slick({
            infinite: true,
            speed: 300,
            centerMode: true,
            variableWidth: true,
            autoplay: false
        });

        /**
         * Mostrar slider de canales con categorias y familias
         */
            var list_channels = $('.list-channels'), imgs_channels = $('.imgs-channels');

            imgs_channels.slick({
    			slidesToShow: 1,
    			slidesToScroll: 1,
    			arrows: false,
    			fade: true,
    			asNavFor: '.list-channels',
                adaptiveHeight: true
    		});

            list_channels.slick({
    			slidesToShow: 1,
    			slidesToScroll: 1,
    			asNavFor: '.imgs-channels',
    			dots: false,
    			centerMode: true,
    			focusOnSelect: true
    		});
        /**
         * Fin slider de canales con categorias y familias
         */


         /**
          * SLIDER HOMEPAGE
          */

          $(".front__slider").slick({
            dots:false,
            arrows:false,
            slidesToShow:1,
            slidesToScroll:1,
            infinite:true,
            autoplay:true,
            autoplaySpeed:5000,
            draggable:false,
          });

          /**
           * FIN SLIDER HOMEPAGE
           */




		if($('.wp_provincias select').length){
            $('.wp_provincias select').addClass('provincias');
        }

        if($('.provincias').length > 0){
            read_provincias('provincias');
        }


        /**
         * Top scroll animation. for menu in single pages
         */
        $('#nav').on('click', 'a', function(e){
            e.preventDefault();

            $('#nav').find('li').removeClass('selected');
            $(this).closest('li').addClass('selected');

            var target = $( e.target.hash);

            if(target.length > 0){
                makeScroll(e.target.hash);
            }

        });

        var hash = window.location.hash;

        if(hash.length > 0){
            makeScroll(hash);
        }

        function makeScroll(element, number){
            var target = $( element ),
                value = (typeof number !== 'undefined') ? number : 100,
                scroll = target.offset().top - value;

            $('html, body').animate({ scrollTop : scroll }, 800);

            if ( $(window).width() < 768 ) {
                $('#nav').collapse('hide');
            }
        }

//         $('.wp_scroll').on('click', 'a', function(e){
//             e.preventDefault();
//
//             var target = $( e.target.hash);
//
//             if(target.length > 0){
//                 var scroll = target.offset().top - 100;
// // p(scroll);
//                 $('html, body').animate({ scrollTop : scroll }, 800);
//
//                 if(window.isMobile.any()){
//                     $('.submenu_intern').slideToggle( "slow");
//                     $('.btn_bene').addClass('visible-xs').css('opacity', 1);
//                 }
//             }
//
//             p(e.target.hash);
//         });
    
        var heightWindow = $(window).height();
         if(!window.isMobile.any()){
            if($('body').hasClass('fixed-header')){
                $('.sub-menu').css({'max-height': heightWindow - 106 });
            }else{
                $('.sub-menu').css({'max-height': heightWindow - 172 });
            }
            
         }    

        $( window ).scroll(function() {
            if ( $(this).width() < 992 ) {
                if ($(this).scrollTop() > 26) {
                   $('body').addClass('fixed-header');
                } else {
                   $('body').removeClass('fixed-header');
                }
            } else {
                if ($(this).scrollTop() > 62) {
                   $('body').addClass('fixed-header');
                   $('.sub-menu').css({'max-height': heightWindow - 106 });
                } else {
                   $('body').removeClass('fixed-header');
                }
            }
        });

        $('.header__toggle').on('click', function(){
            if ( $(this).hasClass('collapsed') ) {
                $('body').addClass('menu-open');
                setTimeout(function(){
                    if ( $('.header').height() > $(window).height() ) {
                        $('.header').addClass('header-overflow');
                    }
                }, 1000)
            } else {
                $('body').removeClass('menu-open');
                $('.header').removeClass('header-overflow');
            }
        })

        if ( $(window).width() < 992 ) {
            $('.menu__residencial > a').on('click', function(){
                if ( $(this).parent().hasClass('down-nav') ) {
                    $('.header').removeClass('header-overflow');
                } else {
                    setTimeout(function(){
                        if ( $('.header').height() > $(window).height() ) {
                            $('.header').addClass('header-overflow');
                        }
                    }, 1000)
                }
            })
        }

        $(".frm_contact").validate({
            rules : {
                nombre: "required",
                email: {
                    required: true,
                    email: true
                },
                comentario : "required",
            },
            messages :  {
                nombre: "Por favor ingresar nombre",
                email: "Por favor ingresar email ",
                comentario: "Por favor ingresar un comentario valido",
            }
        });

        $(".frm_empleo").validate({
            rules : {
                nombre: "required",
                email: {
                    required: true,
                    email: true
                },
                cedula: "required",
                telefono: "required",
                areas: "required",
                escolaridad: "required",
                horario: "required",
                // curriculum: {
                //     required: true,
                //     extension: "doc|doc?x|pdf"
                // },
                condiciones : "required"
            },
            messages : mensajes
        });

        $(".frm_reserv").validate({
            rules : {
                nombre: "required",
                email: {
                    required: true,
                    email: true
                },
                contrato: {
                    required: true,
                    number: true
                },
                telefono : {
                    required: true,
                    number: true
                },
                hotel_tour : "required",
                noches : "required",
                adultos : "required",
                entrada : "required",
                salida : "required",
            },
            messages :  {
                nombre: "Por favor ingresar nombre",
                contrato: "Por favor ingresar email ",
                email: "Por favor ingresar un email válido",
                telefono: "Por favor ingresar un teléfono válido",
                hotel_tour: "Por favor seleccionar el hotel o tour de interes",
                noches: "Por favor seleccionar la cantidad de noches",
                adultos: "Por favor seleccionar la cantidad de adultos",
                entrada: "Por favor seleccionar la fecha de ingreso",
                salida: "Por favor seleccionar la fecha de salida",
            }
        });

        $(".frm_servicio").validate({
            rules : {
                nombre: "required",
                // email: {
                //     required: true,
                //     email: true
                // },
                telefono: "required",
                contrato: "required",
                comentario : "required"
            },
            messages : mensajes
        });

        $('.btn_send_contact').on('click', function(e){
            e.preventDefault();

            var form = $(this).closest('form').attr('class');

            switch (form){
                case 'frm_contact':

                    if($("."+form).valid()){
                        queryAjax(globals.url_ajax, $("."+form).serialize()+"&action=setcontact" )
                            .done(function(response){
p(response);
                                if(response == 'done'){
                                    $("."+form)[0].reset();
                                    $('.result').html("Enviado correctamente");
                                }else if(response == 'error'){
                                    $('.result').html("Ocurrión un error, intente nuevamente");
                                }
                            });
                    }
                    break;
                case 'frm_empleo':
                    if($("."+form).valid()) {
                        var formData = new FormData();

                        $.each(($("."+form).serializeArray()), function(key, element) {
                            formData.append(element.name, element.value);
                        });

                        formData.append('cv', files[0]);
                        formData.append('action', 'setempleo');

                        $.ajax({
                            url: globals.url_ajax,
                            type: 'POST',
                            data: formData,
                            cache: false,
                            dataType: 'json',
                            processData: false, // Don't process the files
                            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                            success: function(response, textStatus, jqXHR)
                            {
                                $("."+form)[0].reset();
                                $('.result2').html("Enviado correctamente");
                            },
                            error: function(jqXHR, textStatus, errorThrown)
                            {
                                // Handle errors here
                                p('ERRORS: ' + textStatus);
                                // STOP LOADING SPINNER
                            }
                        });
                    }
                    break;
                case 'frm_reserv':

                    if($("."+form).valid()){
                        queryAjax(globals.url_ajax, $("."+form).serialize()+"&action=setreserv" )
                            .done(function(response){
console.log(response);
                                if(response == 'done'){
                                    $("."+form)[0].reset();
                                    $('.result').html("Enviado correctamente");
                                }else if(response == 'error'){
                                    $('.result').html("Ocurrión un error, intente nuevamente");
                                }
                            });
                    }
                    break;
                case 'frm_servicio':
                    if($("."+form).valid()){
                        queryAjax(globals.url_ajax, $("."+form).serialize()+"&action=setservicio" )
                            .done(function(response){
                                console.log(response);
                                if(response == 'done'){
                                    $("."+form)[0].reset();
                                    $('.result').html("Enviado correctamente");
                                }else if(response == 'error'){
                                    $('.result').html("Ocurrión un error, intente nuevamente");
                                }
                            });
                    }
                    break;
            }
        });

        if($('#ninos').length > 0){
            $('#ninos').on('change', function(e){
                e.preventDefault();

                var $this = $(this),
                    cant = $this.val(),
                    wp_ninos = $('#edad_ninos');

                if(cant > 0){
                    $('#wp_edad_ninos').removeClass('hide');
                }else{
                    $('#wp_edad_ninos').addClass('hide');
                }
            });
        }


        if($('#namefile').length > 0){
            $('.btn_add').on('click', function(e){
                e.preventDefault();
                $('#curriculum').click();
            });


            $('#curriculum').on('change', function(e){
                files = event.target.files;
                var file = (e.target.value).split('\\');
                $('#namefile').val(file[file.length-1]);
            });
        }

        $('#packages').on('change', function(e){
            e.preventDefault();

            var cat = $(this).val();
            imgs_channels.html(loading);

            queryAjax(globals.url_ajax, { action : 'getPostCat', cat_id : cat, get_the_id : $('#get_the_id').val() })
                .done(function (response) {
                    // p(response);
                    list_channels.slick('unslick').html(response[0]);
                    imgs_channels.slick('unslick').html(response[1]);

                    imgs_channels.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        fade: true,
                        asNavFor: '.list-channels',
                        adaptiveHeight: true
                    });

                    list_channels.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        asNavFor: '.imgs-channels',
                        dots: false,
                        centerMode: true,
                        focusOnSelect: true
                    });
                });
        });

        $('#packages').trigger('change');


		// queryAjax(globals.url_ajax,{action:'test',vari: 'cosa'}).done(function(data) {
		// 	// Si la respuesta es un JSON
		// 	// var data = $.parseJSON(data);
		// 	p(data);
		// });

		/*
		if(validarCampos('.frm_subir .required')){

		}
		*/

		//  Functions

        function getLoading() {
            var spinner = '<div class="spinner center-block"><div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div>';

            return spinner;
        }

        $('.provincias').on('change', function(event) {
            event.preventDefault();

            var wpx_images = $('.wp_result').find('table').find('.wpx_images');

            $('.cantones, .distrito').attr('disabled', 'disabled');

            $('.places').find('.pro').html('&nbsp;'+$(this).find(':selected').text());

            read_cantones('.cantones', $(this).find(':selected').attr('data-id'));

            if($('.wp_cantones select').length){
                read_cantones('.wp_cantones select', $(this).find(':selected').attr('data-id'));
            }

            var img = (parseInt($(this).find(':selected').attr('data-cov')) == 1) ? icons_services[0] : icons_services[1];
            wpx_images.find('td').find('img.wp_icon').attr('src', globals.url_tmp+'images/'+img);
        });

        $('.cantones, .wp_cantones select').on('change', function(event) {
            event.preventDefault();
            $('.distrito').attr('disabled', 'disabled');

            $('.places').find('.can').html(' -&nbsp;'+$(this).find(':selected').text());

            read_distritos('distrito', $(this).find(':selected').attr('data-id'));
        });

        $('.distrito').on('change', function(event) {
            event.preventDefault();

            $('.places').find('.dis').html(' -&nbsp;'+$(this).find(':selected').text());

            var img = globals.url_tmp+'images/',
                wp_table = $('.wp_result').find('table'),
                wpx_images = wp_table.find('.wpx_images'),
                href = '',
                dist_id = $(this).find(':selected').attr('data-id'),
                footer = $('.footer'),
                imgInternet = globals.url_tmp+'images/',
                imgTv = globals.url_tmp+'images/',
                imgTelefonia = globals.url_tmp+'images/',
                imgFibra = globals.url_tmp+'images/';

            wp_table.parent('.wp_result').prepend(loading);
            wp_table.addClass('hide');

            queryAjax(globals.url_ajax ,{action : 'getcobertura', id_dist : dist_id }).done(function(data){
                console.log(data);
                 // p(data[0].cobertura); 
                wp_table.parent('.wp_result').find('.spinner').remove();

                img += (parseInt(data[0].cobertura) == 1) ? icons_services[0] : icons_services[1];
                imgInternet += (parseInt(data[0].internet) == 1) ? icons_services[0] : icons_services[1];
                imgTv += (parseInt(data[0].television) == 1) ? icons_services[0] : icons_services[1];
                imgTelefonia += (parseInt(data[0].telefonia) == 1) ? icons_services[0] : icons_services[1];
                imgFibra += (parseInt(data[0].fibra) == 1) ? icons_services[0] : icons_services[1];
                
                // wp_table.find('.wpx_images').find('.wp_icon').find('img').removeAttr('src').attr('src', img);
                wp_table.find('.wpx_images').find('.wp_icon').find('#internet').removeAttr('src').attr('src', imgInternet);
                wp_table.find('.wpx_images').find('.wp_icon').find('#tv').removeAttr('src').attr('src', imgTv);
                wp_table.find('.wpx_images').find('.wp_icon').find('#telefonia').removeAttr('src').attr('src', imgTelefonia);
                wp_table.find('.wpx_images').find('.wp_icon').find('#fibra').removeAttr('src').attr('src', imgFibra);
                wp_table.removeClass('hide');

                href = btn_results.attr('href')+'?pr='+footer.find('.provincias').find(':selected').attr('data-id')+'&c='+footer.find('.cantones').find(':selected').attr('data-id')+'&d='+dist_id;

                btn_results.attr('href', href);
            });
        });

        btn_results.on('click', function(e){
            e.preventDefault();

            var dist_id = $('.distrito').find(':selected').attr('data-id'),
                footer = $('.footer');

            document.cookie = 'prov='+footer.find('.provincias').find(':selected').attr('data-id');
            document.cookie = 'cant='+footer.find('.cantones').find(':selected').attr('data-id');
            document.cookie = 'dist='+dist_id;

            window.location = btn_results.attr('href');
        });

        function read_provincias(element_tmp) {
            var element = $('.'+element_tmp);

            element.empty().append('<option value=""> Provincias </option>');

            queryAjax(globals.url_ajax ,{ action : 'getprovincias'}).done(function(data){
                $.each(data, function(key,value) {
                    element.append('<option data-id="'+value.id+'" data-cov="'+value.cobertura+'" value="'+value.provincia+'">'+value.provincia+'</option>');
                });
                element.removeAttr('disabled');

                if($.isNumeric(getCookie('prov'))){
                    $('.provincias option[data-id='+getCookie('prov')+']').attr('selected','selected');
                    $('.provincias').trigger('change');
                }
            });
        }

        function read_cantones(element_tmp, prov) {
            var element = $(element_tmp);
            element.prepend($('<option>', {value: '', text:'Cargando...'}).attr('selected', 'selected'));

            queryAjax(globals.url_ajax ,{action : 'getcantones', id_prov : prov}).done(function(data){
                element.empty().prepend($('<option>', {value: '', text:'Cantón'}).attr('selected', 'selected'));
                $.each(data, function(key,value) {
                    element.append('<option data-id="'+value.codigo_canton+'" data-cov="'+value.cobertura+'" value="'+value.nombre_canton+'">'+value.nombre_canton+'</option>');
                });
                element.removeAttr('disabled');

                if($.isNumeric(getCookie('cant'))){
                    $('.cantones option[data-id='+getCookie('cant')+']').attr('selected','selected');
                    $('.cantones').trigger('change');
                }
            });
        }

        function read_distritos(file, canton) {
            var element = $('.'+file);
            element.prepend($('<option>', {value: '', text:'Cargando...'}).attr('selected', 'selected'));

            queryAjax(globals.url_ajax ,{action : 'getdistritos', id_cant : canton}).done(function(data){
                element.empty().prepend($('<option>', {value: '', text:'Distrito'}).attr('selected', 'selected'));
                $.each(data, function(key,value) {
                    element.append('<option data-id="'+value.codigo_distrito+'" value="'+value.nombre_distrito+'">'+value.nombre_distrito+'</option>');
                });
                element.removeAttr('disabled');

                if($.isNumeric(getCookie('dist'))){
                    $('.distrito option[data-id='+getCookie('dist')+']').attr('selected','selected');
                }
            });
        }

		function queryAjax(url,object) {
			return $.ajax({
				url: url,
				type: 'POST',
				data: object
			});
		}

        function getCookie(name){
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

        function resetOnce(name) {
            // document.cookie = "doSomethingOnlyOnce=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

		function validarCampos(elements){
		    var $inputs = $(elements);
		    var hayVacios = false ;
		    $inputs.each(function(i,e) { // Recorremos los inputs del formulario (uno a uno)
		        if(!isEmpty($("#"+e.id).val())){ // Verificamos que el input este vacio
		            // $("#"+e.id).focus();
		            $inputs.first().focus();
		            $("#"+e.id).addClass('error');
		            hayVacios = true;
		        }else{
		            $("#"+e.id).removeClass('error').addClass('success');
		        }
		    });

		    return !hayVacios;
		}

		function emailValido(email){
		    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		    if(!emailReg.test(email)) {
		        return false;
		    }else{
		    	return true;
		    }
		}
		function isEmpty(val){
		    if(val.length <= 0)
		        return false;
		    return true;
		}

		function bloquearLetras(e){
		    var key = e.keyCode || e.which;
		    var tecla = String.fromCharCode(key).toLowerCase();
		    var letras = "0123456789";
		    var especiales = [8,9,37,39,46,36,35];
		    var numeros = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,9,13];
		    var tecla_especial = false;
		    for(var i in especiales){
		        if(key == especiales[i]){
		            tecla_especial = true;
		            break;
		        }
		    }
		    var esNumero = false;
		    for(var i in numeros){
		        if(key == numeros[i]){
		            esNumero = true;
		            break;
		        }
		    }
		    if(!esNumero && !tecla_especial){
		        return false;
		    }
		}

		function p(element){
            if (window.console) {
                console.log(element);
            }
        }

   	});
	// The rest of the code goes here!
}));

