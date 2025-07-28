<template>
  <div class="toast-container position-fixed" ref="menu" :style="menuStyle">
    <div
      id="RightClickMenu"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-autohide="false"
    >
      <div class="toast-header text-light">
        <i class="bi bi-mortarboard-fill me-2 fs-5"></i>
        <strong class="me-auto fs-6">Lernplano</strong>
      </div>
      <div class="toast-body">
        <ul class="list-group">
          <li
            class="list-group-item list-group-item-action"
            id="rightClickColor"
            @click="showPalette($event)"
          >
            <i class="bi bi-palette-fill text-warning"></i>

            Farben
          </li>
          <li class="list-group-item list-group-item-action" id="rightClickdelete">
            <i class="bi bi-trash3"></i>
            Löschen
          </li>
        </ul>
      </div>
    </div>
  </div>

  <input
    type="color"
    value="#563d7c"
    title="Choose your color"
    id="myPalette"
    :style="paletteStyle"
  />
</template>

<script>
export default {
  data() {
    return {
      menuStyle: {
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
      },
      paletteStyle: {
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
      },
      colorOfInteraktion: {
        color: "black",
      },
    };
  },
  computed: {
    menuPosition() {
      return this.$store.state.componentData.menuPosition;
    },
  },
  watch: {
    menuPosition(newPosition) {
      this.show(newPosition);
    },
  },
  methods: {
    show(position) {
      this.menuStyle = {
        display: "block",
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
      };
      this.paletteStyle = {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        opacity: 0,
      };
    },
    hide() {
      this.menuStyle = {
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
      };
    },
    showPalette(event) {
      event.stopPropagation(); // Stop event propagation
      $("#myPalette").click();
    },
  },
  mounted() {
    document.addEventListener("click", this.hide);
    window.addEventListener("scroll", this.hide);
    $(".senarioContainer").on("scroll", () => this.hide());
  },
};
</script>

<style scoped>
.toast-header i {
  color: white;
}

.toast-container {
  z-index: 1060;
}

.toast-container:hover {
  cursor: default;
}

.toast-body,
.list-group {
  padding: 0 !important;
  border: none !important;
  border-radius: 0px !important;
}

.list-group i {
  font-size: medium;
}
</style>
