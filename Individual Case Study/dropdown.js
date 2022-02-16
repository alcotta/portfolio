/*When user clicks name on shows dropdown menu allowing for nav on smaller viewports */
function dropDown() {
    document.getElementById("dropNav").classList.toggle("show");
}

//close drop down if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for(i=0; i<dropdowns.length; i++ ) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}