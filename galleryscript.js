var modal = document.getElementById("imageModal");
var closeBtn = document.getElementById("closeModal");
var modalContent = document.getElementById("modalContent");
var mediaItems = document.querySelectorAll(".gallery-item");
var currentIndex = 0;
function displayMedia(index) {
    var currentMedia = mediaItems[index].querySelector("img, video").cloneNode(true);
    modalContent.innerHTML = "";
    modalContent.appendChild(currentMedia);
    currentIndex = index;
}
function openModal(index) {
    modal.style.display = "block";
    displayMedia(index);
}
mediaItems.forEach(function(item, index) {
    item.addEventListener("click", function() {
        openModal(index);
    });
});
function closeModal() {
    modal.style.display = "none";
}
closeBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};
function prevMedia() {
    if (currentIndex > 0) {
        displayMedia(currentIndex - 1);
    }
}
function nextMedia() {
    if (currentIndex < mediaItems.length - 1) {
        displayMedia(currentIndex + 1);
    }
}
document.getElementById("prevArrow").addEventListener("click", prevMedia);
document.getElementById("nextArrow").addEventListener("click", nextMedia);
