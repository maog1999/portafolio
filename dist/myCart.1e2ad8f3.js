$(".order").click(function(e) {
    let button = $(this);
    if (!button.hasClass("animate")) {
        button.addClass("animate");
        setTimeout(()=>{
            button.removeClass("animate");
        }, 10000);
    }
});

//# sourceMappingURL=myCart.1e2ad8f3.js.map
