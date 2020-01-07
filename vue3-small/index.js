import { mount, h, reactive, onMount, onUpdate } from "./lib";

const App = {
  render() {
    return h(
      "button",
      {
        onclick: this.increment
      },
      `Count is: ${this.state.count}`
    );
  },
  setup() {
    const state = reactive({
      count: 0
    });

    function increment() {
      state.count++;
      state.count++;
    }

    onMount(() => {
      console.log("onMount");
    });

    onUpdate(() => {
      console.log("onUpdate");
    });

    return {
      state,
      increment
    };
  }
};

mount(App, "#app");
