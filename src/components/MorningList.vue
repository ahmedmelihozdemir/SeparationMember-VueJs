<template>
  <div class="bg-[#004369] rounded-lg text-[#E5DDC8] m-2 p-4">
    <h1 class="flex justify-center items-center font-bold my-4 text-[#DB1F48]">
      Member List
    </h1>
    <div class="flex justify-between items-start m-auto">
      <ul>
        <li
          v-for="(member, idx) in filterMembers"
          :key="idx"
          class="grid grid-cols-4 gap-10 items-center justify-center m-6"
        >
          <div class="flex justify-start items-center">
            {{ member.name }}
          </div>
          <div class="">
            <div
              class="checkbox text-sm font-semibold flex justify-start items-start"
            >
              <div class="ul-checkbox p-1">
                <li
                  class="flex justify-start items-center"
                  v-for="(group, adx) in getCategories"
                  :key="adx"
                >
                  <input
                    type="checkbox"
                    :id="`${group.groupName}`"
                    :value="`${member.name}` + ` ` + `${group.groupName}`"
                    v-model="selectedCategory"
                    class="mr-2"
                  /><label
                    :for="`${group.groupName}` + ` ` + `${member.name}`"
                    >{{ group.groupName }}</label
                  >
                </li>
              </div>
            </div>
          </div>

          <div>
            <button
              class="material-symbols-outlined bg-[#DB1F48] rounded-md hover:bg-[#E5DDC8] text-sm font-bold hover:text-black p-2 ml-6"
              @click="listCategories(member.id)"
            >
              arrow_forward
            </button>
          </div>

          <div>
            <button
              class="material-symbols-outlined bg-[#DB1F48] rounded-md hover:bg-[#E5DDC8] text-sm font-bold hover:text-black p-2 mx-2"
              @click="deleteMember(member.id)"
            >
              delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { IMember } from "@/models/Member.interface";
import { IGroup } from "@/models/Group.interface";
import { UsersService } from "@/services/User.service";
import { GroupsServices } from "@/services/Group.service";
import axios from "axios";

const store = useStore();

//Members service
const membersInfoService = new UsersService();
const members = reactive<IMember[]>([]);
const getMembers = async () => {
  const res = await membersInfoService.getUser();
  members.push(...res);
  filterMembers.value = members;
};

//Group service
const categoryService = new GroupsServices();
const getCategories = reactive<IGroup[]>([]);
const getCategory = async () => {
  const res = await categoryService.getGroup();
  getCategories.push(...res);
};


const selectedCategory = ref([]);
const selectedMember = ref([]);
const listCategories = (w) => {
  store.state.categories = selectedCategory;
  selectedCategory.value.map((item) => {
    if (selectedMember.value.includes(item.split(" ")[0])) {
      return;
    } else {
      selectedMember.value.push(item.split(" ")[0]);
    }
  });

  const res = axios
    .put(`http://localhost:3000/members/${w}`, {
      name: selectedMember.value[0],
      category: selectedCategory.value.map((item) => {
        return item.split(" ")[1];
      }),
    })
    .then(() => {
      window.location.reload();
    });
};

/* const deleteMember = (i) => {
  const res = axios.delete(`http://localhost:3000/members/${i}`).then(() => {
    members.splice(i, 1);
    filterMembers.value = filterMembers.value.filter((item) => item.id !== i);
    console.log(filterMembers.value);
  });
}; */

const filterMembers = ref(members);
const deleteMember = (idx: number) => {
  membersInfoService.deleteUser(idx).then(() => {
    members.splice(idx, 1);
    filterMembers.value = filterMembers.value.filter((item) => item.id !== idx);
  });
};

onMounted(() => {
  getMembers();
  getCategory();
});
</script>

<style scoped lang="scss"></style>
