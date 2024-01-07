<template>
  <div class="relative overflow-hidden min-h-screen min-w-full">
    <video autoplay loop muted playsinline class="absolute z-10 w-full h-full">
      <source
        src="./assets/videos/sparks_-_25164 (540p).mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <div class="relative z-20">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script></script>

<style>
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
