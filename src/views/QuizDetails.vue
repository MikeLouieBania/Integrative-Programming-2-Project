<template>
  <div v-if="user.loggedIn">
    <div v-if="currentHisto">
      <v-form class="m-3">
        <div v-show="admin">
          <v-text-field
            label="Owner (User ID)"
            readonly
            v-model="currentHisto.userID"
          ></v-text-field>
        </div>

        <v-text-field
          label="Average Score"
          :readonly="!admin"
          v-model="currentHisto.averageScore"
        >
        </v-text-field>
        <v-text-field
          label="Date & Time: Taken"
          readonly
          v-model="currentHisto.timeTaken"
        >
        </v-text-field>
        <v-text-field
          label="Date & Time: Finished"
          readonly
          v-model="currentHisto.timeFinished"
        >
        </v-text-field>
      </v-form>
      <div v-show="admin">
        <v-card-text class="d-flex justify-center w-100 mb-3" justify-center>{{
          message
        }}</v-card-text>
        <div class="d-flex justify-space-around w-100 mb-3">
          <v-btn type="submit" color="success" @click="updateHistory">Update</v-btn>
          <v-btn type="submit" color="error" @click="deleteHistory">Delete</v-btn>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <v-card class="mx-auto mt-6 bg-info" max-width="25%" variant="outlined">
      <v-card-item color="white">
        <div>
          <div class="text-overline mb-1">YOU ARE NOT LOGGED IN!</div>
          <div class="text-caption mb-3">
            Please Login if You Already have an Account, or Create a New Account
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from "../firebase";
export default {
  props: ["history"],
  data() {
    return {
      admin: false,
      currentHisto: null,
      message: "",
    };
  },
  watch: {
    history: function (history) {
      this.currentHisto = { ...history };
      this.message = "";
    },
  },
  methods: {
    updateHistory() {
      const data = {
        averageScore: this.currentHisto.averageScore,
        timeTaken: this.currentHisto.timeTaken,
        timeFinished: this.currentHisto.timeFinished,
      };
      if (this.admin) {
        DataService.update(this.currentHisto.userID, this.currentHisto.key, data)
          .then(() => {
            this.message = "The Record Was Updated Successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        DataService.update("0", this.currentHisto.key, data)
          .then(() => {
            this.message = "The Record Was Updated Successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteHistory() {
      DataService.delete(this.currentHisto.userID, this.currentHisto.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.admin = DataService.isAdmin();
    this.message = "";
    this.currentHisto = { ...this.history };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
    const user = computed(() => {
      return store.getters.user;
    });
    const signOut = async () => {
      await store.dispatch("logOut");
      router.push("/");
    };
    return { user, signOut };
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
