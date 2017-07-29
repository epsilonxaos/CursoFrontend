"use strict";

navigator.serviceWorker && navigator.serviceWorker.register("/sw.js"), function() {
    function n() {
        var n = t();
        n && !s && (s = !0, e()), !n && s && (s = !1, i());
    }
    function e() {
        $("#description").addClass("fixed").removeClass("absolute"), $("#navigation").slideUp("fast"), 
        $("#sticky-navigation").slideDown("fast");
    }
    function i() {
        $("#description").removeClass("fixed").addClass("absolute"), $("#navigation").slideDown("fast"), 
        $("#sticky-navigation").slideUp("fast");
    }
    function t() {
        var n = $("#description").height();
        return $(window).scrollTop() > $(window).height() - 2 * n;
    }
    function o() {
        $("#responsive-nav ul").toggleClass("active"), $(".menu-opener").toggleClass("glyphicon-list");
    }
    var s = !1, a = 0, r = $("[data-name='image-counter']").attr("content");
    $("#contacto-form").on("submit", function(n) {
        return n.preventDefault(), sendForm($(this)), !1;
    }), $("#sticky-navigation").removeClass("hidden"), $("#sticky-navigation").slideUp(0), 
    n(), function() {
        var n = new Date().getHours();
        (n < 12 || n > 23) && $("#is-open .text").html("Cerrado ahora <br> Abierto de 5:00pm a 11:00pm");
    }(), $("#menu-opener").on("click", o), $(".menu-link").on("click", o), setInterval(function() {
        a < r ? a++ : a = 0, $("#gallery .inner").css({
            left: "-" + 100 * a + "%"
        });
    }, 3e3), $(window).scroll(n);
}();