function toggle(element, className, enable) {
    var cls = element.className.split(' ');
    var newcls = []
    for (var i = 0; i < cls.length; i++) { if (cls[i] != className) { newcls[newcls.length] = cls[i]; } }
    if (enable) { newcls[newcls.length] = className; }
    element.className = newcls.join(' ');
}

function targetWithin(id, enable) {
    if (id) {
        for (var e = document.getElementById(id); e; e = e.parentElement) {
            toggle(e, 'target-within', enable)
        }
    }
}

var current_hash = window.location.hash.substr(1);

function hashChange() {
    targetWithin(current_hash, false);
    current_hash = window.location.hash.substr(1);
    targetWithin(current_hash, true);
}

window.addEventListener('load', hashChange, false);
window.addEventListener('DOMContentLoaded', hashChange, false);
window.addEventListener('hashchange', hashChange, false);