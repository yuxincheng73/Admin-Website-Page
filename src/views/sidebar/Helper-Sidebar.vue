<template>
  <div class="helper-sidebar">
    <li class="nav-item" v-if="!menuItem.children">
      <router-link :to="menuItem.url" class="nav-link" @click="$event.target.classList.toggle('active')">{{ menuItem.name }}</router-link>
    </li>
    <li class="nav-item" v-if="menuItem.children">
      <a
        href="javascript:;"
        class="nav-link"
        data-toggle="collapse"
        :data-target="`#${menuItem.id}`"
        aria-expanded="false"
        @click="$event.target.classList.toggle('active')">
        {{ menuItem.name }}
        <i class="fas fa-chevron-down" style="margin-left: 10px;"></i>
      </a>
      <ul class="list-unstyled collapse" :id="menuItem.id">
        <helper-sidebar v-for="(childItem, index) in menuItem.children" :key="index" :menuItem="childItem" />
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'helper-sidebar',
  props: ['menuItem'],
  data() {
    return {
    };
  },
};
</script>
