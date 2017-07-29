"use strict";

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}();

!function() {
    var t = function() {
        function t() {
            _classCallCheck(this, t);
        }
        return _createClass(t, null, [ {
            key: "get",
            value: function(t) {
                navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(e) {
                    t({
                        lat: e.coords.latitude,
                        lng: e.coords.longitude
                    });
                }) : alert("Tu navegador no soporta Geolocalización");
            }
        } ]), t;
    }(), e = {
        lat: 19.4248097,
        lng: -99.1949255999998
    };
    google.maps.event.addDomListener(window, "load", function() {
        var n = new google.maps.Map(document.getElementById("map"), {
            center: e,
            zoom: 15
        });
        new google.maps.Marker({
            map: n,
            position: e,
            title: "Bviajes jhkjahdj",
            visible: !0
        }), t.get(function(t) {
            var n = new google.maps.LatLng(t.lat, t.lng), a = new google.maps.LatLng(e.lat, e.lng);
            new google.maps.DistanceMatrixService().getDistanceMatrix({
                origins: [ n ],
                destinations: [ a ],
                travelMode: google.maps.TravelMode.DRIVING
            }, function(t, e) {
                if (e === google.maps.DistanceMatrixStatus.OK) {
                    var n = t.rows[0].elements[0].duration.text;
                    document.querySelector("#message").innerHTML = "\n\t\t\t\t\t\t\t\t\t\tEstas a " + n + ' de poder cumplir tus sueños\n\t\t\t\t\t\t\t\t\t\ten <span class="fredora-script medium">Bviajes Goznale</span>\n\t\t\t\t\t\t\t\t\t';
                }
            });
        });
    });
}(), $.fn.formObject = function() {
    var e = {};
    return $.each($(this).serializeArray(), function(r, n) {
        e[n.name] = n.value || "";
    }), e;
}, navigator.serviceWorker && navigator.serviceWorker.register("/sw.js"), function() {
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
}(), function() {
    function t() {
        e() ? o() : n($(i).find(".input:invalid").first().parent());
    }
    function e() {
        return document.querySelector(i).checkValidity();
    }
    function n(t) {
        $(".step.active").removeClass("active"), t.addClass("active"), t.find(".input").focus();
        var e = t.index(".step") + 1;
        a($(".path-step:nth-child(" + e + ")"));
    }
    function a(t) {
        $(".path-step.active").removeClass("active"), t.addClass("active");
    }
    function o() {
        var t = $(i);
        $.ajax({
            url: t.attr("action"),
            method: "POST",
            data: t.formObject(),
            dataType: "json",
            success: function() {
                t.slideUp(), $("#info").html("Enviamos tu mensaje");
            }
        });
    }
    var i = "#contacto-form";
    $(".step textarea").on("keydown", function(t) {
        console.log("Entro"), 13 == t.keyCode && (console.log("entro al if"), t.preventDefault(), 
        $(t.target).blur(), console.log("entro al keydown"));
    }), $(".path-step").on("click", function(t) {
        var e = $(t.target);
        a(e);
        var o = e.index(".path-step") + 1;
        n($(".step:nth-child(" + o + ")"));
    }), $(i).find(".input").on("change", function(a) {
        var o = $(a.target).parent().next(".step");
        !e() && o.length > 0 ? n(o) : t();
    });
}();