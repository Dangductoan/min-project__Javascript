 /**
  *1.Renden songs
  *2.Scroll top
  *3.play/pause/seek
  *4.cd rotate
  *5.next/prev
  *6.rendom
  *7.next/repeat when ended
  *8.active 
  *9.scroll active song into view
  *10.play song when click
  */
 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);
 const cd = $('.cd')
 const PLAYER_STORAGE_KEY = 'F8_PLAYER'

 const heading = $('header h2')
 const cdThumb = $('.cd-thumb')
 const audio = $('#audio')
 const playBtn = $('.btn-toggle-play')
 const nextBtn = $('.btn-next')
 const prevBtn = $('.btn-prev')
 const randomBtn = $('.btn-random')
 const repeatBtn = $('.btn-repeat')

 const player = $('.player')
 const progress = $('#progress')
 const playlist = $('.playlist')
 const app = {
     currentIndex: 0,
     isPLaying: false,
     isRepeat: false,
     config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
     songs: [{
             name: 'Baby',
             singer: 'JustinBieber',
             path: './assets/music/song1.mp3',
             image: './assets/img/song1.jpg'
         },
         {
             name: 'Badliar',
             singer: 'ImagineDragons',
             path: './assets/music/song2.mp3',
             image: './assets/img/song2.jpg'
         },
         {
             name: 'Despacito',
             singer: 'JustinBieber',
             path: './assets/music/song3.mp3',
             image: './assets/img/song3.jpg'
         },
         {
             name: 'Loveyourself',
             singer: 'JustinBieber',
             path: './assets/music/song4.mp3',
             image: './assets/img/song4.jpg'
         },
         {
             name: 'Nevada',
             singer: 'Monstercat',
             path: './assets/music/song5.mp3',
             image: './assets/img/song5.jpg'
         },
         {
             name: 'Sorry',
             singer: 'JustinBieber',
             path: './assets/music/song6.mp3',
             image: './assets/img/song6.jpg'
         },
         {
             name: 'Summertime',
             singer: 'K-319',
             path: './assets/music/song7.mp3',
             image: './assets/img/song7.jpg'
         }
     ],
     setConfig: function(key, value) {
         this.config[key] = value;
         localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.config))
     },

     render: function() {
         const htmls = this.songs.map((song, index) => {
             return ` 
             <div class="song ${index===this.currentIndex ? 'active' : ''}" data-index=${index}>
             <div class="thumb" style="background-image: url('${song.image}')">
             </div>
             <div class="body">
                 <h3 class="title">${song.name}</h3>
                 <p class="author">${song.singer}</p>

             </div>
             <div class="option">
                 <i class="fas fa-ellipsis-h"></i>

             </div>

         </div>`
         })
         $('.playlist').innerHTML = htmls.join('\n')
     },
     defineProperties: function() {
         Object.defineProperty(this, 'currentSong', {
             get: function() {
                 return this.songs[this.currentIndex];
             }
         })


     },
     handelEvens: function() {
         const cdWidth = cd.offsetWidth

         //Xu ly khi dia quay 
         const cdThumbAnimate = cdThumb.animate([
             { transform: 'rotate(360deg)' }
         ], {
             duration: 10000,
             iterations: Infinity
         })
         cdThumbAnimate.pause()
             //Xu ly khi phong to thu nho cd
         document.onscroll = function() {
             const scrollTop = document.documentElement.scrollTop || window.scrollY;
             const newCdWidth = cdWidth - scrollTop;

             cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
             cd.style.opacity = newCdWidth / cdWidth

         }

         //Xu ly khi click play
         playBtn.onclick = function() {
                 if (app.isPLaying) {
                     audio.pause()

                 } else {
                     audio.play()
                 }

             }
             //Khi duoc play 
         audio.onplay = function() {
                 app.isPLaying = true
                 player.classList.add("playing")
                 cdThumbAnimate.play()

             }
             //khi duoc pause
         audio.onpause = function() {
                 app.isPLaying = false
                 player.classList.remove("playing")
                 cdThumbAnimate.pause()

             }
             //Khi tien do bai hat thay doi
         audio.ontimeupdate = function() {
                 if (audio.duration) {
                     const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                     progress.value = progressPercent
                 }
             }
             //xu ly khi tua song 
         progress.onchange = function(e) {
                 const seekTime = audio.duration / 100 * e.target.value
                 audio.currentTime = seekTime
             }
             //khi duoc next or prev
         nextBtn.onclick = function() {
             app.nextSong();
             audio.play()
             app.scrollToActiveSong()
         }
         prevBtn.onclick = function() {
                 app.prevSong();
                 audio.play()
                 app.scrollToActiveSong()

             }
             //hon it ngau nhien
         randomBtn.onclick = function() {
                 app.randomSong();
                 audio.play()
             }
             //lap lai bai hat
         repeatBtn.onclick = function() {
             app.isRepeat = !app.isRepeat;
             app.setConfig('isRepeat', app.isRepeat)
             repeatBtn.classList.toggle("active", app.isRepeat)
         }
         audio.onended = function() {
                 if (app.isRepeat) {
                     audio.play()
                 } else {
                     nextBtn.click();
                 }
             }
             //lang nghe hanh vi click vao playlist
         playlist.onclick = function(e) {
             const songNode = e.target.closest('.song:not(.active)')
             if (songNode || e.target.closest('.option')) {
                 //Khi click vao song
                 if (songNode) {
                     app.currentIndex = Number(songNode.dataset.index)
                     app.loadCurrentSong()
                     audio.play()
                 }
                 if (e.target.closest('.option')) {

                 }

             }

         }



     },
     scrollToActiveSong: function() {
         setTimeout(function() {
             $('.song.active').scrollIntoView({
                 behavior: 'smooth',
                 block: 'center',
             })
         }, 300)
     },
     //tai du lieu bai hat 
     loadCurrentSong: function() {
         heading.textContent = this.currentSong.name
         cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
         audio.src = this.currentSong.path
         this.render()

     },
     loadConfig: function() {
         this.isRepeat = this.config.isRepeat
     },
     //chuyen sang bai tiep theo
     nextSong: function() {
         this.currentIndex++
             if (this.currentIndex >= this.songs.length) {
                 this.currentIndex = 0

             }
         this.loadCurrentSong();
     },
     //tro lai bai truoc do
     prevSong: function() {
         this.currentIndex--
             if (this.currentIndex < 0) {
                 this.currentIndex = this.songs.length - 1

             }
         this.loadCurrentSong();
     },
     //chon bai ngau nhien 
     randomSong: function() {
         this.currentIndex = Math.floor(Math.random() * this.songs.length)
         this.loadCurrentSong();

     },
     start: function() {
         //gan cau hinh tu config vao ung dung
         this.loadConfig();
         //dinh nghia cac thuoc tinh cho object
         this.defineProperties();
         //Lang nghe va xy ly ca su kien(DOM Evens)
         this.handelEvens();
         //tai cac du lieu bai hat vao UI
         this.loadCurrentSong();
         //render playlist
         this.render();
         repeatBtn.classList.toggle("active", app.isRepeat)

     }
 }
 app.start()