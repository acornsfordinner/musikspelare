


let songNr = 1
let queueSize
let player = new Audio()

let radio = new Audio()
radio.src = 'http://trace.dnbradio.com:8000/dnbradio_main.mp3'


function start() {

    /**hur många låtar finns i playlist */
    queueSize = playlist.children.length

    /**sätt den initiellt aktuella låten */
    player.src = $(".queueItem:nth-child(" + songNr + ")").attr("link")

    $(".queueItem:nth-child(" + songNr + ")").css({ backgroundColor: "orange" })
    $("#coverArt").attr("src", $(".queueItem:nth-child(" + songNr + ")").children(".queueCoverArt").children(".queueImg").attr("src"))
    $("#songInfo").text($(".queueItem:nth-child(" + songNr + ")").children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(".queueItem:nth-child(" + songNr + ")").children(".queueSongInfo").children(".artistName").text())

    
    /**skriv ut låtens längd*/
    $("#timestampRight").text(player.duration)

    $(".queuePlayButton").css({ cursor: "pointer" })
    $(".playbackButton").css({ cursor: "pointer" })
    $(".playButton").css({ cursor: "pointer" })
    $(".songInfoButton").css({ cursor: "pointer" })
    $(".headerButton").css({ cursor: "pointer" })

    $('.queuePlayButton').on('click', queuePlayClick)


    $('#playerPlay').on('click', play_audio)
    $('#playerPause').on('click', pause_audio)
    $('#backward').on('click', backward)
    $('#forward').on('click', forward)
    $('#repeat').on('click', repeat)
    player.addEventListener('timeupdate', timestamp)
    
    

}
$(start)




function queuePlayClick() {
    /**avmarkera gammal låt i queue */
    $(".queueItem:nth-child(" + songNr + ")").css({ backgroundColor: "transparent" })

    /**markera vald låt i queue */
    $(this).parent().css({ backgroundColor: "orange" })

    /* hämta bilden från queue*/
    console.log($(this).parent().children(".queueCoverArt").children(".queueImg").attr("src"))


    /*spara bilden över bilden i player*/
    $("#coverArt").attr("src", $(this).parent().children(".queueCoverArt").children(".queueImg").attr("src"))

    /**spara aktuell låt till songNr */
    songNr = $(this).parent().attr('songNr')

    /*spara aktivt låtnummer som källa */
    player.src = $(".queueItem:nth-child(" + songNr + ")").attr("link")

    //hämta och skriv över texten
    $("#songInfo").text($(this).parent().children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(this).parent().children(".queueSongInfo").children(".artistName").text())
    

    
    /*spela ljud, från början */
    player.currentTime = 0
    player.play()    
    
}


function timestamp(event) {
    console.log("omg", Math.round(event.timeStamp/1000), player.duration)

    $('#timestampLeft').text(sec_to_min(Math.round(player.currentTime)))
    
}

function sec_to_min(sec){
    let min = Math.floor(sec/60)
    sec = sec%60
    
    if (min<10){
        min = "0"+min
    }
    if (sec<10){
        sec = "0"+sec
    }
    return min+":"+sec

}

function play_audio() {
    console.log('audio playing')

    player.play()
    /**skriv ut låtens längd*/
    $("#timestampRight").text(sec_to_min(Math.round(player.duration)))
    console.log(sec_to_min(Math.round(player.duration)))
}

function pause_audio() {
    console.log('audio paused')
    player.pause()
}
function stop_audio() {
    console.log('audio stopped')
    player.pause()
    player.currentTime = 0
}

function backward() {
    let running = false

    if (player.paused == false) {
        running = true
    }

    if (player.currentTime < 2) {
        previous_song()
    }

    player.currentTime = 0

    if (running == true) {
        play_audio()
    }
}

function forward() {
    let running = false

    if (player.paused == false) {
        running = true
    }
    next_song()

    if (running == true) {
        play_audio()
    }

}


function previous_song() {

    let increment = songNr - 1
    if (increment < 1) {
        increment = queueSize
    }
    /**avmarkera gammal låt i queue */
    $(".queueItem:nth-child(" + songNr + ")").css({ backgroundColor: "transparent" })
    /**markera ny låt i queue */
    $(".queueItem:nth-child(" + increment + ")").css({ backgroundColor: "orange" })
    /**hämta infotexten */
    $("#songInfo").text($(".queueItem:nth-child(" + increment + ")").children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(".queueItem:nth-child(" + increment + ")").children(".queueSongInfo").children(".artistName").text())
    /** hämta bilden från queue, spara som coverArt*/
    $("#coverArt").attr("src", $(".queueItem:nth-child(" + increment + ")").children(".queueCoverArt").children(".queueImg").attr("src"))


    /**spara aktivt låtnummer som källa */
    player.src = $(".queueItem:nth-child(" + increment + ")").attr("link")

    
    /**spara aktuell låt till songNr */
    songNr = increment
}


function next_song() {

    let increment = songNr + 1
    if (increment > queueSize) {
        increment = 1
    }
    /**avmarkera gammal låt i queue */
    $(".queueItem:nth-child(" + songNr + ")").css({ backgroundColor: "transparent" })
    /**markera ny låt i queue */
    $(".queueItem:nth-child(" + increment + ")").css({ backgroundColor: "orange" })
    /**hämta infotexten */
    $("#songInfo").text($(".queueItem:nth-child(" + increment + ")").children(".queueSongInfo").children(".songName").text())
    $("#artistInfo").text($(".queueItem:nth-child(" + increment + ")").children(".queueSongInfo").children(".artistName").text())
    /* hämta bilden från queue, spara som coverArt*/
    $("#coverArt").attr("src", $(".queueItem:nth-child(" + increment + ")").children(".queueCoverArt").children(".queueImg").attr("src"))


    /*spara aktivt låtnummer som källa */
    player.src = $(".queueItem:nth-child(" + increment + ")").attr("link")
    
    /**spara aktuell låt till songNr */
    songNr = increment

}


function repeat() {
    player.loop = true | false
    console.log("loop toggled")

}