document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('guestbookForm');
    const list = document.getElementById('guestbookList');
    const popup = document.getElementById('thankyouPopup');

    // Load existing messages from localStorage
    loadMessages();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('guestName');
        const messageInput = document.getElementById('guestMessage');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) return;

        // Save message
        saveMessage(name, message);

        // Add to visible list
        addMessageToList(name, message);

        // Reset form
        form.reset();

        // Show thank-you popup
        showThankYou();
    });

    function saveMessage(name, message) {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
        messages.unshift({ name, message, date: new Date().toISOString() });
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
        messages.forEach(function (entry) {
            addMessageToList(entry.name, entry.message);
        });
    }

    function addMessageToList(name, message) {
        const entry = document.createElement('div');
        entry.className = 'guestbook-entry';
        entry.innerHTML =
            '<p class="entry-name">' + escapeHtml(name) + '</p>' +
            '<p class="entry-message">' + escapeHtml(message) + '</p>';
        list.prepend(entry);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showThankYou() {
        popup.classList.add('active');
        setTimeout(function () {
            popup.classList.remove('active');
        }, 2500);
    }

    // Close popup on click outside the box
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});