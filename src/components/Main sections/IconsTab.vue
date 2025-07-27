<template>
  <div class="modern-toolbar" role="toolbar" aria-label="Learning path tools">
    <div class="toolbar-section">
      <h3 class="toolbar-title">Werkzeuge</h3>
      <div class="tool-group">
        <button 
          class="tool-btn tool-btn-primary" 
          @click="downloadData"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-title="Als JSON herunterladen"
          aria-label="Lernpfad als JSON-Datei herunterladen"
        >
          <i class="bi bi-file-earmark-code-fill" aria-hidden="true"></i>
          <span class="tool-label">JSON</span>
        </button>
        
        <button 
          class="tool-btn tool-btn-primary" 
          @click="downloadPDF"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-title="Als PDF herunterladen"
          aria-label="Lernpfad als PDF herunterladen"
        >
          <i class="bi bi-file-earmark-pdf-fill" aria-hidden="true"></i>
          <span class="tool-label">PDF</span>
        </button>
      </div>
    </div>

    <div class="toolbar-section" v-show="this.$store.state.componentData.senarios">
      <h3 class="toolbar-title">Elemente</h3>
      <div class="tool-group">
        <div 
          v-for="icon in draggableIcons" 
          :key="icon.class" 
          class="tool-btn tool-btn-draggable nav-item"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          :data-bs-title="icon.name"
          :aria-label="`${icon.name} hinzufügen`"
        >
          <i :class="['bi', icon.class, 'nav-link']" aria-hidden="true"></i>
          <span class="tool-label">{{ icon.name }}</span>
        </div>
      </div>
    </div>

    <div class="toolbar-section">
      <h3 class="toolbar-title">Aktionen</h3>
      <div class="tool-group">
        <button 
          class="tool-btn tool-btn-secondary" 
          data-bs-toggle="modal" 
          data-bs-target="#AllInteraktionenBackdrop"
          aria-label="Alle verfügbaren Interaktionen anzeigen"
        >
          <i class="bi bi-grid-3x3-gap-fill" aria-hidden="true"></i>
          <span class="tool-label">Alle</span>
        </button>
        
        <button 
          class="tool-btn tool-btn-secondary" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          aria-label="Ausgewählte Interaktionen anzeigen"
        >
          <i class="bi bi-check2-square" aria-hidden="true"></i>
          <span class="tool-label">Auswahl</span>
        </button>
        
        <button 
          class="tool-btn tool-btn-danger" 
          @click="resetArbeitsBereich"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-title="Alles löschen"
          aria-label="Alle Szenarien löschen"
        >
          <i class="bi bi-trash3-fill" aria-hidden="true"></i>
          <span class="tool-label">Löschen</span>
        </button>
      </div>
    </div>

    <div class="toolbar-section">
      <h3 class="toolbar-title">Szenarien</h3>
      <div class="tool-group">
        <button 
          class="tool-btn tool-btn-success" 
          id="addSenario" 
          @click="addSenario"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-title="Neues Szenario hinzufügen"
          aria-label="Neues Szenario erstellen"
        >
          <i class="bi bi-plus-circle-fill" aria-hidden="true"></i>
          <span class="tool-label">Neu</span>
        </button>
        
        <button 
          class="tool-btn tool-btn-warning" 
          @click="deleteSenario"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-title="Aktuelles Szenario löschen"
          aria-label="Aktuelles Szenario löschen"
        >
          <i class="bi bi-dash-circle-fill" aria-hidden="true"></i>
          <span class="tool-label">Entfernen</span>
        </button>
        
        <button 
          class="tool-btn tool-btn-info" 
          id="lernPfadInfo" 
          data-bs-toggle="modal"
          data-bs-target="#lernPfadInfo"
          aria-label="Lernpfad-Name und Lernziele bearbeiten"
        >
          <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
          <span class="tool-label">Info</span>
        </button>
        
        <div class="dropdown" v-show="this.$store.state.componentData.senarios">
          <button 
            class="tool-btn tool-btn-secondary dropdown-toggle" 
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            aria-label="Zwischen Szenarien wechseln"
          >
            <i class="bi bi-layers-fill" aria-hidden="true"></i>
            <span class="tool-label">Szenarien</span>
          </button>
          <ul class="dropdown-menu modern-dropdown">
            <li v-for="index in this.$store.state.componentData.senarios" :key="index">
              <button class="dropdown-item" @click="goToSenario(index)">
                <i class="bi bi-play-circle-fill me-2" aria-hidden="true"></i>
                Szenario {{ index }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import { showDeleteToast, showToastMessage } from "@/utils/toastUtils";
import AccordionInteraktion from "./AccordionInteraktion.vue";
export default {
  data() {
    return {
      draggableIcons: [
        { class: "bi-image-fill", id: "img", name: "Image" },
        { class: "bi-link-45deg", id: "link", name: "URL" },
        { class: "bi-calendar-event-fill", id: "date", name: "Date" },
        { class: "bi-chat-square-text-fill", id: "kommentar", name: "Text" },
      ],
    };
  },
  components: { AccordionInteraktion },
  mounted() {
    this.makeIconsDraggable();
    this.initializeTooltips();
  },
  methods: {
    makeIconsDraggable() {
      this.draggableIcons.forEach((icon) => {
        $(`.${icon.class}.nav-link`).draggable({
          appendTo: "body",
          iframeFix: true,
          helper: function () {
            return $(this).clone().addClass("clone").attr("id", icon.id);
          },
        });
      });
    },
    initializeTooltips() {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach((tooltip) => new Tooltip(tooltip));
    },
    downloadPDF() {
      $("#downloadPDF").click();
    },
    downloadData() {
      const data = {
        LernPfadName: this.$store.state.componentData.LernPfadName,
        Lernziele: this.$store.state.componentData.Lernziele,
        senarios: this.$store.state.componentData.senarios,
        senariosData: this.$store.state.componentData.senariosData,
        activeSenario: this.$store.state.componentData.activeSenario,
        hasLastSenarioImg: this.$store.state.componentData.hasLastSenarioImg,
        contentOfInteraktionenMenu: this.$store.state.Interaktionen.content,
        thisFile: "main Pfad made by LernPlano",
      };
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lernPfad.json";
      link.click();
      URL.revokeObjectURL(url);
    },

    async resetArbeitsBereich() {
      if (this.$store.state.componentData.senarios) {
        if (await showDeleteToast()) {
          this.$store.state.componentData.senariosData = {};
          this.$store.state.componentData.menuPosition = {};
          this.$store.state.componentData.hasLastSenarioImg = false;
          this.$store.state.componentData.activeSenario = null;
          this.$store.state.componentData.senarios = 0;
        }
      } else {
        showToastMessage("Es gibt nichts zu löschen !");
      }
    },
    addSenario() {
      $('[id^="Senario-"]').hide();
      if (
        this.$store.state.componentData.hasLastSenarioImg ||
        this.$store.state.componentData.senarios == 0
      ) {
        const newSenario = `Senario-${++this.$store.state.componentData.senarios}`;
        this.$store.state.componentData.senariosData[newSenario] = {
          component: {},
          imgSrc: null,
        };
        $("#" + newSenario).show(400);
        this.$store.state.componentData.hasLastSenarioImg = false;
        this.$store.state.componentData.activeSenario = newSenario;
      } else {
        showToastMessage("Sie haben bereits einen leeren Senario !");
        const lastSenario = this.$store.state.componentData.senarios;
        $(`#Senario-${lastSenario}`).show(400);
      }
    },

    async deleteSenario() {
      if (this.$store.state.componentData.senarios > 0 && (await showDeleteToast())) {
        delete this.$store.state.componentData.senariosData[
          this.$store.state.componentData.activeSenario
        ];
        this.updateSenarios();
      } else {
        showToastMessage("Es gibt keinen Senario zu löschen !");
      }
    },
    updateSenarios() {
      this.$store.state.componentData.activeSenario = `Senario-${--this.$store.state
        .componentData.senarios}`;

      const senariosData = {};
      Object.entries(this.$store.state.componentData.senariosData).forEach(
        ([key, value], index) => {
          // Modify the key as needed
          const updatedKey = `Senario-${index + 1}`;
          // Store the updated key-value pair in the new object
          senariosData[updatedKey] = value;
        }
      );

      this.$store.state.componentData.senariosData = senariosData;

      if (this.$store.state.componentData.senarios) {
        const lastSenarios = `Senario-${this.$store.state.componentData.senarios}`;
        this.$store.state.componentData.hasLastSenarioImg = !!this.$store.state
          .componentData.senariosData[lastSenarios]?.imgSrc;
      }
    },

    goToSenario(index) {
      this.$store.state.componentData.activeSenario = `Senario-${index}`;
      $('[id^="Senario-"]').hide();
      $("#Senario-" + index).show(400);
    },
  },
};
</script>
<style scoped>
.modern-toolbar {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(247, 249, 252, 0.9));
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(217, 226, 236, 0.4);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  position: relative;
  overflow: hidden;
}

.modern-toolbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500), var(--accent-teal), var(--accent-purple));
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.toolbar-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.toolbar-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--gray-800);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: linear-gradient(135deg, var(--primary-50), rgba(240, 244, 248, 0.6));
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-500);
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tool-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: flex-start;
}

.tool-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, white, rgba(247, 249, 252, 0.8));
  color: var(--gray-600);
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 70px;
  width: auto;
  height: 65px;
  text-align: center;
  position: relative;
  overflow: visible;
}



.tool-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08);
  border-color: var(--primary-400);
}

.tool-btn i {
  font-size: var(--font-size-xl);
  transition: all var(--transition-fast);
}

.tool-btn:hover i {
  transform: scale(1.1);
}

.tool-label {
  font-size: 10px;
  line-height: 1.1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  max-width: 100px;
}

/* Button variants */
.tool-btn-primary {
  border-color: var(--primary-400);
  color: var(--primary-700);
  background: linear-gradient(145deg, var(--primary-50), rgba(240, 244, 248, 0.9));
  box-shadow: 0 4px 8px rgba(98, 125, 152, 0.15);
}

.tool-btn-primary:hover {
  border-color: var(--primary-500);
  background: linear-gradient(145deg, var(--primary-100), var(--primary-50));
  color: var(--primary-800);
  box-shadow: 0 8px 25px rgba(98, 125, 152, 0.25);
}

.tool-btn-secondary {
  border-color: var(--gray-300);
  color: var(--gray-600);
}

.tool-btn-secondary:hover {
  border-color: var(--gray-400);
  background: var(--gray-50);
  color: var(--gray-700);
}

.tool-btn-success {
  border-color: var(--success);
  color: var(--success);
  background: linear-gradient(145deg, var(--success-light), rgba(198, 246, 213, 0.8));
  box-shadow: 0 4px 8px rgba(56, 161, 105, 0.15);
}

.tool-btn-success:hover {
  border-color: var(--success);
  background: linear-gradient(145deg, #c6f6d5, var(--success-light));
  box-shadow: 0 8px 25px rgba(56, 161, 105, 0.25);
}

.tool-btn-warning {
  border-color: var(--warning);
  color: var(--warning);
  background: linear-gradient(145deg, var(--warning-light), rgba(250, 240, 137, 0.8));
  box-shadow: 0 4px 8px rgba(214, 158, 46, 0.15);
}

.tool-btn-warning:hover {
  border-color: var(--warning);
  background: linear-gradient(145deg, #faf089, var(--warning-light));
  box-shadow: 0 8px 25px rgba(214, 158, 46, 0.25);
}

.tool-btn-danger {
  border-color: var(--error);
  color: var(--error);
  background: linear-gradient(145deg, var(--error-light), rgba(254, 215, 215, 0.8));
  box-shadow: 0 4px 8px rgba(229, 62, 62, 0.15);
}

.tool-btn-danger:hover {
  border-color: var(--error);
  background: linear-gradient(145deg, #fed7d7, var(--error-light));
  box-shadow: 0 8px 25px rgba(229, 62, 62, 0.25);
}

.tool-btn-info {
  border-color: var(--primary-300);
  color: var(--info);
  background: var(--primary-50);
}

.tool-btn-info:hover {
  border-color: var(--info);
  background: var(--primary-100);
}

/* Draggable tools */
.tool-btn-draggable {
  border-color: var(--accent-purple);
  color: var(--accent-purple);
  background: linear-gradient(145deg, var(--accent-purple-light), rgba(233, 216, 253, 0.8));
  box-shadow: 0 4px 8px rgba(128, 90, 213, 0.15);
}

.tool-btn-draggable:hover {
  border-color: var(--accent-purple);
  background: linear-gradient(145deg, #e9d8fd, var(--accent-purple-light));
  box-shadow: 0 8px 25px rgba(128, 90, 213, 0.25);
}

.bi-chat-left-text,
.bi-calendar-month,
.bi-link,
.bi-pin-fill,
.bi-image {
  cursor: grab;
}

.bi-chat-left-text:active,
.bi-calendar-month:active,
.bi-link:active,
.bi-pin-fill:active,
.bi-image:active {
  cursor: grabbing;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.modern-dropdown {
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-lg);
  padding: var(--space-2);
  min-width: 180px;
  max-height: 250px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  border: none;
  background: none;
  color: var(--gray-700);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--primary-50);
  color: var(--primary-700);
}

/* Clone styles for dragging */
.clone {
  color: var(--primary-600) !important;
  font-weight: bold;
  font-size: 1.5rem !important;
  z-index: 1000;
  opacity: 0.8;
  transform: scale(1.1);
}

/* Responsive design */
@media (max-width: 1024px) {
  .modern-toolbar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  
  .toolbar-section {
    min-width: 120px;
  }
  
  .tool-group {
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .modern-toolbar {
    padding: var(--space-4);
  }
  
  .tool-btn {
    min-width: 50px;
    padding: var(--space-2);
  }
  
  .tool-label {
    display: none;
  }
}
</style>
