<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { computed, reactive, onMounted } from "vue";

const { Layout } = DefaultTheme;

// https://vitepress.dev/reference/runtime-api#usedata
const {
  site,
  theme,
  page,
  frontmatter,
  params,
  title,
  description,
  lang,
  isDark,
  dir,
  localeIndex,
} = useData();

const pageComputed = computed(() => {
  console.log(site);
  return page;
});

let timer: ReturnType<typeof setTimeout>;

const activeHeader = reactive({
  h2: "",
  h3: "",
});

function handleScroll() {
  const content = document.getElementById("content-wrapper");
  const scrollYHeight = content?.scrollTop;
  if (!scrollYHeight) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    document.querySelectorAll("h2").forEach((item) => {
      const header = item.offsetTop - 190;
      if (scrollYHeight >= header) {
        activeHeader.h2 = item.id;
      }
    });
    // document.querySelectorAll("h3").forEach((item) => {
    //   const headerIII = item.offsetTop - 190;
    //   if (scrollYHeight >= headerIII) {
    //     console.log(true);
    //     activeHeader.h3 = item.id;
    //   }
    // });
  }, 100);
}

onMounted(() => {
  document
    .getElementById("content-wrapper")
    ?.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <!-- <Layout>
    <template #sidebar-nav-before>test</template>
    <template #nav-bar-title-before>
      <div style="position: absolute; top: 0px">test</div>
    </template>
    <template #nav-bar-content-before>test nav content before</template>
    <template #nav-bar-content-after>test nav content after</template>

    <template>test</template>
    <Content />
  </Layout> -->
  <div
    class="layout"
    :style="{
      display: 'flex',
      height: '100%',
      width: '100%',
    }"
  >
    <section class="VpSidebar" id="sidebar">
      <div
        :style="{
          textAlign: 'center',
        }"
      >
        Logic Spark Doc
      </div>
      <hr
        :style="{
          margin: '1.9375rem 0',
        }"
      />
      <div
        :style="{
          textAlign: 'center',
        }"
      >
        API Document
      </div>
      <div>
        {{ pageComputed.value.title }}
      </div>
      <ul
        v-for="(data, idx) in pageComputed.value.headers"
        :key="idx"
        :style="{
          marginLeft: '30px',
        }"
      >
        <li>
          <span :class="{ active: data.slug === activeHeader.h2 }">
            {{ data.slug }}
          </span>
          <ul
            v-for="(subData, index) in data.children"
            :key="index"
            :style="{
              marginLeft: '30px',
            }"
          >
            <li>
              <span :class="{ subActive: subData.slug === activeHeader.h3 }">
                {{ subData.slug }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section
      id="content-wrapper"
      :style="{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'scroll',
        maxHeight: '100dvh',
      }"
    >
      <div class="navbar">
        <div>test</div>
      </div>
      <section class="vp-doc has-sidebar" id="content">
        <div class="content-container">
          <div class="content">
            <Content />
          </div>
        </div>
      </section>
    </section>
    <section id="aside">
      <div class="content-container">test</div>
    </section>
  </div>
</template>
