document.addEventListener('DOMContentLoaded', function() {
    const modalContainer = document.querySelector('.modal-container');
    const closeModalButton = document.querySelector('.close-modal');
    const applicationForm = document.getElementById('application-form');

    // Function to open the modal
    function openModal() {
        modalContainer.classList.add('active');
    }

    // Function to close the modal
    function closeModal() {
        modalContainer.classList.remove('active');
    }

    // Event listener for close button
    closeModalButton.addEventListener('click', closeModal);

    // Event listener for form submission
    applicationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle form submission logic here
        alert('Application submitted successfully!');
        closeModal();
    });

    // Open the modal when the page loads
    openModal();
});
