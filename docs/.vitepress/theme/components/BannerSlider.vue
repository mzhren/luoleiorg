<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  image: string
  title: string
  description: string
  link?: string
  buttonText?: string
}

const props = defineProps<{
  slides?: Slide[]
  autoplay?: boolean
  interval?: number
}>()

const defaultSlides: Slide[] = [
  {
    image: '/images/banner1.jpg',
    title: '专业视频剪辑工具',
    description: '为创作者精选最优质的剪辑软件和插件',
    link: '#',
    buttonText: '立即探索'
  },
  {
    image: '/images/banner2.jpg',
    title: '海量素材资源',
    description: '免版权音乐、视频素材、字体资源一站式获取',
    link: '#',
    buttonText: '查看资源'
  },
  {
    image: '/images/banner3.jpg',
    title: '全流程工具导航',
    description: '从策划到发布，涵盖视频创作每个环节',
    link: '#',
    buttonText: '开始使用'
  }
]

const slides = props.slides || defaultSlides
const currentIndex = ref(0)
const autoplay = props.autoplay !== false
const interval = props.interval || 5000
let timer: ReturnType<typeof setInterval> | null = null

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const startAutoplay = () => {
  if (autoplay && slides.length > 1) {
    timer = setInterval(nextSlide, interval)
  }
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="banner-slider mb-8" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="slider-container">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="slide"
        :class="{ active: index === currentIndex }"
      >
        <div class="slide-image" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        <div class="slide-content">
          <div class="content-wrapper">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
            <a v-if="slide.link" :href="slide.link" class="slide-button">
              {{ slide.buttonText || '了解更多' }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button v-if="slides.length > 1" class="nav-button prev" @click="prevSlide" aria-label="Previous slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button v-if="slides.length > 1" class="nav-button next" @click="nextSlide" aria-label="Next slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- Dots Navigation -->
    <div v-if="slides.length > 1" class="dots-navigation">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.banner-slider {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: #000;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}

.slide-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.slide-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
}

.slide-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1280px; /* max-w-7xl */
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.content-wrapper {
  max-width: 600px;
  color: white;
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-description {
  font-size: 1.25rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.slide-button {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: var(--vp-c-brand-1, #3451b2);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slide-button:hover {
  background: var(--vp-c-brand-2, #3a5ccc);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
}

.nav-button:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-button.prev {
  left: 20px;
}

.nav-button.next {
  right: 20px;
}

.dots-navigation {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.dot.active {
  background: white;
  width: 32px;
  border-radius: 6px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-slider {
    height: 400px;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-description {
    font-size: 1rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .nav-button.prev {
    left: 10px;
  }

  .nav-button.next {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .banner-slider {
    height: 300px;
  }

  .slide-title {
    font-size: 1.5rem;
  }

  .slide-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .slide-button {
    padding: 0.625rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
