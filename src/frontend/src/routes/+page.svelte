<script lang="ts">

  import Nav from './Components/Nav.svelte';
  import ProjectSv from './Components/project.svelte';
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

  function textHack(){

 };

</script>

  <style>

    .bannerImg{
      width:70vw;
      height:40vw;
    }
    .cardImgs{
      width:18.7vw;
      height:40vw;
    }
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
  <div class="justify-center flex-row items-center bg-slate-950 mx-0 mt-0 pt-7">
	  <div class="mx-20 grid [grid-template-columns:1fr]">
      <div class="[grid-column:1] [grid-row:1] relative">
       
          <img src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/anne-sophie-benoit-JaNtL4uGvG8-unsplash.jpg" alt="Imagem" class="rounded-4xl bannerImg  duration-300 ease-in-out hover:scale-110 mb-7 object-cover place-self-center mx-10"/>
      </div>
      
      <div class=" [grid-column:1] [grid-row:1] place-self-center text-2xl text-sky-700 md:bottom-[35rem] md:left-[40%]  left-24 overflow-hidden  text-7xl z-21">
        <h1 >ASAFESSEIDON-SAPPHIRE</h1>
      </div>
    </div>
	 
  
	 <div class="flex mx-6">
	 
	   
	  <img class="rounded-2xl cardImgs object-cover -rotate-6 duration-300 ease-in-out z-2 hover:scale-120 hover:rotate-0 my-6 hover:z-3" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/s-alb-xYWMPwhQcDM-unsplash.jpg" alt="" />
			
  
	  <img class="rounded-2xl cardImgs object-cover -rotate-3 duration-300 ease-in-out z-1 hover:scale-120 hover:rotate-0 my-6 hover:z-3" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.08.jpeg" alt="" />
			   
  
	  <img class="rounded-2xl cardImgs object-cover duration-300 ease-in-out z-2 hover:scale-120 rotate-0 hover:rotate-0 my-6 hover:z-3" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/luca-bravo-WeFDiEDModQ-unsplash.jpg" alt="" />
			 
  
	  <img class="rounded-2xl cardImgs object-cover rotate-3 duration-300 ease-in-out z-1 hover:scale-120 hover:rotate-0 my-6 hover:z-3" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.09.jpeg" alt="" />
			   
  
	  <img class="rounded-2xl cardImgs object-cover rotate-6 duration-300 ease-in-out z-2 hover:scale-120 hover:rotate-0 my-6 hover:z-3" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/louis-gaudiau-jloWf465qgU-unsplash.jpg" alt="" />
			  
	 </div>
	 <div class="mx-2">
     <h1 class="text-white items-center justify-center text-center text-4xl my-10 p-5 bgMidnightBlue rounded-3xl " id="projects">My Projects</h1>

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