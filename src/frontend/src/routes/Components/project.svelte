<script lang="ts">
      

      export let link= "";
      export let project_name= "";
      export let display_name= "";
      export let owner= "";
      export let creation_date = "";
      export let description= "";
      export let languages= [];
      export let collaborators = [];
      import { Popover, Button  } from "flowbite-svelte";

       $: totalBytes = languages.reduce((acc, lang) => acc + lang.bytes, 0);

      function stringToColor(str) {
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

      function svgSorter(name){
            switch (name) {
                  case "HTML":
                        return "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor";
                  case "CSS":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
                  case "JavaScript":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
                  case "TypeScript":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
                  case "Svelte":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg";
                  case "NODE":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
                  case "EXPRESS":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg";
                  case "Python":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg";
                  case "Jupyter Notebook":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg";
                  case "SQLite":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg";
                  case "PLpgSQL":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg";
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
      <a href={link} class="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="flex flex-col justify-between p-2 leading-normal">
                  <h5 class="mb-2 text-2xl items-center justify-center font-bold tracking-tight text-gray-900 dark:text-white">{display_name ? display_name : project_name}</h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">{description}</p>
                   <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">Created at {creation_date}</p>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">By {owner}</p>

                  <div class="flex w-full h-3 overflow-hidden rounded-full bg-gray-200">
                        {#each languages as lang}
                              {@const percentage = (lang.bytes / totalBytes) * 100}   

                              <div class="h-full transition-all duration-500 ease-in-out" style="width: {percentage}%; background-color: {stringToColor(lang.name)};" title="{lang.name}: {percentage.toFixed(1)}%"></div>
                        {/each}
                  </div>
                  <div class="flex flex-row py-2.5">


                        <h3 class="font-medium text-heading text-gray-300">Languages</h3>

                        {#each languages as language}
                              <img class="h-12  w-12 mx-2.5 hover:scale-115 hover:brightness-130 transition-all duration-400" src={svgSorter(language.name)} alt="">      
                        {/each}
                  </div>

                  <div class="flex flex-row py-2.5">
                        <h3 class="font-medium text-heading text-gray-300">Collaborators</h3>
                        {#each collaborators as collaborator}
                                
                              <Button class="bg-brand border border-transparent  hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5">
                                    <img class="w-10 h-10 rounded-full hover:scale-130 border hover:border-sky-700 duration-300 hover:brightness-150" src={collaborator.avatar} alt={collaborator.name} loading="lazy"/>
                              </Button>
                              <Popover title={collaborator.name}>
                                    <!-- Popover content -->
                                    <div class="px-3 py-2">
                                          <a href={collaborator.link} target="_blank" rel="noopener noreferrer" class="text-white-300 hover:underline">Link of the Github Profile of {collaborator.name}</a>
                                    </div>
                              </Popover>
                        {/each}
                  </div>
            </div>
      </a>