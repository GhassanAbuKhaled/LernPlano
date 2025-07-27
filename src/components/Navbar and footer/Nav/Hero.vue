<template>
  <div class="hero-container">
    <!-- Animated background section -->
    <section class="animated-background" aria-hidden="true">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </section>

    <div class="hero-content">
      <div class="hero-icon-container">
        <i class="bi bi-mortarboard-fill hero-icon moving-text" aria-hidden="true"></i>
      </div>
      
      <div class="hero-text">
        <h1 class="hero-title">Lernplano</h1>
        <p class="hero-subtitle">Bergische Universität Wuppertal</p>
        <p class="hero-description">Erstellen Sie interaktive Lernpfade für eine moderne Bildungserfahrung</p>
      </div>
      
      <div class="hero-actions">
        <router-link 
          :to="{ name: 'main' }" 
          class="btn btn-primary btn-lg" 
          ref="lernpfadErstellen"
          aria-label="Neuen Lernpfad erstellen"
        >
          <i class="bi bi-plus-circle" aria-hidden="true"></i>
          <span>Lernpfad erstellen</span>
        </router-link>
        
        <input 
          type="file" 
          accept=".json" 
          @change="handleFileUpload" 
          class="visually-hidden" 
          ref="jsonFile" 
          id="jsonFileInput"
          aria-label="JSON-Datei für Lernpfad auswählen"
        />
        
        <button 
          class="btn btn-secondary btn-lg" 
          @click="$refs.jsonFile.click()"
          aria-label="Bestehenden Lernpfad hochladen"
        >
          <i class="bi bi-upload" aria-hidden="true"></i>
          <span>Lernpfad hochladen</span>
        </button>
      </div>
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
            targets: ".hero-content",
            opacity: 1,
            translateY: 0,
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
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.addEventListener("mouseover", () => {
          squash.play();
        }, { once: true });
      }
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
.hero-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7f9fc 0%, #e8f4f8 50%, #d9e8f5 100%);
}

.animated-background {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.animated-background div {
  background-color: white;
  transition: background-color 1s ease;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: var(--space-8);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 0.5s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-icon-container {
  position: relative;
  margin-bottom: var(--space-6);
}

.hero-icon {
  font-size: 4rem;
  background: linear-gradient(135deg, var(--primary-500), var(--accent-teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
}

.hero-text {
  margin-bottom: var(--space-8);
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--gray-800), var(--primary-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--gray-600);
  margin-bottom: var(--space-3);
  font-weight: 500;
}

.hero-description {
  font-size: var(--font-size-base);
  color: var(--gray-500);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-base);
  font-weight: 600;
  border-radius: var(--radius-lg);
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-lg i {
  font-size: var(--font-size-base);
  margin-right: 0;
}

.btn-lg span {
  white-space: nowrap;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    padding: var(--space-6) var(--space-4);
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
  
  .hero-icon {
    font-size: 3rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-lg {
    width: 100%;
    max-width: 280px;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-sm);
  }
  
  .hero-description {
    font-size: var(--font-size-sm);
  }
  
  .hero-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 400px) {
  .hero-subtitle {
    display: none;
  }
}
</style>
