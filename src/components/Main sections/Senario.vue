<template>
  <input v-show="false" type="file" ref="formFile" accept="image/*" multiple @change="handleFile" />

  <div :id="id" class="scenario-workspace">
    <div class="scenario-container" ref="senarioContainer" :id="'senarioContainer'+id">
      <div class="scenario-header">
        <div class="scenario-title-card">
          <div class="scenario-icon">
            <i class="bi bi-layers-fill" aria-hidden="true"></i>
          </div>
          <h3 class="scenario-title">{{ id.replace('Senario-', 'Szenario ') }}</h3>
          <div class="scenario-status">
            <span class="status-indicator" :class="{ 'active': hasImg }"></span>
            <span class="status-text">{{ hasImg ? 'Bereit' : 'Bild erforderlich' }}</span>
          </div>
        </div>
      </div>

      <div class="scenario-content">
        <div class="content-area" :class="{ 'has-image': hasImg }">
          <div class="sortable-container" ref="sortableContainer">
            <component v-for="(item, key) in this.$store.state.componentData.senariosData[this.id]
              .component" :key="key" :is="getComponentName(key)" :id="key" :senario="id"
              @contextmenu="handleRightClick(key, $event)" :componentProps="item">
            </component>
          </div>
          
          <div v-if="!hasImg" class="drop-zone">
            <div class="drop-zone-content">
              <i class="bi bi-cloud-upload drop-icon" aria-hidden="true"></i>
              <h4 class="drop-title">Bild hinzufügen</h4>
              <p class="drop-description">Ziehen Sie ein Bild hierher, um zu beginnen</p>
            </div>
          </div>
        </div>
      </div>
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
      $(this.$refs.sortableContainer).sortable({
        handle: '.drag-handle',
        axis: 'y',
        containment: 'parent'
      });

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
.scenario-workspace {
  margin-bottom: var(--space-8);
}

.scenario-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(217, 226, 236, 0.3);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.scenario-container:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}

.scenario-header {
  background: linear-gradient(135deg, var(--primary-50), rgba(240, 244, 248, 0.8));
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
  padding: var(--space-4);
  position: sticky;
  top: 0;
  z-index: 10;
}

.scenario-title-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  max-width: 600px;
  margin: 0 auto;
}

.scenario-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-500), var(--accent-teal));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scenario-title {
  flex: 1;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
}

.scenario-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gray-400);
  transition: background-color var(--transition-fast);
}

.status-indicator.active {
  background: var(--success);
  box-shadow: 0 0 0 2px var(--success-light);
}

.status-text {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  font-weight: 500;
}

.scenario-content {
  min-height: 600px;
  max-height: 800px;
  overflow-y: auto;
  padding: var(--space-8);
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 500px;
  max-width: 800px;
  margin: 0 auto;
}

.drop-zone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--primary-300);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--primary-50), rgba(240, 244, 248, 0.5));
  transition: all var(--transition-fast);
  min-height: 300px;
}

.drop-zone:hover {
  border-color: var(--primary-400);
  background: linear-gradient(135deg, var(--primary-100), var(--primary-50));
}

.drop-zone-content {
  text-align: center;
  color: var(--gray-600);
}

.drop-icon {
  font-size: 3rem;
  color: var(--primary-400);
  margin-bottom: var(--space-4);
}

.drop-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}

.drop-description {
  font-size: var(--font-size-sm);
  color: var(--gray-500);
  margin: 0;
}

/* Highlight effect for drag and drop */
.highlight {
  box-shadow: 0 0 0 3px var(--primary-200), 0 0 20px rgba(98, 125, 152, 0.3);
  border-color: var(--primary-400) !important;
}

/* Custom scrollbar */
.scenario-content::-webkit-scrollbar {
  width: 6px;
}

.scenario-content::-webkit-scrollbar-track {
  background: var(--gray-100);
  border-radius: 3px;
}

.scenario-content::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 3px;
}

.scenario-content::-webkit-scrollbar-thumb:hover {
  background: var(--gray-400);
}

/* Sortable placeholder */
.sortable-placeholder {
  background: linear-gradient(135deg, var(--primary-100), rgba(240, 244, 248, 0.8));
  border: 2px dashed var(--primary-300);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  min-height: 80px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sortable-placeholder::after {
  content: 'Hier ablegen';
  color: var(--primary-500);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 768px) {
  .scenario-title-card {
    flex-direction: column;
    gap: var(--space-3);
    text-align: center;
  }
  
  .scenario-content {
    padding: var(--space-4);
    max-height: 500px;
  }
  
  .drop-zone {
    min-height: 200px;
  }
  
  .drop-icon {
    font-size: 2rem;
  }
}
</style>