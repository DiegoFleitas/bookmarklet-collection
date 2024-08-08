javascript:(function(){
  try {
    var exists = document.getElementById('diegoiframecontainer');
    if (exists != null) {
        var c = document.getElementById('diegoiframecontainer');
        c.hidden = false;
        if (src != null) loadPlaylist(src);
        console.log('already running');
    } else {
        var loader = document.createElement('div');
        loader.setAttribute('id', 'diegoloader');
        loader.setAttribute('style', 'position:absolute;left:50%;top:50%;z-index:1;border:10px solid #f3f3f3;border-top:10px solid red;border-radius:50%;width:80px;height:80px;animation:diegospin 1s linear infinite;');
        var mystyle = document.createElement('style');
        document.head.appendChild(mystyle);
        mystyle.innerHTML = '@keyframes diegospin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';
        document.body.appendChild(loader);
        var last = '';
        var done = false;
        var uniq = [];
        var hrefs = [];
        var links = document.links;
        for (var i = 0; i < links.length; i++) {
            hrefs.push(links[i].href);
        }
        uniq = hrefs.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        uniq = uniq.filter(function (url) {
            return validateYouTubeUrl(url);
        });

        var ids = [];
        var dictionary = {};
        var regExpt = /t=(\w+)/;
        for (var h = 0; h < uniq.length; h++) {
            var str = uniq[h];
            if (str.indexOf('v=') !== -1) {
                var vid = str.substr(str.indexOf('v=') + 2, 11);
                ids.push(vid);
                if (str.indexOf('t=') !== -1) {
                    dictionary[vid] = str.match(regExpt)[0];
                }
            } else if (str.indexOf('youtu.be') !== -1) {
                var vid = str.substr(str.indexOf('youtu.be/') + 9, 11);
                ids.push(vid);
                if (str.indexOf('t=') !== -1) {
                    dictionary[vid] = str.match(regExpt)[0];
                }
            }
        }

        if (ids.length === 0) {
            var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
            var matches = [...document.body.innerHTML.matchAll(regex)];
            ids = matches.map(match => match[1]);
            ids = [...new Set(ids)]; // Ensure unique video IDs
        }

        if (ids.length === 0) throw new Error('No videos found.');

        let extraIds = ids.slice(40);
        src = ids.join();
        console.log('player only supports 40 videos at a time, heres a direct link to the rest', 'https://www.youtube.com/watch_videos?video_ids=' + extraIds.join());
        var count = ids.length;

        var z = document.createElement('div');
        z.setAttribute('id', 'diegoiframecontainer');
        z.setAttribute('style', 'min-width:100%;min-height:100%;position:fixed;left:25%;top:25%; ');
        document.body.appendChild(z);
        z.style.zIndex = 2147483646;
        var y = document.createElement('div');
        y.setAttribute('id', 'diegoplayer');
        z.appendChild(y);
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }
        var player;
        window.onYouTubeIframeAPIReady = function () {
            player = new YT.Player('diegoplayer', {
                height: '360',
                width: '640',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onError
                },
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'playlist': [src]
                }
            });
        };
        var iframe = document.getElementById('diegoplayer');
        iframe.setAttribute('enablejsapi', '1');
    }
} catch (ex) {
    loader.parentNode.removeChild(loader);
    console.log(ex);
}

function validateYouTubeUrl(url) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|watch\?v=|\&v=|\?v=)([^%#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return true;
        } else {
            return false;
        }
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
    var elem = document.getElementById('diegoiframecontainer');
    var group = document.createElement('div');
    group.setAttribute('id', 'diegodivgroup');
    group.setAttribute('style', 'width:640px;background-color:#0C0C0D;display:table');
    elem.insertBefore(group, elem.firstChild);
    var divX = document.createElement('div');
    divX.innerHTML = '✖';
    divX.setAttribute('id', 'diegodivX');
    divX.setAttribute('style', 'margin:0px 10px;cursor:pointer;color:#F0F0F0;display:inline;vertical-align:top;');
    group.appendChild(divX);
    divX.addEventListener('click', Close, false);
    var divP = document.createElement('div');
    divP.innerHTML = '⮫';
    divP.setAttribute('id', 'diegodivPlus');
    divP.setAttribute('style', 'margin:0px 10px;cursor:pointer;color:#F0F0F0;display:inline;vertical-align:top;');
    group.appendChild(divP);
    divP.addEventListener('click', Go, false);
    loader.style.display = 'none';
}

function Go() {
    var url = 'https://www.youtube.com/watch_videos?video_ids=' + src;
    var win = window.open(url, '_blank');
    win.focus();
}

function Close() {
    stopVideo();
    var c = document.getElementById('diegoiframecontainer');
    c.hidden = true;
}

function onPlayerStateChange(event) {
    if (newVideo()) done = false;
    if (event.data == YT.PlayerState.PLAYING && !done) {
        var seconds = getStart();
        if (seconds > 0) seekTo(seconds);
        done = true;
    }
}

function getStart() {
    var time = 0;
    var id = idFromVideo();
    var stamp = dictionary[id];
    if (stamp != null) {
        var h, m, s;
        h = m = s = '0';
        var miregex = /t=((\d+)h)?((\d+)m)?(\d+)s/g;
        hms = miregex.exec(stamp);
        console.log(hms);
        hms.forEach(function (element, k) {
            if (element == null) hms[k] = null;
        });
        h = Number(hms[2]);
        m = Number(hms[4]);
        s = Number(hms[5]);
        time = (h * 3600) + (m * 60) + s;
    }
    if (stamp) {
        console.log(stamp + ' is ' + time)
    };
    return time;
}

function onError(event) {
    try {
        var code = event.data.toString();
        switch (code) {
            case '2':
                console.log('invalid parameter ' + src);
                break;
            case '5':
                console.log('not playable in HTML5 player');
                break;
            case '100':
                console.log('video not found');
                break;
            case '101':
                console.log('video wont play in embbeded players');
                badVideo();
                break;
            case '150':
                console.log('video (' + idFromVideo() + ') wont play in embbeded players (duplicate)');
                badVideo();
                break;
            default:
                console.log('unexpected error');
                divX.parentElement.removeChild(divX);
                iframediv.parentElement.removeChild(iframediv);
                player.destroy();
        }
    } catch (e) {
        console.log(e);
    }
}

function loadPlaylist(src) {
    var diegoplayer = YT.get('diegoplayer');
    if (diegoplayer != null) diegoplayer.loadPlaylist(src, 0);
}

function idFromVideo() {
    return player.getVideoData().video_id;
}

function newVideo() {
    var now = idFromVideo();
    if (now != last) {
        last = now;
        return true;
    } else return false;
}

function skipVideo() {
    player.nextVideo();
}

function stopVideo() {
    player.stopVideo();
}

function seekTo(seconds) {
    player.seekTo(seconds);
}

function lastVideo() {
    var index = player.getPlaylistIndex();
    if (index == count - 1) return true;
    else return false;
}

function badVideo() {
    setTimeout(function () {
        skipVideo();
    }, 5000);
}
})();
