


let songNr = 1


let player = new Audio()

let radio = new Audio()
radio.src = 'http://trace.dnbradio.com:8000/dnbradio_main.mp3'


function start() {

    /**sätt den initiellt aktuella låten */
    player.src = $(".queueItem:nth-child("+songNr+")").attr("link")
    $(".queueItem:nth-child("+songNr+")").css({backgroundColor: "orange"})
    $("#coverArt").attr("src", $(".queueItem:nth-child("+songNr+")").children(".queueCoverArt").children(".queueImg").attr("src"))
    $("#songInfo").text($(".queueItem:nth-child("+songNr+")").children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(".queueItem:nth-child("+songNr+")").children(".queueSongInfo").children(".artistName").text())


    $(".queuePlayButton").css({ cursor: "pointer" })
    $(".playbackButton").css({ cursor: "pointer" })
    $(".playButton").css({ cursor: "pointer" })
    $(".songInfoButton").css({ cursor: "pointer" })
    $(".headerButton").css({ cursor: "pointer" })

    $('.queuePlayButton').on('click', queuePlayClick)

    $('#playerPlay').on('click', start_audio)
    $('#playerPause').on('click', pause_audio)

}
$(start)





function queuePlayClick(){
    /**avmarkera gammal låt i queue */
    $(".queueItem:nth-child("+songNr+")").css({backgroundColor: "transparent"})

    /**markera vald låt i queue */
    $(this).parent().css({backgroundColor: "orange"})

    /* hämta bilden från queue*/
    console.log($(this).parent().children(".queueCoverArt").children(".queueImg").attr("src"))
   

    /*spara bilden över bilden i player*/
    $("#coverArt").attr("src", $(this).parent().children(".queueCoverArt").children(".queueImg").attr("src"))

    /**spara aktuell låt till songNr */
    songNr = $(this).parent().attr('songNr')

    /*spara aktivt låtnummer som källa */
    player.src = $(".queueItem:nth-child("+songNr+")").attr("link")

    //hämta och skriv över texten
    $("#songInfo").text($(this).parent().children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(this).parent().children(".queueSongInfo").children(".artistName").text())

    /*spela ljud, från början */
    player.currentTime = 0
    player.play()
}



function start_audio() {
    console.log('audio playing')
    
    player.play()
}

function pause_audio() {
    console.log('audio paused')
    player.pause()
}
function stop_audio(){
    console.log('audio stopped')
    player.pause()
    player.currentTime = 0
}

function next_song(){

}

function update_active_song(){
    
}


