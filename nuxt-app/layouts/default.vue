<template>
  <div class="page-container">
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style>
.page-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
}
</style>
