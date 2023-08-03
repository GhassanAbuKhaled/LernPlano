<template>
  <div class="containerOfSection">
    <!-- Section with div elements -->
    <section>
      <div></div>
      <!-- Placeholder div -->
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <!-- Placeholder div -->
    </section>

    <div class="p-5 text-center mb-5">
    <i class="bi bi-mortarboard-fill moving-text"></i>
    <h1 class="mb-4">Lernplano</h1>
    <h5 class="mb-4">Bergische Universität Wuppertal</h5>
    <!-- Router link to 'main' -->
    <router-link :to="{ name: 'main' }" role="button" class="btn btn-primary me-2 mb-2" ref="lernpfadErstellen">Lernpfad
      erstellen</router-link>
    <!-- File input and upload button -->
    <input type="file" accept=".json" @change="handleFileUpload" class="d-none" ref="jsonFile" />
    <button class="btn btn-primary me-2 mb-2" @click="this.$refs.jsonFile.click()">
      Lernpfad hochladen
    </button>
  </div>
  </div>

</template>

<script>
import anime from "animejs/lib/anime.min.js";
import { showToastMessage } from "@/utils/toastUtils";
export default {
  name: "Hero",
  mounted() {
    this.animation();
  },
  methods: {
    animation() {
      let tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 750,
      });
      // Animation for the section div elements
      tl.add({
        targets: "section div",
        width: "100%",
        backgroundColor: "#a1cc59",
        delay: anime.stagger(80), // increase delay by 100ms for each element
      })
        .add({
          targets: "section div",
          width: "90%",
          backgroundColor: "rgb(235, 235, 255)",
        })
        .add(
          {
            targets: ".text-center",
            top: "240px",
            opacity: 1,
            duration: 2500,
          },
          "-=1600"
        );
      // Animation for the section element
      var squash = anime({
        targets: "section",
        scaleY: "2",
        scaleX: "2",
        translateX: "40%",
        rotate: "45deg",
        duration: 4000,
        autoplay: false,
      });
      // Play the squash animation on mouseover
      $(".text-center").one("mouseover", () => {
        squash.play();
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            if (
              jsonData.thisFile === "main Pfad made by LernPlano" &&
              this.validateObjectStructure(jsonData)
            ) {
              const {
                LernPfadName,
                Lernziele,
                senarios,
                senariosData,
                activeSenario,
                hasLastSenarioImg,
                contentOfInteraktionenMenu,
              } = jsonData;
              this.$store.state.componentData.LernPfadName = LernPfadName;
              this.$store.state.componentData.Lernziele = Lernziele;
              this.$store.state.componentData.senarios = senarios;
              this.$store.state.componentData.senariosData = senariosData;
              this.$store.state.componentData.activeSenario = activeSenario;
              this.$store.state.componentData.hasLastSenarioImg = hasLastSenarioImg;
              this.$store.state.Interaktionen.content = contentOfInteraktionenMenu;
              setTimeout(() => {
                this.$refs.lernpfadErstellen.$el.click();
              }, 50);
            } else {
              showToastMessage("Ungültige Datei!", "top-50 start-50 translate-middle-x");
            }
          } catch (error) {
            console.error("Error parsing JSON file:", error);
            showToastMessage(
              "Fehler beim Parsen der JSON-Datei!",
              "top-50 start-50 translate-middle-x"
            );
          }
        };
        reader.readAsText(file);
      } else {
        showToastMessage(
          "Ungültiges Dateiformat. Bitte wählen Sie eine JSON-Datei aus!",
          "top-50 start-50 translate-middle-x"
        );
      }
    },
    validateObjectStructure(jsonData) {
      const requiredKeys = [
        'LernPfadName',
        'Lernziele',
        'senarios',
        'senariosData',
        'activeSenario',
        'hasLastSenarioImg',
        'contentOfInteraktionenMenu'
      ];
      if (!requiredKeys.every(key => jsonData.hasOwnProperty(key))) {
        return false;
      }
      const { senariosData } = jsonData;
      return Object.keys(senariosData).every(senarioKey => {
        if (!senariosData[senarioKey].hasOwnProperty('component') || !senariosData[senarioKey].hasOwnProperty('imgSrc')) {
          return false;
        }
        const senarioComponent = senariosData[senarioKey].component;
        return Object.keys(senarioComponent).every(componentKey => {
          const component = senarioComponent[componentKey];
          if (componentKey.startsWith("MyImage")) {
            return component.hasOwnProperty("circles");
          } else if (componentKey.startsWith("MyInteraktion")) {
            return (
              component.hasOwnProperty("name") &&
              component.hasOwnProperty("color") &&
              component.hasOwnProperty("taxonomie") &&
              component.hasOwnProperty("bewertung")
            );
          } else if (componentKey.startsWith("MyDate")) {
            return component.hasOwnProperty("date");
          } else if (componentKey.startsWith("MyKommentar")) {
            return component.hasOwnProperty("text");
          } else if (componentKey.startsWith("MyURL")) {
            return component.hasOwnProperty("url");
          }
          return false;
        });
      });
    }

  },
};
</script>

<style scoped>
section {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(10, auto); /* Use 1fr instead of auto */
}

.containerOfSection {
  width: 100vw; /* Set the width to 100vw to cover the full viewport width */
  height: 100vh;
  overflow: hidden;
  position: relative;
}

section div {
  background-color: white;
  transition: background-color 1s;
}
.text-center {
  width: 100%;
  position: absolute;
  top: 50%;
  opacity: 0;
}
i {
  font-size: 65px;
  color: #222222;
  position: absolute;
  top: 30px;
}
@media (max-width: 570px) {
  .p-5.text-center {
    font-size: 2.1vw;
  }
}

@media (max-width: 400px) {
  .p-5.text-center h5 {
    display: none;
  }
}
</style>
