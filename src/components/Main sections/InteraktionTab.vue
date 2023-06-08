<template>
  <div class="nav nav-tabs bg-light p-1">
    <i class="bi bi-plus-square-fill nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="Add Interaktion " @click="addInteraktionToggle = !addInteraktionToggle"></i>
    <i class="bi bi-shield-fill-x nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="Lösche Interaktionen " @click="deleteBoxes"></i>

    <i class="bi bi-check-all nav-link" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Alle wählen"
      @click="checkAll"></i>
    <i class="bi bi-file-earmark-arrow-down-fill nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="Interaktion herunterladen" @click="InteraktionHerunterladen"></i>
    <i class="bi bi-file-earmark-arrow-up-fill nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
      data-bs-title="Interaktion Hochladen" @click="this.$refs.InteraktionJsonFile.click()"></i>
    <input type="file" ref="InteraktionJsonFile" class="d-none" accept=".json" @change="handleFileUpload" />
    <div class="input-group input-group-sm mb-2 mt-2" v-show="addInteraktionToggle">
      <span class="input-group-text" id="inputGroup-sizing-sm">{{ currentTap }}</span>
      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
        v-model="addInteraktion" />
      <span class="input-group-text" style="height: 35px">
        <i class="bi bi-check-square-fill" style="font-size: large; cursor: pointer" @click="saveInteraktion"
          data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add"></i>
      </span>
    </div>
  </div>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button v-for="(name, index) of navTabNames" :class="['nav-link', index === activeTab ? 'active' : '']" :key="name"
        :id="'nav-' + name + '-tab'" data-bs-toggle="tab" :data-bs-target="'#nav-' + name" type="button" role="tab"
        :aria-controls="'nav-' + name" aria-selected="false" @click="setCurrentTab(name, index)">
        {{ name }}
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div v-for="(name, index) of navTabNames" :key="name"
      :class="['tab-pane', 'fade', index === activeTab ? 'show active' : '']" :id="'nav-' + name" role="tabpanel"
      :aria-labelledby="'nav-' + name + '-tab'" tabindex="0">
      <div class="form-check" v-for="(isChecked, key) of navTabContent[name]">
        <input class="form-check-input" type="checkbox" :value="key" @click="setAsChecked" :checked="isChecked" />
        <label class="form-check-label text-break" :for="key">{{ key }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { showDeleteToast, showToastMessage } from "@/utils/toastUtils";
export default {
  data() {
    return {
      currentTap: "Global",
      activeTab: 0,
      navTabNames: this.$store.state.Interaktionen.navTabNames,
      navTabContent: this.$store.state.Interaktionen.content,
      addInteraktionToggle: false,
      JsonInteraktionToggle: false,
      addInteraktion: "",
    };
  },
  computed: {
    isAllChecked() {
      const currentTabContent = this.navTabContent[this.currentTap];
      return Object.values(currentTabContent).every((isChecked) => isChecked);
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file && file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            this.$store.state.Interaktionen.content = jsonData;
            this.navTabContent = this.$store.state.Interaktionen.content;
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };

        reader.readAsText(file);
      } else {
        console.error("Invalid file format. Please select a JSON file.");
        showToastMessage("Invalid file format...!", "top-50 start-50 translate-middle-x");
      }
    },
    setAsChecked(event) {
      const { currentTap } = this;
      const { value, checked } = event.target;
      this.$store.state.Interaktionen.content[currentTap][value] = checked;
    },
    saveInteraktion() {
      const trimmedStr = this.addInteraktion.trim();
      if (trimmedStr === "") {
        showToastMessage("Leere Eingabe..!");
        return;
      }
      this.$store.commit("addInteraktion", {
        interaktion: this.currentTap,
        value: trimmedStr,
      });
    },
    checkAll() {
      const { currentTap } = this;
      const isChecked = !this.isAllChecked;
      const currentTabContent = this.navTabContent[currentTap];

      for (const key in currentTabContent) {
        currentTabContent[key] = isChecked;
      }
    },
    async deleteBoxes() {
      const currentTabContent = this.$store.state.Interaktionen.content[this.currentTap];
      const checked = Object.keys(currentTabContent).filter(
        (key) => currentTabContent[key]
      );
      if (checked.length === 0) {
        showToastMessage("Sie müssen Boxes auswählen!");
        return;
      }

      try {
        if (!this.$store.state.Interaktionen.dontAskAgain) {
          const shouldDelete = await showDeleteToast();
          if (shouldDelete) {
            this.$store.commit("deleteBoxes", {
              currentTap: this.currentTap,
              checked,
            });
          }
        } else {
          this.$store.commit("deleteBoxes", {
            currentTap: this.currentTap,
            checked,
          });
        }
      } catch (error) {
        throw error;
      }
    },
    setCurrentTab(name, index) {
      this.currentTap = name;
      this.activeTab = index;
    },
    InteraktionHerunterladen() {
      const data = this.$store.state.Interaktionen.content;
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Interaktionen.json";
      link.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>
<style scoped>
i:hover {
  transform: scale(1.2);
  color: #a1cc59;
}

i {
  color: black;
  font-size: larger;
}
</style>
