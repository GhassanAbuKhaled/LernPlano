<template>
    <div class="accordion" id="accordionPanelsStayOpen">
        <div class="accordion-item" v-for="key in Object.keys(interaktionenItems)" :key="key">
            <h2 class="accordion-header">
                <button class="accordion-button font-monospace" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#panelsStayOpen-collapseOne' + key" aria-expanded="true"
                    :aria-controls="'panelsStayOpen-collapseOne' + key" style="background-color: #fff; color: #000">
                    {{ key }}
                </button>
            </h2>
            <div :id="'panelsStayOpen-collapseOne' + key" class="accordion-collapse collapse hide">
                <div class="accordion-body">
                    <div v-for="(isChecked, item) in interaktionenItems[key]" :key="item">
                        <li v-if="isChecked"
                            class="border-bottom font-monospace list-group-item-light list-group-item-action draggable-item fs-6 text-break"
                            style="cursor: all-scroll">
                            {{ item }}
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            interaktionenItems: this.$store.state.Interaktionen.content,
        };
    },
    updated() {
        this.makeIconsDraggable();
    },
    mounted() {
        this.makeIconsDraggable();
    },
    methods: {
        makeIconsDraggable() {
            const updatedElements = this.$el.querySelectorAll("li");
            $(updatedElements).draggable({
                appendTo: "body",
                iframeFix: true,
                helper: function () {
                    var clone = $(this).clone();
                    clone.addClass("item");
                    return clone;
                },
            });
        },
    },
};
</script>
<style scoped>
.item {
    width: fit-content;
    background-color: aliceblue;
    z-index: 100040;
}
</style>
