import { w as attr, x as ensure_array_like, y as bind_props, z as spread_props } from "../../chunks/index.js";
import { m as fallback, l as escape_html } from "../../chunks/context.js";
function Project($$renderer, $$props) {
  let projectPath = fallback($$props["projectPath"], "");
  let projectImgSrc = fallback($$props["projectImgSrc"], "");
  let projectTitle = fallback($$props["projectTitle"], "");
  let projectDescription = fallback($$props["projectDescription"], "");
  let svgSources = fallback($$props["svgSources"], () => [], true);
  function svgSorter(name) {
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
  $$renderer.push(`<a${attr("href", projectPath)} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"><img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"${attr("src", projectImgSrc)} alt=""/> <div class="flex flex-col justify-between p-4 leading-normal"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${escape_html(projectTitle)}</h5> <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">${escape_html(projectDescription)}</p> <div class="flex flex-row"><!--[-->`);
  const each_array = ensure_array_like(svgSources);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let svgSrc = each_array[$$index];
    $$renderer.push(`<img class="svgTechnologies svelte-1y8279o"${attr("src", svgSorter(svgSrc))} alt=""/>`);
  }
  $$renderer.push(`<!--]--></div></div></a>`);
  bind_props($$props, {
    projectPath,
    projectImgSrc,
    projectTitle,
    projectDescription,
    svgSources
  });
}
function _page($$renderer) {
  var frontEndprojects = [
    {
      projectPath: "https://asafesseidon.github.io/DoctorCare/",
      projectImgSrc: "https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/Captura%20de%20Tela%20(183).png",
      projectTitle: "DoctorCare",
      projectDescription: "A site made in the programming event NLW Return, it's a site made to ease people access to proper health care.",
      svgSources: ["HTML", "CSS", "JS"]
    },
    {
      projectPath: "https://asafesseidon.github.io/MKJ-Enterprises/",
      projectImgSrc: "https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/Captura%20de%20Tela%20(184).png",
      projectTitle: "MKJ Enterprises",
      projectDescription: "A collaborative site i made with two other people, João Gabriel Pereira Lopes and Erick de Castro, about an Enterprise that has two subsidiaries one which works with a luthier work and other which works with cealing lowering",
      svgSources: ["HTML", "CSS", "JS"]
    },
    {
      projectPath: "#",
      projectImgSrc: "https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/Captura%20de%20Tela%20(185).png",
      projectTitle: "Hash Game",
      projectDescription: "A simple hash game made with HTML, CSS and Javascript.",
      svgSources: ["HTML", "CSS", "JS"]
    },
    {
      projectPath: "https://github.com/Asafesseidon/BinarySteam",
      projectImgSrc: "#",
      projectTitle: "BinarySteam",
      projectDescription: "A simple site about selling games, that i helped create alongside João Gabriel Pereira Lopes",
      svgSources: ["HTML", "CSS", "JS", "NODE", "SQLite"]
    },
    {
      projectPath: "https://github.com/JoaoGabrielPereiraLopes/Wefood",
      projectImgSrc: "#",
      projectTitle: "WeFood",
      projectDescription: "A dynamic site detailing the menu of a restaurant, that i helped with the creation alongside João Gabriel Pereira Lopes.",
      svgSources: ["HTML", "CSS", "JS", "NODE", "SQLite"]
    }
  ];
  var backEndprojects = [
    {
      projectPath: "https://github.com/Asafesseidon/RocketseatAuctionAPI",
      projectTitle: "RocketseatAuctionAPI",
      projectDescription: "A C# API that realizes and organizes auctions with automated bidding based on the maximum value the participants want to bid, it was made with an SQLite database.",
      svgSources: ["C#", "SQLite"]
    },
    {
      projectPath: "https://github.com/Asafesseidon/PassInAPI",
      projectTitle: "PassInAPI",
      projectDescription: "A C# API that organizes events, made using the SQLite database.",
      svgSources: ["C#", "SQLite"]
    }
  ];
  $$renderer.push(`<div class="justify-center flex-row items-center bg-slate-950 mx-0 mt-0 pt-7"><div class="mx-20 grid [grid-template-columns:1fr]"><div class="[grid-column:1] [grid-row:1] relative"><img src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/anne-sophie-benoit-JaNtL4uGvG8-unsplash.jpg" alt="Imagem" class="rounded-4xl bannerImg duration-300 ease-in-out hover:scale-110 mb-7 object-cover place-self-center mx-10 bg-[repeating-linear-gradient(to_bottom,rgba(rgba(45, 56, 108, 0.7))_0_10px,rgba(rgba(45, 56, 108, 0.3))_10px_20px)] svelte-1uha8ag"/></div> <div class="[grid-column:1] [grid-row:1] place-self-center text-2xl text-sky-700 md:bottom-[35rem] md:left-[40%] left-24 overflow-hidden text-7xl z-21"><h1>ASAFESSEIDON-SAPPHIRE</h1></div></div> <div class="flex mx-6"><img class="rounded-2xl cardImgs object-cover -rotate-6 duration-300 ease-in-out z-2 hover:scale-120 hover:rotate-0 my-6 hover:z-3 svelte-1uha8ag" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/s-alb-xYWMPwhQcDM-unsplash.jpg" alt=""/> <img class="rounded-2xl cardImgs object-cover -rotate-3 duration-300 ease-in-out z-1 hover:scale-120 hover:rotate-0 my-6 hover:z-3 svelte-1uha8ag" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.08.jpeg" alt=""/> <img class="rounded-2xl cardImgs object-cover duration-300 ease-in-out z-2 hover:scale-120 rotate-0 hover:rotate-0 my-6 hover:z-3 svelte-1uha8ag" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/luca-bravo-WeFDiEDModQ-unsplash.jpg" alt=""/> <img class="rounded-2xl cardImgs object-cover rotate-3 duration-300 ease-in-out z-1 hover:scale-120 hover:rotate-0 my-6 hover:z-3 svelte-1uha8ag" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/WhatsApp%20Image%202024-05-13%20at%2023.39.09.jpeg" alt=""/> <img class="rounded-2xl cardImgs object-cover rotate-6 duration-300 ease-in-out z-2 hover:scale-120 hover:rotate-0 my-6 hover:z-3 svelte-1uha8ag" src="https://asafesseidon.github.io/Asafesseidon-s_Website/Files/Images/louis-gaudiau-jloWf465qgU-unsplash.jpg" alt=""/></div> <div class="mx-2"><h1 class="text-white items-center justify-center text-center text-4xl my-10 p-5 bgMidnightBlue rounded-3xl svelte-1uha8ag" id="projects">My Projects</h1> <div class="flex flex-row"><div class="flex-row items-center justify-center mx-2.5"><div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900"><h2 class="text-white items-center justify-center text-center text-4xl my-3">FrontEnd</h2> <!--[-->`);
  const each_array = ensure_array_like(frontEndprojects);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let fEproject = each_array[$$index];
    Project($$renderer, spread_props([fEproject]));
  }
  $$renderer.push(`<!--]--></div></div> <div class="flex-row items-center justify-center mx-2.5"><div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900"><h2 class="text-white items-center justify-center text-center text-4xl my-3">BackEnd</h2> <!--[-->`);
  const each_array_1 = ensure_array_like(backEndprojects);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let bEproject = each_array_1[$$index_1];
    Project($$renderer, spread_props([bEproject]));
  }
  $$renderer.push(`<!--]--></div></div></div></div> <div><h2 class="text-white">Random Projects</h2></div></div>`);
}
export {
  _page as default
};
