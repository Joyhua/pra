$(function(){
	 $('.ca_w button').on('click', function() {
        $(this).addClass('current_active').siblings('button').removeClass('current_active');
    });
})