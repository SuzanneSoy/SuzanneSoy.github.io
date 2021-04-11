function toggle(element, className, enable) {
    var cls = element.className.split(' ');
    var newcls = []
    for (var i = 0; i < cls.length; i++) { if (cls[i] != className) { newcls[newcls.length] = cls[i]; } }
    if (enable) { newcls[newcls.length] = className; }
    element.className = newcls.join(' ');
}

function reverseAncestorsAndSelf(id) {
    ancestorsAndSelf = [];
    if (id) {
        for (var e = document.getElementById(id); e; e = e.parentElement) {
            ancestorsAndSelf[ancestorsAndSelf.length] = e;
        }
    }
    return ancestorsAndSelf.reverse();
}

var current_hash = '';

function hashChange() {
    var oldElements = reverseAncestorsAndSelf(current_hash);
    current_hash = window.location.hash.substr(1);
    var newElements = reverseAncestorsAndSelf(current_hash);
    var i = 0;
    while (i < oldElements.length && i < newElements.length && oldElements[i] == newElements[i]) { i++; }
    for (var j = i; j < oldElements.length; j++) { toggle(oldElements[j], 'target-within', false); }
    for (var j = i; j < newElements.length; j++) { toggle(newElements[j], 'target-within', true); }
}

window.addEventListener('load', hashChange, false);
window.addEventListener('DOMContentLoaded', hashChange, false);
window.addEventListener('hashchange', hashChange, false);