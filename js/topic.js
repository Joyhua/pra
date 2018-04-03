var t = {
	playlist:[
		{
		  file: "tracks/01.mp3",
		  /*thumb: "thumbs/01.jpg",*/
		  trackName: "",
		  trackArtist: "",
		  trackAlbum: "Single",
		}
	],
	autoPlay:false
}

$(".jAudio--player").jAudio(t);

function closeDialog(){
	$(".dialog_b,.dialog_w").removeClass('show');
}
function alertDialog(){
	$(".dialog_b,.dialog_w").addClass('show');
	
}

$('.close,.dialog_w button').on('click',function(){
	closeDialog();
});
$('input[type=submit]').on('click',function(){
	alertDialog();
});
