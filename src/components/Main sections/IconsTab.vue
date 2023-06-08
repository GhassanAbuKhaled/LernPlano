<template>
  <ul class="nav justify-content-center fs-5">
    <li class="nav-item">
      <i class="bi bi-filetype-json nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-title="Download json" @click="downloadData"></i>
    </li>
    <li class="nav-item">
      <i class="bi bi-file-pdf-fill nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-title="Download pdf" @click="downloadPDF"></i>
    </li>
    <li v-for="icon in draggableIcons" :key="icon.class" class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top"
      :data-bs-title="icon.name" v-show="this.$store.state.componentData.senarios">
      <i :class="['bi', icon.class, 'nav-link']"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Alle Interaktionen">
      <i class="bi bi-list-columns nav-link" data-bs-toggle="modal" data-bs-target="#AllInteraktionenBackdrop"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ausgewählte Interaktionen">
      <i class="bi bi-list-check nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Alle Löschen">
      <i class="bi bi-shield-fill-x nav-link" @click="resetArbeitsBereich"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Neu senario">
      <i class="bi bi-plus-circle-fill nav-link" id="addSenario" @click="addSenario"></i>
    </li>
    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Lösche senario">
      <i class="bi bi-dash-circle-fill nav-link" @click="deleteSenario"></i>
    </li>

    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="LernPfad Name und Lernziele">
      <i class="bi bi-info-circle-fill nav-link" id="lernPfadInfo" data-bs-toggle="modal"
        data-bs-target="#lernPfadInfo"></i>
    </li>

    <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Alle Senarios"
      v-show="this.$store.state.componentData.senarios">
      <div class="btn-group nav-link">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Senarios
        </button>
        <ul class="dropdown-menu">
          <li v-for="index in this.$store.state.componentData.senarios" :key="index">
            <small class="dropdown-item" @click="goToSenario(index)">Senario {{ index }}</small>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import { showDeleteToast, showToastMessage } from "@/utils/toastUtils";
import AccordionInteraktion from "./AccordionInteraktion.vue";
export default {
  data() {
    return {
      draggableIcons: [
        { class: "bi-image", id: "img", name: "Image" },
        { class: "bi-link", id: "link", name: "URL" },
        { class: "bi-calendar-month", id: "date", name: "Date" },
        { class: "bi-chat-left-text", id: "kommentar", name: "Text" },
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
        $(`.${icon.class}`).draggable({
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
.nav {
  height: fit-content;
  background: #a1cc59;
}
.dropdown-menu {
  min-height: 40px;
  max-height: 250px;
  overflow-y: scroll;
}
.dropdown-item {
  cursor: pointer;
}
.bi {
  cursor: pointer;
  font-weight: bolder;
}
.clone {
  color: tomato;
  font-weight: bolder;
  font-size: larger;
  z-index:30;
}
.bi-chat-left-text,
.bi-calendar-month,
.bi-link,
.bi-pin-fill,
.bi-image {
  cursor: all-scroll;
}
.nav-item i:hover {
  transform: scale(1.2);
  color: black;
}

i,
button {
  color: white;
}
</style>
