<template>
  <div class="">
    <!-- Member add selection -->
    <div class="flex justify-between items-center">
      <MemberAdd />
      <CreateGroup />
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
    >
      <!-- Member list selection -->
      <MemberList />
      <!-- <MorningList /> -->

      <div>
        <!-- Typing friends selection -->
        <div v-for="(group, idx) in getCategories" :key="idx">
          <DefaultGroup
            :group="group"
            :idx="idx"
            :getCategories="getCategories"
          />
        </div>
        <!-- <div v-for="(group, idx) in getCategories" :key="idx">
          <MorningFriends
            :group="group"
            :idx="idx"
            :getCategories="getCategories"
          />
        </div> -->
      </div>
    </div>

    <div
      class="flex flex-col justify-center items-center p-2 m-2 rounded-lg bg-[#E2808A]"
    >
      <span
        class="material-symbols-outlined hover:cursor-pointer hover:text-red-700 font-bold"
        @click="help = !help"
      >
        help
      </span>

      <div class="flex flex-col" v-if="help">
        <span> 1) List members individually. </span>
        <span>
          2) If you want to empty the member list, use the empty list button.
        </span>
        <span>
          3)After clicking listing in the member list, you should use the list
          button to show the member in the category.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import MemberList from "@/components/MemberList.vue";
import MorningFriends from "@/components/MorningFriends.vue";
import AfternoonFriends from "@/components/AfternoonFriends.vue";
import MemberAdd from "@/components/MemberAdd.vue";
import CreateGroup from "@/components/CreateGroup.vue";
import DefaultGroup from "@/components/DefaultGroup.vue";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";

import MorningList from "@/components/MorningList.vue";

const help = ref(false);

const categoryService = new GroupsServices();
const getCategories = reactive<IGroup[]>([]);
const getcategory = async () => {
  const res = await categoryService.getGroup();
  getCategories.push(...res);
};

onMounted(() => {
  getcategory();
});
</script>

<style scoped></style>
