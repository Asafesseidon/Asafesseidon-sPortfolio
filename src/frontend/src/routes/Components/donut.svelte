<script lang="ts">
  export let donutWidth;
  export let donutHeight;
  export let donutMargin;

  export let data;

  import { Popover, Button  } from "flowbite-svelte";
  import * as d3 from "d3";

  $: console.log(`donut data ${data}`)
  $: radius = Math.min(donutWidth, donutHeight) / 2 - donutMargin;

  $: color = d3
    .scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  $: pieGenerator = d3
  .pie()
  .sort(null)
  .value(d => Number(d.collab));

$: data_ready = data && data.length
  ? pieGenerator(data)
  : [];
  $: console.log("data_ready:", data_ready);

  $: arc = d3
    .arc()
    .innerRadius(radius * 0.5) 
    .outerRadius(radius * 0.8);

  $: outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
</script>
{#if donutWidth && donutHeight}
  <svg
    width={donutWidth}
    height={donutHeight}
    viewBox={`${-donutWidth / 2} ${-donutHeight / 2} ${donutWidth} ${donutHeight}`}  style:max-width="100%"
    style:height="auto"
  >
    <g class="chart-inner">
      {#each data_ready as slice}
        <g class="hover:scale-105  hover:brightness-80 transition-transform duration-600">
          <path d={arc(slice)} fill={color(slice.data.name)} stroke="white" />

          <text transform={`translate(${arc.centroid(slice)})`} text-anchor="middle" alignment-baseline="middle" font-size="12" fill="white" > 
          
            {slice.data.name} {slice.data.collab}
          </text>
        </g>
      {/each}
    </g>
  </svg>
{/if}