<template>
  <div class="myCanvasContainer mb-5 align-self-center" @contextmenu="$emit('contextmenu', $event)" :id="id">
    <div class="position-relative">
      <canvas ref="canvas" class="border" :id="'canvas' + id"></canvas>
      <canvas class="position-absolute top-0 start-0" ref="canvas2" :id="'canvas2' + id"></canvas>
    </div>
    <div class="m-1 bg-light d-flex justify-content-center imgController">
      <button type="button" class="btn btn-primary m-1 btn-sm" @click="handelClick">
        {{ selectedItem }}
      </button>
      <button type="button" class="btn btn-outline-secondary m-1 btn-sm dropdown-toggle dropdown-toggle-split"
        data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu fs-6">
        <li class="dropdown-item" @click="selectItem('Löschen Kreis')">
          <small><i class="bi bi-trash3-fill"></i> Löschen Kreis</small>
        </li>
        <li class="dropdown-item" @click="selectItem('Ändern Kreis Farbe')">
          <small> <i class="bi bi-palette-fill text-warning"></i> Kreis Farbe</small>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li class="dropdown-item" @click="selectItem('Alle Löschen')">
          <i class="bi bi-journal-x text-danger"></i> Alle Löschen
        </li>
      </ul>
      <input type="number" class="btn btn-sm m-1 border" ref="toDeletKreisNumber" min="1"
        @input="selectedKreis = $event.target.value" />
      <input v-if="selectedItem === 'Ändern Kreis Farbe'" type="color" v-model="selectedColor"
        class="btn btn-sm m-1 border" />
    </div>
  </div>
</template>
<script>
import { showToastMessage } from "@/utils/toastUtils";
export default {
  data() {
    return {
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      lineWidth: "12",
      circles: [],
      counter: 1,
      selectedItem: "Löschen Kreis",
      selectedColor: "#688b09",
      selectedKreis: 0,
    };
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object },
  },
  emits: ["contextmenu"],
  watch: {
    circles(newCircles) {
      this.$store.state.componentData.senariosData[this.senario].component[
        this.id
      ].circles = this.circles;
    },
  },
  mounted() {
    this.circles = this.componentProps.circles;
    this.counter = this.componentProps.circles.length + 1;
    this.load();
    this.$refs.canvas2.addEventListener("click", this.handleMouseDown);
    this.$refs.toDeletKreisNumber.focus();
    $("#myPalette").on("change", () => {
      this.selectedColor = $("#myPalette").val();
    });
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      this.selectedItem === "Alle Löschen"
        ? $(this.$refs.toDeletKreisNumber).hide()
        : $(this.$refs.toDeletKreisNumber).show();
    },
    handelClick() {
      const kreisIndex = this.selectedKreis - 1;
      if (this.selectedItem === "Alle Löschen") {
        this.circles = [];
        this.counter = 1;
        this.selectedKreis = 0;
        $(this.$refs.toDeletKreisNumber).val(0);
        this.reDrawCircles();
      } else if (kreisIndex >= 0 && kreisIndex < this.circles.length) {
        if (this.selectedItem === "Löschen Kreis") {
          this.circles.splice(kreisIndex, 1);
        } else if (this.selectedItem === "Ändern Kreis Farbe") {
          this.circles[kreisIndex].color = this.selectedColor;
        }
        this.reDrawCircles();
        this.counter = this.circles.length + 1;
      } else {
        showToastMessage("Kreis nicht vorhanden..!");
      }
    },
    load() {
      const image = new Image();
      image.src = this.$store.state.componentData.senariosData[this.senario].imgSrc;
      const maxWidth = 600;
      const maxHeight = 400;

      image.onload = async () => {
        const aspectRatio = image.width / image.height;
        let newWidth = image.width;
        let newHeight = image.height;

        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }
        const canvas = this.$refs.canvas;
        const canvas2 = this.$refs.canvas2;
        const context = canvas.getContext("2d");
        const context2 = canvas2.getContext("2d");
        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas2.width = newWidth;
        canvas2.height = newHeight;
        context.imageSmoothingEnabled = true;
        context.drawImage(image, 0, 0, newWidth, newHeight);
        context2.fillStyle = "rgba(0, 0, 0, 0)";
        context2.fillRect(0, 0, newWidth, newHeight);

        // Adjust image quality
        const quality = 0.4; // Adjust the quality value as needed

        try {
          const dataURL = await this.canvasToDataURL(canvas, quality);
          const img2 = new Image();
          img2.src = dataURL;
          this.$store.state.componentData.senariosData[this.senario].imgSrc = dataURL;
          img2.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img2, 0, 0, newWidth, newHeight);
            this.reDrawCircles();
          };
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      };
    },
    canvasToDataURL(canvas, quality) {
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          },
          "image/jpeg",
          quality
        );
      });
    },
    handleMouseDown(e) {
      e.stopPropagation();
      this.x = e.offsetX;
      this.y = e.offsetY;
      const context = this.$refs.canvas2.getContext("2d");
      const chekIfTouched = this.doesCircleIntersectOtherCircles({
        x: this.x,
        y: this.y,
        radius: this.lineWidth,
      });
      if (!chekIfTouched) {
        this.drawCircle(context, this.x, this.y, this.selectedColor, this.counter);
        this.circles.push({
          x: this.x,
          y: this.y,
          radius: this.lineWidth,
          color: this.selectedColor,
          number: this.counter,
        });
        this.counter++;
      } else {
        showToastMessage("Kreise Überlappung, Abstand halten!");
      }
    },
    drawCircle(context, x, y, color, number) {
      const pinX = x;
      const pinY = y;
      context.beginPath();
      context.arc(pinX, pinY, this.lineWidth, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();
      context.closePath();
      context.font = "13px Arial";
      context.fontWeight = "bold";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(number.toString(), pinX, pinY);
    },
    doesCircleIntersectOtherCircles(newCircle) {
      const radiusSum = 2 * this.lineWidth;
      for (const circle of this.circles) {
        const dx = Math.abs(newCircle.x - circle.x);
        const dy = Math.abs(newCircle.y - circle.y);
        if (dx < radiusSum && dy < radiusSum) {
          return true;
        }
      }
      return false;
    },
    reDrawCircles() {
      const context = this.$refs.canvas2.getContext("2d");
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      for (let i = 0; i < this.circles.length; i++) {
        const circle = this.circles[i];
        this.drawCircle(context, circle.x, circle.y, circle.color, i + 1);
      }
    },
  },
};
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0px;
  left: 0px;
}

li {
  cursor: default;
}

.myDivider {
  width: 600px;
}
</style>
