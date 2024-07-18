import "@components/header.js";
import "@components/navBar.js";
import "@styles/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const accountType = document.getElementById("accountType");
  const securityKey = document.getElementById("securityKey");
  const addButton = document.getElementById("addButton");
  const cancelButton = document.getElementById("cancelButton");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  function validateForm() {
    addButton.disabled = accountType.value === "" || securityKey.value === "";
  }

  accountType.addEventListener("change", validateForm);
  securityKey.addEventListener("input", validateForm);

  addButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", function () {
    accountType.value = "";
    securityKey.value = "";
    validateForm();
  });
});
