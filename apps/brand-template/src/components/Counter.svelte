<script>
let count = 0;
const increment = () => count++;
</script>

<button on:click={increment} class="px-4 py-2 bg-blue-600 text-white rounded-lg">
  Contador: {count}
</button>