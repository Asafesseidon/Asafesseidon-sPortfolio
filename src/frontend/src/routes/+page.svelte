<script lang="ts">

  import Nav from './Components/Nav.svelte';
  import ProjectSv from './Components/project.svelte';
  import CardSv from './Components/cards.svelte';
  import api from '../lib/api.ts';
  import { onMount } from 'svelte';
  
  type Language = {
    name: string;
    type: string;
    bytes: number;
  }

  type Collaborator = {
    name: string;
    link: string;
    avatar: string;
  }

  type Project = {
    id: number;
    project_name: string;
    display_name: string;
    owner: string;
    link: string;
    creation_date: string;
    description: string;
    collaborators: Collaborator[];
    languages: Language[];
  };

  let projects: Project[] = [];
  let loading = true;
  let error = '';
  const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ-"

  onMount(async () => {
    try {
      console.log('Hydration')
      const res = await api.get('/projects');
      console.log('calling')
      projects = res.data.data;
      console.log(projects)
    } catch (e: any) {
      error = e.response?.data?.message || 'Erro ao carregar turmas';

    } finally {
      loading = false;
    }
  });

  function hackerEffect(node: HTMLElement) {
    const originalText = node.innerText;
    let interval: number;

    const startEffect = () => {
        let iterations = 0;
        clearInterval(interval);

        interval = setInterval(() => {
            node.innerText = node.innerText
                .split("")
                .map((_, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 45);
    };

    node.addEventListener("mouseenter", startEffect);

    return {
        destroy() {
            node.removeEventListener("mouseenter", startEffect);
            clearInterval(interval);
        }
    };
  }


</script>

  <style>

    .midnightBlue{
     color: #2D386C;
    }
    .bgMidnightBlue{
      background-color:#2D386C ;
    }
    @media screen and (min-width: 1366px){

      .cardImgs{
        height:30vw;
      }   
    }

  </style>
<svelte:head>
  <title>Asafesseidon's Portfolio</title>
</svelte:head>

{#if loading}
  <div class="justify-center flex-row items-center bg-slate-950 h-screen mx-0 mt-0 pt-7">
	  <div class="mx-20 grid [grid-template-columns:1fr]">
      <div class="[grid-column:1] [grid-row:1] relative group overflow-hidden rounded-3xl mb-7 mx-auto w-fit rounded-4xl duration-500 ease-in-out hover:scale-110">
        
        <img 
          src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/anne-sophie-benoit-JaNtL4uGvG8-unsplash.jpg" 
          alt="Imagem" 
          class="rounded-4xl duration-300 ease-in-out hover:scale-110 object-cover aspect-video w-[70vw] h-[40-vw] block border-4 border-blue-700 "
        />

        <div class="absolute inset-0 pointer-events-none z-10 
                    bg-[linear-gradient(rgba(160,130,255,0)_50%,rgba(0,0,200,0.4)_50%)] 
                    bg-[length:100%_8px] opacity-60 ">
        </div>
      </div>
      
      <div class="[grid-column:1] [grid-row:1] place-self-center pointer-events-none z-20">
        <h1 use:hackerEffect class="text-2xl md:text-7xl text-blue-900 drop-shadow-lg pointer-events-auto">
          LOADING PORTOFOLIO
        </h1>
      </div>
    </div>
  </div>
{:else}
  <div class="justify-center flex-row items-center bg-slate-950 mx-0 mt-0 pt-7">
	  <div class="mx-20 grid [grid-template-columns:1fr]">
      <div class="[grid-column:1] [grid-row:1] relative group overflow-hidden rounded-3xl mb-7 mx-auto w-fit rounded-4xl duration-500 ease-in-out hover:scale-110">
        
        <img 
          src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/anne-sophie-benoit-JaNtL4uGvG8-unsplash.jpg" 
          alt="Imagem" 
          class="rounded-4xl duration-300 ease-in-out hover:scale-110 object-cover aspect-video w-[65vw] h-[35vw] block border-2 border-blue-700 "
        />

        <div class="absolute inset-0 pointer-events-none z-10 
                    bg-[linear-gradient(rgba(160,130,255,0)_50%,rgba(0,0,200,0.4)_50%)] 
                    bg-[length:100%_8px] opacity-60 ">
        </div>
      </div>
      
      <div class="[grid-column:1] [grid-row:1] place-self-center pointer-events-none z-20">
        <h1 use:hackerEffect class="text-2xl md:text-7xl text-blue-900 drop-shadow-lg pointer-events-auto">
          ASAFESSEIDON-SAPPHIRE
        </h1>
      </div>
    </div>

  
	 <div class="flex px-15 relative w-full overflow-visible gap-2 justify-center">
      <CardSv 
      cardImg ="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/s-alb-xYWMPwhQcDM-unsplash.jpg"
      cardRotation="-rotate-6"
      cardZ="z-[2]"
      />

      <CardSv 
      cardImg ="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.08.jpeg"
      cardRotation="-rotate-3"
      cardZ="z-[1]"
      />

      <CardSv 
      cardImg ="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/luca-bravo-WeFDiEDModQ-unsplash.jpg"
      cardRotation=""
      cardZ="z-[2]"
      />

      <CardSv 
      cardImg ="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.09.jpeg"
      cardRotation="rotate-3"
      cardZ="z-[1]"
      />

      <CardSv cardImg ="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/louis-gaudiau-jloWf465qgU-unsplash.jpg"
      cardRotation="rotate-6"
      cardZ="z-[2]"
      />
	 
	 </div>
	 <div class="mx-2">
     <h1 use:hackerEffect class="text-white items-center justify-center text-center text-4xl my-10 p-5 bgMidnightBlue rounded-3xl pointer-events-auto" id="projects" >My Projects</h1>

     <div class="flex flex-row">
        <div class="flex-row items-center justify-center mx-2.5">
          <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm   dark:border-gray-700 dark:bg-gray-900">
            <h2 class="text-white items-center justify-center text-center text-4xl my-3">Projects from Github</h2>

            {#each projects as project}
              <ProjectSv {...project}/>
            {/each}
          </div>
	      </div>
      </div>
	 
  
     <div>
       <h2 class="text-white">Fun Analytics</h2>
     </div>
  
   </div>
</div>
{/if}
  