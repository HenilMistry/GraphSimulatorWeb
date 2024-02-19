/**
 * This scripts aims to manage the answer modal.
 * The answer modal is basically used for showing the 
 * answers of the various algorithms applied on the graph.
 */

// getting the modal...
const ansModal = new bootstrap.Modal('#answerModal');
// getting the body of the modal
const ansModalBody = document.getElementById("answerModalBody");

/**
 * This function just closes the Modal.
 */
function closeAnswerModal() {
    ansModal.hide();
}

/**
 * This function will make the answer modal visible
 * with the body passed into the parameter.
 * @param {*} string 
 */
function openAnswerModal(string) {
    ansModalBody.innerHTML = string;
    ansModal.show();
}