<script lang="ts">
  import * as d3 from "d3";

  // Propriedades de dimensões e margem
  export let donutWidth: number;
  export let donutHeight: number;
  export let donutMargin: number;

  // Dados genéricos e mapeamento de chaves
  export let data: any[] = [];
  export let valueKey: string = "collab"; // Chave padrão para valores
  export let labelKey: string = "name";   // Chave padrão para nomes

  // Função para gerar cores consistentes com base na string
  function stringToColor(str: string) {
    if (!str) return "#ccc";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += value.toString(16).padStart(2, '0');
    }
    return color;
  }

  // 1. Calcula o total geral de forma reativa usando o valueKey
  $: totalValue = data && data.length 
    ? data.reduce((acc, item) => acc + (Number(item[valueKey]) || 0), 0) 
    : 0;

  // 2. Calcula o raio e as escalas do d3
  $: radius = Math.min(donutWidth, donutHeight) / 2 - donutMargin;

  $: color = d3
    .scaleOrdinal()
    .domain(data ? data.map(d => String(d[labelKey])) : [])
    .range(d3.schemeDark2);

  // 3. Configura o gerador do gráfico de pizza baseado na valueKey
  $: pieGenerator = d3
    .pie<any>()
    .sort(null)
    .value(d => Number(d[valueKey]) || 0);

  $: data_ready = data && data.length ? pieGenerator(data) : [];

  // 4. Configura os arcos interno e externo para os textos
  $: arc = d3
    .arc<any>()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  $: outerArc = d3
    .arc<any>()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // 5. Função interna de formatação de porcentagem (1 casa decimal)
  const formatPercent = (val: number, total: number): string => {
    if (!total || isNaN(val)) return "0.0%";
    return `${((val / total) * 100).toFixed(1)}%`;
  };
</script>

{#if donutWidth && donutHeight}
  <svg 
    width={donutWidth} 
    height={donutHeight} 
    viewBox={`${-donutWidth / 2} ${-donutHeight / 2} ${donutWidth} ${donutHeight}`} 
    style:max-width="100%" 
    style:height="auto"
  >
    <g class="chart-inner">
      {#each data_ready as slice}
        <g class="hover:scale-105 hover:brightness-80 transition-transform duration-600">
          <!-- Fatia do Donut -->
          <path 
            d={arc(slice)} 
            fill={stringToColor(String(slice.data[labelKey]))} 
            stroke="white" 
          />
          
          <!-- Porcentagem centralizada na fatia -->
          <text 
            transform={`translate(${arc.centroid(slice)})`} 
            text-anchor="middle" 
            alignment-baseline="middle" 
            font-size="12" 
            fill="white"
          >
            {formatPercent(Number(slice.data[valueKey]), totalValue)}
          </text>

          <!-- Rótulo (Label) na borda externa -->
          <text 
            transform={`translate(${outerArc.centroid(slice)})`} 
            text-anchor="middle" 
            alignment-baseline="middle" 
            font-size="12" 
            fill="white"
          >
            {slice.data[labelKey]}
          </text>
        </g>
      {/each}
    </g>
  </svg>
{/if}
