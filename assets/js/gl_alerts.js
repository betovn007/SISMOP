// ====================================================================================
// Success

function gl_success(g_time, time, msg){

    // --------------------------------------
    // Append element to div

    $('#gl-alerts').html(`
        <div class="gl-alert-success">
            <span class="fas fa-check-circle"></span>
            <span class="msg">`+msg+`</span>
            <span class="close-btn-success">
                <span class="fas fa-times"></span>
            </span>
        </div>
    `);

    // --------------------------------------
    // Show element

    $('.gl-alert-success').removeClass('hide');
    $('.gl-alert-success').addClass('show');

    // --------------------------------------
    // Have time? Use it
    
    if(g_time == "SI"){
        setTimeout(() => {
            $('.gl-alert-success').addClass('hide');
            $('.gl-alert-success').removeClass('show');
        }, time);
    }
}

// --------------------------------------
// Close item

$(document).on('click', '.close-btn-success' ,function(){
    $('.gl-alert-success').addClass('hide');
    $('.gl-alert-success').removeClass('show');
});

// ====================================================================================
// Warning

function gl_warning(g_time, time, msg){

    // --------------------------------------
    // Append element to div

    $('#gl-alerts').html(`
        <div class="gl-alert-warning">
            <span class="fas fa-exclamation-triangle"></span>
            <span class="msg">`+msg+`</span>
            <span class="close-btn-warning">
                <span class="fas fa-times"></span>
            </span>
        </div>
    `);

    // --------------------------------------
    // Show element

    $('.gl-alert-warning').removeClass('hide');
    $('.gl-alert-warning').addClass('show');

    // --------------------------------------
    // Have time? Use it
    
    if(g_time == "SI"){
        setTimeout(() => {
            $('.gl-alert-warning').addClass('hide');
            $('.gl-alert-warning').removeClass('show');
        }, time);
    }
}

// --------------------------------------
// Close item

$(document).on('click', '.close-btn-warning' ,function(){
    $('.gl-alert-warning').addClass('hide');
    $('.gl-alert-warning').removeClass('show');
});

// ====================================================================================
// Error

function gl_error(g_time, time, msg){

    // --------------------------------------
    // Append element to div

    $('#gl-alerts').html(`
        <div class="gl-alert-error">
            <span class="fas fa-times-circle"></span>
            <span class="msg">`+msg+`</span>
            <span class="close-btn-error">
                <span class="fas fa-times"></span>
            </span>
        </div>
    `);

    // --------------------------------------
    // Show element

    $('.gl-alert-error').removeClass('hide');
    $('.gl-alert-error').addClass('show');

    // --------------------------------------
    // Have time? Use it
    
    if(g_time == "SI"){
        setTimeout(() => {
            $('.gl-alert-error').addClass('hide');
            $('.gl-alert-error').removeClass('show');
        }, time);
    }
}

// --------------------------------------
// Close item

$(document).on('click', '.close-btn-error' ,function(){
    $('.gl-alert-error').addClass('hide');
    $('.gl-alert-error').removeClass('show');
});

// ====================================================================================
// Info

function gl_info(g_time, time, msg){

    // --------------------------------------
    // Append element to div

    $('#gl-alerts').html(`
        <div class="gl-alert-info">
            <span class="fas fa-info-circle"></span>
            <span class="msg">`+msg+`</span>
            <span class="close-btn-info">
                <span class="fas fa-times"></span>
            </span>
        </div>
    `);

    // --------------------------------------
    // Show element

    $('.gl-alert-info').removeClass('hide');
    $('.gl-alert-info').addClass('show');

    // --------------------------------------
    // Have time? Use it
    
    if(g_time == "SI"){
        setTimeout(() => {
            $('.gl-alert-info').addClass('hide');
            $('.gl-alert-info').removeClass('show');
        }, time);
    }
}

// --------------------------------------
// Close item

$(document).on('click', '.close-btn-info' ,function(){
    $('.gl-alert-info').addClass('hide');
    $('.gl-alert-info').removeClass('show');
});