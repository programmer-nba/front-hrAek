<template>
  <div class="carousel" @mouseenter="pauseAutoSlide" @mouseleave="startAutoSlide" aria-roledescription="carousel">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        class="carousel-slide px-2 pb-2"
        v-for="(slide, index) in slides"
        :key="index"
        role="group"
        :aria-roledescription="`slide ${index + 1}`"
      >
        <div class="bg-white h-[5rem] rounded-lg shadow-md flex items-center">
          <div class="w-full">
            <p class="text-center m-0 w-full font-semibold py-1">
              {{ slide.title }}
            </p>
            <p class="text-center m-0 w-full">
              {{ formatDate(slide.startDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Navigation controls -->
    <button class="nav-button prev" @click="prevSlide" aria-label="Previous Slide">‹</button>
    <button class="nav-button next" @click="nextSlide" aria-label="Next Slide">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const { slides } = defineProps(["slides"]);
const currentIndex = ref(0);
let intervalId = null;

const moveToNextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const moveToPrevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
};

const startAutoSlide = () => {
  if (intervalId === null) {
    intervalId = setInterval(moveToNextSlide, 5000);
  }
};

const pauseAutoSlide = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const nextSlide = () => {
  pauseAutoSlide();
  moveToNextSlide();
  startAutoSlide();
};

const prevSlide = () => {
  pauseAutoSlide();
  moveToPrevSlide();
  startAutoSlide();
};

const formatDate = (date) => {
  return `${new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`;
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  pauseAutoSlide();
});

watch(currentIndex, () => {
  // Optional: log current index to verify the slider is changing
  console.log('Current Slide Index:', currentIndex.value);
});
</script>

<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 1;
}

.nav-button.prev {
  left: 0;
}

.nav-button.next {
  right: 0;
}
</style>