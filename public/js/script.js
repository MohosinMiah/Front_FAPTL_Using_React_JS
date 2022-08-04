(function($) {
    "use strict";
    $(".menu-icon-in").click(function() {
        $(this).toggleClass("open");
    });

    $(".hamburger").on("click", function(e) {
        e.preventDefault();
        var mask = '<div className="mask-overlay"></div>';
        $(mask).hide().appendTo("body").fadeIn("fast");
        if ($(".dvLeft").hasClass("open")) {
            $(".mask-overlay").remove();
            $(".menu-icon-in").removeClass("open");
        }
        $(".dvLeft").toggleClass("open");
        $(".dvside-out,.mask-overlay").on("click", function() {
            $(".dvLeft").removeClass("open");
            $(".mask-overlay").remove();
            $(".menu-icon-in").removeClass("open");
        });
    });
    var nav_scroll = function() {
        setTimeout(function() {
            let divHeight = $("#menubar").height();
            let menuHeight = $("#ulmenu").height();
            if (menuHeight > divHeight) {
                $("#menubar").css("overflow-y", "scroll");
            } else {
                $("#menubar").css("overflow-y", "hidden");
            }
        }, 500);
    };
    nav_scroll();
    $(window).on("resize", function() {
        nav_scroll();
    });
    $(function() {});
    $(".navigation ul li span.sub").click(function() {
        nav_scroll();
        var box_id = $(this).data("target_");
        if ($(box_id).is(":visible")) {
            $(box_id).removeClass("show");
            $(this).removeClass("fa-minus");
            $(this).addClass("fa-plus");
        } else if (!$(box_id).is(":visible")) {
            $(box_id).addClass("show");
            $(this).removeClass("fa-plus");
            $(this).addClass("fa-minus");
        }
    });
    $(document).ready(function($) {



        var nav_offset_top = $(".mobile-top").height();

        function mobileTop() {
            if ($(".mobile-top").length) {
                $(window).scroll(function() {
                    var scroll = $(window).scrollTop();
                    if (scroll >= nav_offset_top) {
                        $(".mobile-top").addClass("top_fixed");
                    } else {
                        $(".mobile-top").removeClass("top_fixed");
                    }
                });
            }
        }
        mobileTop();


    });
})(jQuery);