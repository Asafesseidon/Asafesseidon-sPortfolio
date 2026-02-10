<script lang="ts">
 export let projectPath= "";
 export let projectImgSrc= "";
 export let projectTitle= "";
 export let projectDescription= "";
 export let svgSources= [];

 function svgSorter(name){
  switch (name) {
    case "HTML":
        return "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor";
  case "CSS":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
  case "JS":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
  case "NODE":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
  case "EXPRESS":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg";
  case "SQLite":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg";
  case "C#":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg";
  case "C":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
  case "MD":
        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg";
  
    default:
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg";
  }
  }
 

</script>

<style>
      
    .svgTechnologies{
      width:5vw;
      height:2.5vw;
    }

</style>
<a href={projectPath} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={projectImgSrc} alt="">
  <div class="flex flex-col justify-between p-4 leading-normal">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{projectTitle}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">{projectDescription}</p>
    <div class="flex flex-row">       
      {#each svgSources as svgSrc}
        <img class="svgTechnologies " src={svgSorter(svgSrc)} alt="">      
      {/each}
    </div>
  </div>
</a>