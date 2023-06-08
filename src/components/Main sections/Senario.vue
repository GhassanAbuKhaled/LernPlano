<template>
  <input v-show="false" type="file" ref="formFile" @change="handleFile" />

  <div :id="id" class="position-relative senario">
    <div class="senarioContainer m-2  pb-5 shadow-lg bg-body-tertiary rounded" ref="senarioContainer" :id="'senarioContainer'+id">
      <p class="text-center p-3 align-self-center shadow-lg bg-body-tertiary rounded senarioTitle position-sticky top-0 z-3">
        <strong>{{ id }}</strong>
      </p>

      <component v-for="(item, key) in this.$store.state.componentData.senariosData[this.id]
        .component" :key="key" :is="getComponentName(key)" :id="key" :senario="id"
        @contextmenu="handleRightClick(key, $event)" :componentProps="item">
      </component>
    </div>
  </div>
</template>

<script>
import MyURL from "../Items/MyURL.vue";
import MyDate from "../Items/MyDate.vue";
import MyInteraktion from "../Items/MyInteraktion.vue";
import MyKommentar from "../Items/MyKommentar.vue";
import MyImage from "../Items/MyImage.vue";
import { handleRightClickAction, rgbToHex } from "@/utils/rightClickUtils";
import { showToastMessage } from "@/utils/toastUtils";

export default {
  props: {
    id: { type: String },
  },
  components: { MyURL, MyDate, MyInteraktion, MyKommentar, MyImage },
  data() {
    return {
      hasImg: null,
    }
  },
  mounted() {
    try {
      const $senarioContainer = $('#' + this.id);
      $senarioContainer
        .droppable({
          activeClass: "highlight",
          drop: this.checkIfImgExsist,
        })
      $(this.$refs.senarioContainer).sortable({ cancel: '.senarioTitle , .myCanvasContainer' })

    } catch (error) {
      console.error(error);
    }
    (this.$store.state.componentData.senariosData[this.id].imgSrc) ? this.hasImg = true : false;
  },
  methods: {
    getComponentName(key) {
      return key.replace(/\d+$/, "");
    },
    async handleRightClick(key, event) {
      const name = this.getComponentName(key);

      if (!name.includes("Image")) {
        // Handle right-click event and show the context menu
        event.preventDefault();
        const menuPosition = { x: event.clientX, y: event.clientY };
        this.$store.state.componentData.menuPosition = menuPosition;
        !name.includes("Interaktion")
          ? $("#rightClickColor").hide()
          : $("#rightClickColor").show();

        if (name.includes("Interaktion")) {
          const colorValue = $(`#${key}`).find("i, p").css("color");
          const col = rgbToHex(colorValue);
          $("#myPalette").val(col);
        }
        handleRightClickAction(name.replace(/My/, ""), key);
      }
    },
    addComponent(key, dataOfComponent) {
      // Add a component to the componentData and imagesTap data objects
      const id = key + Date.now();
      this.$store.state.componentData.senariosData[this.id].component[
        id
      ] = dataOfComponent;

      if (key !== 'MyImage')
        this.$nextTick(() => {
          this.scrollToElement();
        });
    },
    handleDrop(event, ui) {
      const itemId = ui.helper[0].id;
      // Handle the dropped item in the ArbeitsBereich element
      try {
        switch (itemId) {
          case "link":
            this.addComponent("MyURL", { url: "" });
            break;
          case "date":
            this.addComponent("MyDate", { date: "" });
            break;
          case "kommentar":
            this.addComponent("MyKommentar", { text: "" });
            break;
          default:
            if (ui.helper[0].tagName === "LI") {
              this.addComponent("MyInteraktion", {
                name: $(ui.helper[0]).html(),
                color: "#688b09",
                taxonomie: "Taxonomie",
                bewertung: 0,
              });
            }
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
    checkIfImgExsist(event, ui) {
      const itemId = ui.helper[0].id;
      if (!this.hasImg && itemId === "img") {
        $(this.$refs.formFile).val("").click();
        this.$store.state.componentData.hasLastSenarioImg = true;
      } else if (itemId !== "img" && this.hasImg) {
        this.handleDrop(event, ui);
      } else if (!this.hasImg) {
        showToastMessage("Sie sollen ein Bild addieren !");
      } else {
        showToastMessage("Sie sollen einen neuen Senario addieren !");
      }
    },
    handleFile(e) {
      // Handle file input change event
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.addComponent("MyImage", {
          circles: [],
        });
        this.$store.state.componentData.senariosData[this.id].imgSrc = URL.createObjectURL(file);
        this.hasImg = true;
      } else if (file) {
        showToastMessage("Ausgewählte Datei ist kein Bild!");
      }
    },
    scrollToElement() {
      // Scroll to the bottom of the ArbeitsBereich element
      $(this.$refs.senarioContainer).animate(
        { scrollTop: $(this.$refs.senarioContainer).prop("scrollHeight") },
        500
      );
    },
  },
};
</script>

<style scoped>
.senarioContainer {
  min-height: 500px;
  max-height: 530px;
  display: flex;
  margin-bottom: 200px;
  padding-bottom: 200px !important;
  flex-direction: column;
  overflow-y: scroll;
}
.highlight {
  box-shadow: 0 0 3px 3px red;
}
.senarioTitle {
  height: fit-content;
  width: 80%;
}
</style>
