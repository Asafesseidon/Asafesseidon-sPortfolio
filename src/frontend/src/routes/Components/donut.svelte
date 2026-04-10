<script lang="ts">
  import * as d3 from "d3";
  export let donutWidth;
  export let donutHeight;
  export let donutMargin;
  export let data ={};

  let radius = Math.min(donutWidth, donutHeight) / 2 - donutMargin;
  const color = d3
    .scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  const pie = d3
    .pie()
    .sort(null) 
    .value((d) => d[1]);
  const data_ready = pie(Object.entries(data));

  const arc = d3
    .arc()
    .innerRadius(radius * 0.5) 
    .outerRadius(radius * 0.8);

  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
</script>

<svg
  {donutWidth}
  {donutHeight}
  viewBox="{-donutWidth / 2}, {-donutHeight / 2}, {donutWidth}, {donutHeight}"
  style:max-width="100%"
  style:height="auto"
>
  <g class="chart-inner">
    {#each data_ready as slice}
      <path d={arc(slice)} fill={color(slice.data[1])} stroke="white" />
    {/each}
  </g>
</svg>