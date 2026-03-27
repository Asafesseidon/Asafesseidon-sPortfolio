<script lang="ts">
      import { Popover } from 'flowbite-svelte';

      export let link= "";
      export let project_name= "";
      export let display_name= "";
      export let owner= "";
      export let creation_date = "";
      export let description= "";
      export let languages= [];
      export let collaborators = [];

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
                  case "SQLite":
                        return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg";
                  case "PostgreSQL":
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

<style>
      
    .svgTechnologies{
      width:5vw;
      height:2.5vw;
    }

</style>
      <a href={link} class="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl items-center justify-center font-bold tracking-tight text-gray-900 dark:text-white">{project_name}</h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">{description}</p>
                   <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">Created at {creation_date}</p>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">By {owner}</p>
                  <div class="flex flex-row">

                        <h3 class="font-medium text-heading">Languages</h3>       
                        {#each languages as language}
                        <img class="svgTechnologies " src={svgSorter(language.name)} alt="">      
                        {/each}
                  </div>
                  <div class="flex flex-row">
                        <h3 class="font-medium text-heading">Collaborators</h3>
                        {#each collaborators as collaborator}
                                <Popover>
                                    <!-- Trigger (your button with avatar) -->
                                    <button
                                    slot="trigger"
                                    type="button"
                                    class="bg-brand border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
                                    >
                                    <img
                                          class="w-8 h-8 rounded-full hover:scale-110 border hover:border-sky-700 duration-300"
                                          src={collaborator.avatar}
                                          alt={collaborator.name}
                                          loading="lazy"
                                    />
                                    </button>

                                    <!-- Popover content -->
                                    <div class="w-64 text-sm text-body bg-neutral-primary-soft border border-default rounded-base shadow-xs">
                                    <div class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base">
                                          <h3 class="font-medium text-heading">
                                          {collaborator.name}
                                          </h3>
                                    </div>

                                    <div class="px-3 py-2">
                                          <a
                                          href={collaborator.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          class="text-blue-500 hover:underline"
                                          >
                                          Github Profile of {collaborator.name}
                                          </a>
                                    </div>
                                    </div>
                              </Popover>
                        {/each}
                  </div>
            </div>
      </a>