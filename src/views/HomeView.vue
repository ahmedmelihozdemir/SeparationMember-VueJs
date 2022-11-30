<template>
  <div class="">
    <!-- Member add selection -->
    <div class="flex justify-between items-center">
      <MemberAdd />
      <CreateGroup />
    </div>
    <div class="grid grid-cols-2">
      <!-- Member list selection -->
      <MemberList @selectedMember="listMember" />
      <div>
        <!-- Typing friends selection -->
        <!-- <div v-for="group in store.state.countGroup" :key="group.id">
          <DefaultGroup :cameGroupName="cameGroupName" />
        </div> -->

        <div v-for="(group, idx) in getCategories" :key="idx">
          <MorningFriends
            :group="group"
            :idx="idx"
            :getCategories="getCategories"
            :cameSelectedMember="cameSelectedMember"
          />
        </div>
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
import { useStore } from "vuex";
import MemberList from "@/components/MemberList.vue";
import MorningFriends from "@/components/MorningFriends.vue";
import AfternoonFriends from "@/components/AfternoonFriends.vue";
import MemberAdd from "@/components/MemberAdd.vue";
import CreateGroup from "@/components/CreateGroup.vue";
import DefaultGroup from "@/components/DefaultGroup.vue";
import { IGroup } from "@/models/Group.interface";
import { GroupsServices } from "@/services/Group.service";

const store = useStore();

const help = ref(false);

const categoryService = new GroupsServices();
const getCategories = reactive<IGroup[]>([]);
const getcategory = async () => {
  const res = await categoryService.getGroup();
  getCategories.push(...res);
};

const cameGroupName = ref("");
const emitGroupName = (e: string) => {
  cameGroupName.value = e;
};

const cameSelectedMember = ref("");
const listMember = (e: string) => {
  cameSelectedMember.value = e;
};

onMounted(() => {
  getcategory();
});
</script>

<style scoped></style>
