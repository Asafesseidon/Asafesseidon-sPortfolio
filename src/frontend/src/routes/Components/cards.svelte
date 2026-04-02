<script lang="ts">

  export let cardImg =" ";
  export let cardRotation=" ";
  export let cardZ=" ";
</script>


<div class="rounded-2xl flex-1 {cardRotation} aspect-[2/3] relative overflow-hidden duration-300 ease-in-out {cardZ} hover:scale-120 hover:rotate-0 my-6 hover:z-3 ">
      <img class="rounded-2xl object-cover w-full h-full  " src={cardImg} alt="" />
			
      <div class="absolute inset-0 pointer-events-none z-10 rounded-2xl bg-[linear-gradient(rgba(160,130,255,0)_50%,rgba(0,0,200,0.4)_50%)] bg-[length:100%_8px] opacity-60 "></div>
</div>