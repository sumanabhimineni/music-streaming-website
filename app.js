const music = new Audio('faded.mp3');

const songs = [
    {
        id: '1',
        songName: `<p>Fade</p>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/1.png"
    },
    {
        id: '2',
        songName: `<p>Main Hoon Hero Tera (Salman Khan Version) Full Song(MP3 70K)</p>
        <div class="subtitle">Salman Khan</div>`,
        poster: "images/2.png"
    },
    {
        id: '3',
        songName: `<p>Aaj Dil Shayarana</p>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "images/3.png"
    },
    {
        id: '4',
        songName: `<p>Teri Jhuki Nazar</p>
        <div class="subtitle">Shafqat Amanat Ali</div>`,
        poster: "images/4.png"
    },
    {
        id: '5',
        songName: `<p>Tum Hi Ho</p>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "images/5.png"
    },
    {
        id: '6',
        songName: `<p>Ik Vaari Aa - Raabta (Arijit Singh) 190Kbps</p>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "images/6.png"
    },
    {
        id: '7',
        songName: `<p>Sanam Re (Title Song) Arijit Singh 190Kbps</p>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "images/7.png"
    },
    {
        id: '8',
        songName: `<p>Tu Hai Ki Nahi</p>
        <div class="subtitle">Ankit Tiwari</div>`,
        poster: "images/8.png"
    },
    {
        id: '9',
        songName: `<p>All Black - Raftaar, Sukh-E Musical Doctorz 320kbps</p>
        <div class="subtitle">Raftaar , Sukh-E Musical Doctorz</div>`,
        poster: "images/9.png"
    },
    {
        id: '10',
        songName: `<p>Hai Dil Ye Mera</p>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "images/10.png"
    },
    {
        id: '11',
        songName: `<p>Main Woh Chaand</p>
        <div class="subtitle">Darshan Raval</div>`,
        poster: "images/11.png"
    },
    {
        id: '12',
        songName: `<p>Galliyan (Ek_Villain)</p>
        <div class="subtitle">Ankit Tiwari</div>`,
        poster: "images/12.png"
    },
    {
        id: '13',
        songName: `<p>Baarish (Yaariyan)</p>
        <div class="subtitle">Mohammed Irfan </div>`,
        poster: "images/13.png"
    },
    {
        id: '14',
        songName: `<p>Blue Eyes </p>
        <div class="subtitle">Yo Yo Honey Singh</div>`,
        poster: "images/14.png"
    },
    {
        id: '15',
        songName: `<p>Banjaara</p>
        <div class="subtitle">Mohammad Irfan</div>`,
        poster: "images/15.png"
    },
    {
        id: '16',
        songName: `<p>Tanning</p>
        <div class="subtitle">Yo Yo Honey Singh</div>`,
        poster: "images/16.png"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener("click", () => {
    if(music.paused || music.currentTime <= 0){
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active2');
    } else{
        music.pause();
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
        wave.classList.remove('active2');
    }
})

const pauseAllSongs = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
            element.classList.add("bi-play-circle-fill");
            element.classList.remove("bi-pause-circle-fill");
    })    
}
const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
            element.style.background = "rgba(105, 105, 105, 0)";
    })    
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    element.addEventListener("click", (e) =>{
        index = e.target.id;
        pauseAllSongs();
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `images/${index}.png`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active2');
        music.addEventListener("ended", () => {
            masterPlay.classList.add("bi-play-fill");
            masterPlay.classList.remove("bi-pause-fill");
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener("timeupdate", () => {
    let music_current = music.currentTime;
    let music_duration = music.duration;

    let min = Math.floor(music_current/60);
    let sec = Math.floor(music_current%60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    currentStart.innerHTML = `${min}:${sec}`;


    let min2 = Math.floor(music_duration/60);
    let sec2 = Math.floor(music_duration%60);
    if(sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentEnd.innerHTML = `${min2}:${sec2}`;



    let progressBar = parseInt((music.currentTime/music.duration) * 100);
    seek.value = progressBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;
})

seek.addEventListener('change', () =>{
    music.currentTime = seek.value * music.duration /100;
})


seek.addEventListener('ended', () =>{
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if(vol.value == 0){
        vol_icon.classList.remove("bi-volume-down-fill");
        vol_icon.classList.add("bi-volume-mute-fill");
        vol_icon.classList.remove("bi-volume-up-fill");
    }
    if(vol.value > 0){
        vol_icon.classList.add("bi-volume-down-fill");
        vol_icon.classList.remove("bi-volume-mute-fill");
        vol_icon.classList.remove("bi-volume-up-fill");
    }
    if(vol.value > 50){
        vol_icon.classList.remove("bi-volume-down-fill");
        vol_icon.classList.remove("bi-volume-mute-fill");
        vol_icon.classList.add("bi-volume-up-fill");
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `images/${index}.png`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    pauseAllSongs();
    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
})


next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `images/${index}.png`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    pauseAllSongs();
    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
})



let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () =>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', () =>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', () =>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', () =>{
    item.scrollLeft += 330;
})