<script>
	import * as d3 from "d3";
	
	export let data;

	const formatLabel = d3.format(',.0f');

	const margin = {
    top: 30,
    right: 100,
    bottom: 0,
    left: 110,
  };

	let width = 400;
  let height = 320;

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

	$: xScale = d3
    .scaleLinear()
    .domain(data.map(d => d.name))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([innerHeight, 0])
    .padding(0.25);

   
$: data_ready = data && data.length ? xScale(data) : [];

</script>

<div  bind:clientWidth={width}>
  <svg {width} {height}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {#each data_ready as col}
        <text
          text-anchor="end"
          x={-10}
          y={yScale(col.name) + yScale.bandwidth() / 2}
          dy=".35em"
        >
          {col.name}
        </text>
        <rect
          x={0}
					y={yScale(col.name)}
					width={xScale(col.collab)}
          height={yScale.bandwidth()}
        />
        <text
          text-anchor="start"
          x={xScale(col.threePointers)}
          dx="10"
          y={yScale(col.name) + yScale.bandwidth() / 2}
          dy=".35em"
        >
          {formatLabel(col.collab)}
        </text>
      {/each}
    </g>
  </svg>
</div>
