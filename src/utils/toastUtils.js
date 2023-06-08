import { Toast } from "bootstrap/dist/js/bootstrap.js";

export function showToastMessage(msg, position = "top-0 end-0" , closeBtn="btn-close" , delay=5000) {
  const toastElement = $("#toastMessage");
  const toastContainer = $("#toastContainer");
  toastContainer.removeClass('top-50 start-50 translate-middle-x bottom-0 start-0');
  toastContainer.addClass(position);
 
  const toastBodyElement = toastElement.find(".toast-body");
  const closeButton = toastElement.find("button");
  closeButton.removeClass('d-none')
  closeButton.addClass(closeBtn);
  toastBodyElement.text(msg);
  const toast = new Toast(toastElement,{delay: delay});
  toast.show();
  return toast;
}

export function showDeleteToast() {
  return new Promise((resolve, reject) => {
    const toastElement = $("#AlertToast");
    const myOverlay = $("#myOverlay");
    myOverlay.removeClass("d-none");
    const deleteButton = toastElement.find(".btn-danger");
    const closeButton = toastElement.find(".btn-secondary");
    const toast = new Toast(toastElement);

    const handleClick = (result) => {
      myOverlay.addClass("d-none");
      resolve(result);
    };

    deleteButton.on("click", () => handleClick(true));
    closeButton.on("click", () => handleClick(false));

    toast.show();
  });
}
