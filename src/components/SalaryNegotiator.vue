<template>
  <div class="container">
      <nav aria-role="tablist">
        <ul>
          <li>
            <button class="button-unstyled"
                    aria-role="tab"
                    v-bind:aria-selected="activeTab === 'employer'"
                    v-on:click="enableTab('employer')">
              Employer
            </button>
          </li>
          <li>
            <button class="button-unstyled"
                    aria-role="tab"
                    v-bind:aria-selected="activeTab === 'employee'"
                    v-on:click="enableTab('employee')">
              Employee
            </button>
          </li></ul>
      </nav>
    <main>
      <div v-if="activeTab == 'employer'">
        Employer Tab
        <form v-on:submit="advanceToEmployeeTab">
          <label>
          Salary: <input type="number"
                         min="0"
                         v-model.number="employerValue" />
          </label>
          <input type="submit">
        </form>
      </div>

      <div v-if="activeTab == 'employee'">
        Employee Tab
        <form v-on:submit="compare">
          <label>
            Salary:
            <input type="number"
                   min="0"
                   v-model.number="employeeValue" />
          </label>
          <input type="submit">
        </form>
      </div>

    </main>

  </div>
</template>

<script>
export default {
  name: "SalaryNegotiator",
  data: () => ({
    activeTab: "employer",
    employeeValue: 0,
    employerValue: 0
  }),
  methods: {
    enableTab: function(tabName) {
      this.activeTab = tabName;
    },

    advanceToEmployeeTab(event){
      event.preventDefault();
      this.enableTab('employee')
    },

    showMessage: function(wasSuccessful) {
      const header = wasSuccessful
        ? 'Success! You have reached a consensus. 💸'
        : 'Failure! You have not reached a consensus.';
      const message = `${header}
           The employer was wiling to pay: ${this.employerValue}.
           The employee asked for: ${this.employeeValue}.`;
      window.alert(message);
    },

    compare: function(event) {
      event.preventDefault();
      const wasOfferSuccessful = (this.employeeValue <= this.employerValue);
      this.showMessage(wasOfferSuccessful)
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  border: 1px solid black;
}

nav ul {
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
}

nav ul li {
  flex-grow: 1;
  display: inline-block;
  padding: 1em;
  border-bottom: 1px solid black;
}

nav ul li:first-child {
  border-right: 1px solid black;
}

main {
  padding: 4em;
}

nav button[aria-selected="true"] {
  font-weight: bold;
}

.button-unstyled {
  border: 0;
  background: none;
}
</style>
