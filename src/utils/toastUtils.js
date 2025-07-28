import { Toast } from "bootstrap/dist/js/bootstrap.js";

export function showToastMessage(msg, position = "top-0 end-0", delay = 5000) {
  const toastElement = $("#toastMessage");
  const toastContainer = $("#toastContainer");
  
  // Update positioning classes
  toastContainer.removeClass('top-50 start-50 translate-middle-x bottom-0 start-0 top-0 end-0');
  toastContainer.addClass(position);
  
  // Set message content
  const toastMessageElement = toastElement.find(".toast-message");
  toastMessageElement.text(msg);
  
  // Show toast with modern animation
  toastElement.addClass('show');
  
  // Auto-hide after delay
  setTimeout(() => {
    toastElement.removeClass('show');
    setTimeout(() => {
      toastElement.hide();
    }, 300); // Wait for animation to complete
  }, delay);
  
  // Handle close button
  toastElement.find('.toast-close').off('click').on('click', () => {
    toastElement.removeClass('show');
    setTimeout(() => {
      toastElement.hide();
    }, 300);
  });
  
  return { hide: () => toastElement.removeClass('show') };
}

export function showDeleteToast() {
  return new Promise((resolve) => {
    const toastElement = $("#AlertToast");
    const myOverlay = $("#myOverlay");
    
    // Show backdrop and toast with modern animation
    myOverlay.removeClass("d-none");
    toastElement.addClass('show');
    
    const deleteButton = toastElement.find(".btn-delete");
    const cancelButton = toastElement.find(".btn-cancel");

    const handleClick = (result) => {
      // Hide with animation
      toastElement.removeClass('show');
      myOverlay.addClass("d-none");
      
      // Clean up event listeners
      deleteButton.off('click');
      cancelButton.off('click');
      
      resolve(result);
    };

    deleteButton.on("click", () => handleClick(true));
    cancelButton.on("click", () => handleClick(false));
    
    // Close on backdrop click
    myOverlay.on('click', () => handleClick(false));
  });
}
