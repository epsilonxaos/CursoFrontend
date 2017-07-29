"use strict";

!function() {
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