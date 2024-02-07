import { showToastMessage } from "@/utils/toastUtils";

const state = {
  navTabNames: [
    "Global",
    "H5P",
    "Moodle",
    "Ilias",
    "Adobe",
    "Vista",
    "Material",
  ],
  content: {
    Global: {
      "Freie Auswahl": false,
      "Freies Zeichenfeld": false,
      Embedded: false,
      Feedback: false,
      Chat: false,
      Videokonferenz: false,
      Download: false,
      "Drag-and-Drop auf Bild": false,
      "Drag-and-Drop-Markierungen": false,
      "Drag-and-Drop auf Text": false,
      "Einfach berechnet": false,
      Berechnete: false,
      "Multiple - Choice": false,
      Beschreibung: false,
      Freitext: false,
      Lückentext: false,
      Lückentextauswahl: false,
      "Multiple-Choice": false,
      Kurzantwort: false,
      Numerisch: false,
      "Wahr/Falsch": false,
      Zuordnung: false,
      Zufällige: false,
      Kurzantwortzuordnung: false,
      Timeline: false,
      "VR-Brile": false,
    },
    H5P: {
      "Interactive Book": false,
      "Twitter User Feed": false,
      Crossword: false,
      "Greeting Card": false,
      "Image Choice": false,
      "Find the words": false,
      "Virtual Tour (360)": false,
      "Branching Scenario": false,
      Dictation: false,
      "Image Pairing": false,
      Essay: false,
      "Image Slider": false,
      "Speak the Words Set": false,
      Flashcards: false,
      "Image Sequencing": false,
      "Agamotto (Image Blender)": false,
      "Speak the Words": false,
      Audio: false,
      "Image Hotspots": false,
      "True/False Question": false,
      Timeline: false,
      Summary: false,
      "Single Choice Set": false,
      "Find Multiple Hotspots": false,
      "Quiz (Question Set)": false,
      "Multiple Choice": false,
      "Mark the Words": false,
      "Interactive Video": false,
      "iframe Embedder": false,
      "Find the Hotspot": false,
      "Fill in the Blanks": false,
      "Memory Game": false,
      "Drag and Drop": false,
      "Documentation Tool": false,
      "Dialog Cards": false,
      "Course Presentation": false,
      "Drag the Words": false,
      Column: false,
      Collage: false,
      Chart: false,
      "Arithmetic Quiz": false,
      Accordion: false,
    },
    Moodle: {
      "Multiple-Choice-Fragen": false,
      "Wahr/Falsch-Fragen": false,
      "Kurzantwort-Fragen": false,
      Zuordnungsfragen: false,
      "Fehlende Wörter": false,
      "Numerische Fragen": false,
      "Berechnete Multiple Choice-Frage": false,
      "Einfach berechnete Frage": false,
      "Drag & Drop-Aufgaben": false,
      Freitext: false,
      Lückentexte: false,
      "Wahr/Falsch-Frage": false,
      Beschreibung: false,
      Aufgabe: false,
      "Gegenseitige Beurteilung": false,
      Chat: false,
      Glossar: false,
      Wiki: false,
      Forum: false,
      Feedback: false,
      "Gesamt-Feedback": false,
      "Allgemeines Feedback": false,
      Spezifisches: false,
      Feedback: false,
      "Kombiniertes Feedback": false,
      "Hinweisendes Feedback": false,
      Selbsteinschätzung: false,
    },
    Ilias: {
      "Begriffe benennen": false,
      "Mutiple-Choice-Fragen": false,
      "Single Choice": false,
      Lückentexte: false,
      Formelfrage: false,
      "Hotspot/Image-Map": false,
      Freitext: false,
    },
    Adobe: {
      Accordion: false,
      Tabs: false,
      "Prosess Circle": false,
      "Pyramid Stack": false,
      Timeline: false,
      "Circle Matrix": false,
      "Pyramid Matrix": false,
      Zertifikat: false,
      Glossary: false,
      "Image Zoom": false,
      "Word Search": false,
      Bookmark: false,
      Bulletin: false,
      Carousel: false,
      "Catch AlphaNum": false,
      "Checkbox Widget": false,
      Timer: false,
      "Drop Down": false,
      Hangman: false,
      List: false,
      Hourglass: false,
      Notes: false,
      "Scrolling Text": false,
      YouTube: false,
    },
    Vista: {
      "Album öffnen": false,
      Video: false,
      "360° Video": false,
      "Floorplan öffnen": false,
      "Popup Video": false,
      "Popup Medium": false,
      "Info Fenster": false,
      "Popup PDF": false,
      "Popup Web Frame": false,
      Audio: false,
      "Komponenten anzeigen / Verstecken": false,
      "Hotspot anzeigen/verstecken": false,
      Hotspot: false,
      "Teilen auf Soziale Netzwerke": false,
      "Medien Steuerung": false,
      "List Control": false,
      "Sprache ändern": false,
      "Datei herunterladen": false,
      "Take Screenshot": false,
      "Zum Score zählen": false,
      "Questiom Card": false,
      "Report anzeigen": false,
      "Timeout anzeigen": false,
      "MC Frage": false,
      "SC Frage": false,
      Punktevergabe: false,
    },
    Material: {
      Code: false,
      SVG: false,
      Bild: false,
      Tabelle: false,
      Link: false,
      Audio: false,
      Video: false,
      "360° Bild": false,
      "3D Objekt": false,
      "360° Video": false,
      Animationen: false,
      Avatar: false,
      Floorplan: false,
      Applikation: false,
      Embedded: false,
    },
  },
};

const mutations = {
 
  addInteraktion: (state, data) => {
    const content = state.content[data.interaktion]; // Get the content object from the state
  
    if (content.hasOwnProperty(data.value)) {
      showToastMessage(
        `(${data.value}) Interaktion ist schon in ${data.interaktion} vorhanden!`
      );
    } else {
      // Convert the content object into an array of key-value pairs
      const contentArray = Object.entries(content);
  
      // Add the new key-value pair at the beginning of the contentArray
      contentArray.unshift([data.value, false]);
  
      // Convert the contentArray back to an object using Object.fromEntries()
      const updatedContent = Object.fromEntries(contentArray);
  
      // Update the state with the updated content object
      state.content[data.interaktion] = updatedContent;
  
      showToastMessage(
        `(${data.value}) Interaktion wurde erfolgreich zu ${data.interaktion} hinzugefügt!`
      );
    }
  },
  
  deleteBoxes: (state, data) => {
    const { currentTap, checked } = data;
    checked.forEach((key) => {
      delete state.content[currentTap][key];
    });
    $(`#nav-${currentTap} input[type="checkbox"]`).prop("checked", false);
  },
};
export default {
  state,
  mutations,
};
