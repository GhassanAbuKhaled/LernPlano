import { showDeleteToast, showToastMessage } from "@/utils/toastUtils";
import { Toast } from "bootstrap/dist/js/bootstrap.js";
import store from "@/store/index"; // Replace with the actual path to your store

let paletteChangeListener = null;
export async function handleRightClickAction(name, element) {
  try {
    const result = await showRightClickMenu();

    if (result === "delete") {
      
        if (await showDeleteToast()) {
          $(`#${element}`).remove();
          delete store.state.componentData.senariosData[store.state.componentData.activeSenario].component[element];
          showToastMessage(`${name} wurde erfolgreich gelöscht!`);
      } 
    }
    else if(result === "color"){
      if (paletteChangeListener) {
        $('#myPalette').off('change', paletteChangeListener);
      }

      paletteChangeListener = () => {
        $(`#${element}`).find("i,p").css({ color: $('#myPalette').val() });
        store.state.componentData.senariosData[store.state.componentData.activeSenario].component[element].color = $('#myPalette').val();
        
      };

      $('#myPalette').on('change', paletteChangeListener);
    }
  } catch (error) {
    if (error.message === "Promise canceled") {
      return;
    } else {
      // Other errors, rethrow
      throw error;
    }
  }
}

let currentRightClickPromise = null;
let rightClickAbortController = null;
export function showRightClickMenu() {
  if (rightClickAbortController) rightClickAbortController.abort();
  rightClickAbortController = new AbortController();

  currentRightClickPromise = new Promise((resolve, reject) => {
    const toastElement = $("#RightClickMenu");
    const deleteButton = toastElement.find("#rightClickdelete");
    const colorButton = toastElement.find("#rightClickColor");
    const toast = new Toast(toastElement);

    const handleClick = (result) => {
      resolve(result);
    };

    // Remove any existing click event handlers
    deleteButton.off("click");
    colorButton.off("click");

    deleteButton.on("click", () => handleClick("delete"));
    colorButton.on("click", () => handleClick("color"));

    toast.show();

    rightClickAbortController.signal.addEventListener("abort", () => {
      reject(new Error("Promise canceled"));
    });
  });

  return currentRightClickPromise;
}

// wenn wir Promise enden wollen , können wir diese function benutzen
export function cancelRightClickMenu() {
  if (rightClickAbortController) {
    rightClickAbortController.abort();
  }
}

export function rgbToHex(rgb) {
  const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const [, r, g, b] = regex.exec(rgb);
  const hex = [r, g, b]
    .map((component) => parseInt(component).toString(16).padStart(2, '0'))
    .join('');
  return `#${hex}`;
}