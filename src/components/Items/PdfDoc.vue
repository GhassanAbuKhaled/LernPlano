<template>
  <button class="btn d-none" id="downloadPDF" @click="createPdf"></button>
</template>
<script>
import { PDFDocument, StandardFonts, rgb, degrees, grayscale } from "pdf-lib";
import wuppertalLogo from "@/assets/BUW_Logo-weiss-big_wuppertal.png";
import { showToastMessage } from "@/utils/toastUtils";
export default {
  data() {
    return {
      pdfDoc: null,
      form: null,
      page: null,
      pageHeight: 780,
      currentHeight: 0,
      myFont: null,
      senarioTitleFont: null,
      wuppertalLogo: null,
      pagesCount: 0,
      imageSize: null,
      interaktionCount: 0,
      centerX: 0,
      senarioKey: null,
      save: true,
    };
  },
  computed: {
    senarios() {
      return this.$store.state.componentData.senariosData;
    },
  },

  methods: {
    async createPdf() {
      this.pdfDoc = await PDFDocument.create();
      this.myFont = await this.pdfDoc.embedFont(StandardFonts.CourierBold);
      this.senarioTitleFont = await this.pdfDoc.embedFont(
        StandardFonts.TimesRomanBoldItalic
      );
      const imageLogoBytes = await fetch(wuppertalLogo).then((res) => res.arrayBuffer());
      this.wuppertalLogo = await this.pdfDoc.embedPng(imageLogoBytes);
      this.firstPageInitialization();
      this.pagesCount = 0;
      this.save = true;
      if (
        this.$store.state.componentData.LernPfadName ||
        this.$store.state.componentData.Lernziele
      )
        this.newPageInitialization();

      this.addText(this.$store.state.componentData.LernPfadName, "LernPfad: ");
      this.addText(
        this.$store.state.componentData.Lernziele,
        "Beschreibung der Lernziele: "
      );

      for (const senarioKey of Object.keys(this.senarios)) {
        const ids = $(`#senarioContainer${senarioKey}`)
          .children()
          .map(function () {
            return $(this).attr("id");
          })
          .get();
        this.senarioKey = senarioKey;
        this.newPageInitialization();
        this.addSenarioTitle();
        this.interaktionCount = 0;
        for (const compKey of ids) {
          const component = this.senarios[senarioKey].component[compKey];
          if (component.hasOwnProperty("name")) this.addInteraktion(component);
          if (component.hasOwnProperty("date")) this.addText(component.date, "Date: ");
          if (component.hasOwnProperty("circles"))
            await this.addImage(this.senarios[senarioKey].imgSrc, compKey);
          if (component.hasOwnProperty("text"))
            this.addText(component.text, "Kommentar: ");
          if (component.hasOwnProperty("url")) this.addText(component.url, "URL: ");
        }
      }

      if (this.save) {
        const pdfBytes = await this.pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const downloadLink = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = downloadLink;
        link.download = "lernPfad.pdf";
        link.click();
      }
    },

    addPageIfNeeded(elementHeight) {
      if (this.currentHeight + elementHeight >= 770) {
        this.newPageInitialization();
      }
    },

    newPageInitialization() {
      this.page = this.pdfDoc.addPage();
      this.currentHeight = 0;
      this.pagesCount++;
      this.page.setFont(this.myFont);
      const { width, height } = this.page.getSize();

      const imageSize = this.wuppertalLogo.scale(0.15);

      this.page.drawText(this.pagesCount.toString(), {
        x: width / 2,
        y: 14,
        size: 8,
      });
      const col = this.hexToRgb("#87ba2d");

      this.page.moveTo(40, this.pageHeight);
      this.page.drawRectangle({
        x: 0,
        y: this.pageHeight + 30,
        width: width,
        color: rgb(col.r, col.g, col.b),
      });
      this.page.moveUp(34);
      this.page.drawImage(this.wuppertalLogo, {
        x: 8,
        width: imageSize.width,
        height: imageSize.height,
      });
      this.page.moveTo(40, this.pageHeight);
    },

    addSenarioTitle() {
      const center = (this.page.getWidth() - 60) / 2;
      this.page.drawText(`${this.senarioKey}`, {
        size: 16,
        x: center,
        font: this.senarioTitleFont,
      });
      this.page.moveDown(25);
      this.currentHeight += 25;
    },

    addInteraktion(component) {
      const col = this.hexToRgb(component.color);
      this.addPageIfNeeded(25);
      try {
        this.page.drawText(
          `(${++this.interaktionCount})-${component.name} | Taxonomie: ${
            component.taxonomie
          } | Bewertung: ${component.bewertung}`,
          { x: 60, size: 10, color: rgb(col.r, col.g, col.b) }
        );
      } catch (error) {
        this.save = false;
        console.log(error.message);
        showToastMessage(
          `Im ${this.senarioKey} Es gibt einige Symbole in der Interaktion, die nicht analysiert werden können`,
          "top-50 start-50 translate-middle-x"
        );
      }
      this.page.moveDown(25);
      this.currentHeight += 25;
    },

    addText(text, title) {
      if (text !== "" && text) {
        this.addPageIfNeeded(50);
        const col = this.hexToRgb("#FF0000");
        this.page.moveDown(25);
        this.page.drawText(`${title}`, {
          size: 14,
          x: 60,
          color: rgb(col.r, col.g, col.b),
        });
        this.page.moveDown(25);
        this.currentHeight += 50;
        const lines = this.getTextLines(text);

        lines.forEach((line) => {
          this.addPageIfNeeded(25);
          try {
            this.page.drawText(`${line}`, { size: 10, x: 60 });
          } catch (error) {
            this.save = false;
            console.log(error.message);
            showToastMessage(
              `Im ${this.senarioKey} Es gibt einige Symbole im Text, die nicht analysiert werden können`,
              "top-50 start-50 translate-middle-x"
            );
          }
          this.page.moveDown(25);
          this.currentHeight += 25;
        });
      }
    },

    async addImage(src, compKey) {
      const image = await this.pdfDoc.embedJpg(src);
      this.imageSize = image.scale(0.7);
      this.centerX = (this.page.getWidth() - this.imageSize.width) / 2;
      const imageHeight = this.imageSize.height;

      this.addPageIfNeeded(75 + imageHeight);
      this.page.moveDown(25);
      this.page.moveDown(imageHeight);
      this.page.drawImage(image, {
        x: this.centerX,
        width: this.imageSize.width,
        height: this.imageSize.height,
      });
      const canvas2 = $("#canvas2" + compKey)[0];
      const imageData1 = canvas2.toDataURL();
      const image1 = await this.pdfDoc.embedPng(imageData1);
      this.page.drawImage(image1, {
        x: this.centerX,
        width: this.imageSize.width,
        height: this.imageSize.height,
      });
      this.page.moveDown(50);
      this.currentHeight += 75 + this.imageSize.height;
    },

    // first Page of PDF document
    firstPageInitialization() {
      const imageSize = this.wuppertalLogo.scale(0.36);
      this.page = this.pdfDoc.addPage();
      const { width, height } = this.page.getSize();
      this.page.moveTo(20, this.pageHeight);
      const col = this.hexToRgb("#87ba2d");
      this.page.drawRectangle({
        x: 0,
        width: width,
        color: rgb(col.r, col.g, col.b),
      });
      this.page.moveUp(4);
      this.page.drawImage(this.wuppertalLogo, {
        width: imageSize.width,
        height: imageSize.height,
      });
      this.page.moveUp(imageSize.height / 4);
      this.page.moveDown(width / 2.5);
      this.page.drawText(`ZIM - Zentrum für Informations- und Medienverarbeitung`, {
        x: 70,
        size: 14,
        font: this.myFont,
      });
      this.page.moveDown(25);
      this.page.drawText(`Bergische Universität Wuppertal`, {
        x: 160,
        size: 13,
        font: this.myFont,
      });
      this.page.moveDown(25);
      this.page.drawText(`LernPlano`, {
        x: 250,
        size: 13,
        font: this.myFont,
      });
      this.page.drawRectangle({
        x: 0,
        y: 0,
        height: 25,
        width: width,
        color: rgb(col.r, col.g, col.b),
        opacity: 1,
      });
    },

    getTextLines(text) {
      text = text.replace(/\n/g, "");
      let lines = [];
      let currentLine = "";
      const maxLength = 70;

      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length > maxLength) {
          const wordParts = [];
          let currentPart = "";
          for (let j = 0; j < word.length; j++) {
            currentPart += word[j];
            if (currentPart.length === maxLength) {
              wordParts.push(currentPart);
              currentPart = "";
            }
          }
          if (currentPart.length > 0) {
            wordParts.push(currentPart);
          }

          for (let k = 0; k < wordParts.length; k++) {
            if (currentLine.length + wordParts[k].length > maxLength) {
              lines.push(currentLine.trim());
              currentLine = wordParts[k] + " ";
            } else {
              currentLine += wordParts[k] + " ";
            }
          }
        } else if (currentLine.length + word.length > maxLength) {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine += word + " ";
        }
      }

      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
      }

      return lines;
    },

    hexToRgb(hex) {
      hex = hex.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      return { r, g, b };
    },
  },
};
</script>
