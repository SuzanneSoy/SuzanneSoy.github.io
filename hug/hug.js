var main = document.getElementById('main');
var hearts = document.getElementById('hearts');

var levels = [
    "get a lil' hug!",
    'get a biiig hug!',
    'time to smile 😊',
    'landing on planet hug'
]

var hugsies = [
    [
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [  1, '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [  1, '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [  1,  1,  1, '', '', -1, '', '',  1, '', '',  1,  1,  1, ],
        [  1, '', '',  1, '',  1, '', '',  1, '',  1, '', '',  1, ],
        [  1, '', '',  1, '',  1, '', '',  2, '',  1, '', '',  1, ],
        [  1, '', '',  1, '', '',  1,  1, '', '', '',  1,  1,  1, ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '',  1, ],
        [ '', '', '', '', '', '', '', '', '', '',  1, '', '',  1, ],
        [ '', '', '', '', '', '', '', '', '', '', '',  1,  1, '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
    ],
    [
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ -1, '', '',  4, '',  6, '', '',  7, '', '',  8,  8, '', ],
        [  3, '', '',  4, '',  7, '', '',  6, '',  8, '', '', '', ],
        [  3, '', '',  4, '',  6, '', '',  7, '',  8, '', '', '', ],
        [  3,  5,  5,  4, '',  7, '', '',  6, '',  9, '',  8,  8, ],
        [  3, '', '',  4, '',  6, '', '',  7, '',  8, '', '',  8, ],
        [  3, '', '',  4, '',  7, '', '',  6, '',  8, '', '',  8, ],
        [  3, '', '',  4, '', '',  6,  7, '', '', '',  8,  8, '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
    ],
    [
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', 10, '', '', '', 11, '', '', '', '', '', ],
        [ '', '', '', '', -1, '', '', '', 11, '', '', '', '', '', ],
        [ '', '', '', '', 10, '', '', '', 11, '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', 12, '', '', '', '', '', '', '', 18, '', '', '', ],
        [ '', '', '', 13, '', '', '', '', '', 17, '', '', '', '', ],
        [ '', '', '', '', 14, 13, 15, 16, 15, '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
    ],
    [
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
        [ '', '', '', '', 22, 26, 26, 20, 20, 20, '', '', '', '', ],
        [ '', '', '', 26, 26, 26, 26, 26, 20, 20, 20, '', '', '', ],
        [ '', '', 25, 25, 26, 26, 26, 26, 26, 26, 20, 20, '', '', ],
        [ '', 25, 25, 25, 26, 26, 21, 26, 19, 26, 26, 26, 26, '', ],
        [ '', 25, 25, 26, 26, 26, 26, -1, 19, 19, 19, 26, 19, '', ],
        [ '', 25, 26, 26, 26, 26, 19, 19, 19, 19, 19, 19, 19, '', ],
        [ '', 26, 26, 26, 26, 26, 26, 26, 26, 19, 19, 19, 19, '', ],
        [ '', 23, 23, 26, 26, 24, 24, 24, 26, 24, 26, 26, 26, '', ],
        [ '', '', 23, 26, 24, 24, 24, 24, 24, 24, 26, 24, '', '', ],
        [ '', '', '', 26, 24, 24, 24, 26, 24, 24, 24, '', '', '', ],
        [ '', '', '', '', 24, 24, 26, 26, 26, 24, '', '', '', '', ],
        [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
    ],
];

var table;

var session = 0;
var kiss = 1;

var cells = [];

function makeCells() {
    cells = [];
    table = document.createElement('table');
    main.appendChild(table);
    for (var y = 0; y < hugsies[session].length; y++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        cells.push([]);
        for (var x = 0; x < hugsies[session][y].length; x++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            cells[y][x] = td;
        }
    }
}

function offset(e) {
    var top = 0;
    var left = 0;
    while (e) {
        top += e.offsetTop;
        left += e.offsetLeft;
        e = e.offsetParent;
    }
    return { top: top, left: left };
}

function max() {
    return Math.max.apply(Math, hugsies[session].map(function (row) { return Math.max.apply(Math, row); }));
}

function mini(session) {
    for (var y = 0; y < hugsies[session].length; y++) {
        for (var x = 0; x < hugsies[session][y].length; x++) {
            if (hugsies[session][y][x] == -1) {
                return { y: y, x: x };
            }
        }
    }
}

function nextSession() {
    cuddle();
    session++;
    if (session >= hugsies.length) {
        session = 0;
        kiss = 1;
    };

    window.setTimeout(function() {
        var futureMini =  mini(session);
        var destOffset = offset(cells[futureMini.y][futureMini.x]);
        var currentOffset = offset(table);

        var scale = 'scale(calc(1 / ' + Math.max(cells.length, cells[0].length) + '))';

        table.style.transform = 'translate('+(destOffset.left - currentOffset.left)+'px,'+(destOffset.top-currentOffset.top)+'px) ' + scale;
        
        window.setTimeout(function() {
            var miniTable = table;
            makeCells();
            cuddle();

            for (var y = 0; y < cells.length; y++) {
                for (var x = 0; x < cells[y].length; x++) {
                    cells[y][x].style.opacity = 0;
                    window.setTimeout((function(c) { return function() { c.style.opacity = 1; } })(cells[y][x]), Math.sqrt(y*y + x*x) * 100)
                }
            }

            var miniyx = mini(session);

            cells[miniyx.y][miniyx.x].innerText = '';
            cells[miniyx.y][miniyx.x].appendChild(miniTable);
            miniTable.style.transform = scale;
            miniTable.style.position = 'absolute';
            var nested = miniTable.getElementsByTagName('table');
            for (var i = 0; i < nested.length; i++) {
                if (nested[i] != miniTable) {
                    nested[i].parentElement.innerHTML = '🤗';
                }
            }
            cells[miniyx.y][miniyx.x].className = 'on mini';
            cells[miniyx.y][miniyx.x].style.opacity = 1;
        }, 3000);
    }, 1000);
}

var pauseKiss = 0;
var mouse = { x: 0, y: 0 }
var timeout = false;
var kisses = 0;
var freeHearts = [];

function muah() { kiss++; if (kiss >= max()) { pauseKiss = Date.now() + 3000; window.clearTimeout(timeout); nextSession(); } else { cuddle(); } }
function blowKiss(e) {
    if (Date.now() > pauseKiss) {
        var heart = document.createElement('div');
        var free = freeHearts.shift();
        if (free) {
            free.replaceWith(heart)
        } else {
            hearts.appendChild(heart);
        }
        var emojis = ['❤️', '♥️', '💗', '<3', '💖', '💛', '💙', '💜', '💚', '💞', '💝', '💌', '💕'];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.fontFamily = (heart.innerText == '<3') ? 'monospace' : "'Noto Color Emoji', monospace";
        heart.style.position = 'absolute';
        heart.style.top = mouse.y + 'px';
        heart.style.left = mouse.x + 'px';

        if (timeout) { window.clearInterval (timeout) };
        kisses++;
        if (kisses > 5) {
            pauseKiss = Date.now() + 4000;
            kisses = 0;
        }
        timeout = window.setTimeout(blowKiss, 300 + Math.random() * 700)
        window.setTimeout(function() { freeHearts.push(heart); }, 5100);
    } else {
        timeout = window.setTimeout(blowKiss, pauseKiss - Date.now() + 100);
    }
}
function blowKissEnter(e) { blowKissMove(e); blowKiss(); }
function blowKissLeave() { if (timeout) { window.clearTimeout(timeout) }; }
function blowKissMove(e) { mouse = { x: e.clientX, y: e.clientY }; }


function cuddle() {
    document.getElementById('level').innerText = levels[session];
    for (var y = 0; y < hugsies[session].length; y++) {
        for (var x = 0; x < hugsies[session][y].length; x++) {
            var td = cells[y][x];
            var classy = [];
            var emoji = '🤗';
            if (hugsies[session][y][x] == 26) { emoji = '💙'; }
            if (hugsies[session][y][x] == 0 || hugsies[session][y][x] > kiss) {
                classy.push('off');
            } else {
                classy.push('on');
            }
            if (hugsies[session][y][x] == kiss + 1) {
                classy.push('next');
                emoji = '😘';
                td.addEventListener('click', muah);
                td.addEventListener('mousemove', blowKissMove);
                td.addEventListener('mouseleave', blowKissLeave);
                td.addEventListener('mouseenter', blowKissEnter);
            } else {
                td.removeEventListener('click', muah);
                td.removeEventListener('mousemove', blowKissMove);
                td.removeEventListener('mouseleave', blowKissLeave);
                td.removeEventListener('mouseenter', blowKissEnter);
            }
            if (td.getElementsByTagName('table').length == 0) {
                td.className = classy.join(' ');
                td.innerText = emoji;
            }
        }
    }
}

makeCells();
cuddle();