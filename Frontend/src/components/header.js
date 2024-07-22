import '@helpers/logos'

document.querySelector('#header').innerHTML = `
  <div class='w-screen bg-root-header h-12 text-white flex py-1 px-4'>
    <div class='smartBankSVG'></div>
  </div>
  <section>
    <input id="cerrar-modal" type="radio" name="modal" class="hidden"/>
    <label for="cerrar-modal" class="hidden absolute bg-rose-500 w-6 h-6 rounded-full transition-all duration-500 z-30 text-white font-bold cursor-pointer text-center top-4 right-4">X</label>
    <div id="modal" class='bg-black/75 text-white fixed top-[-100vh] left-0 h-screen w-screen z-20 transition-all duration-500 flex items-center justify-center'>
      <div class="bg-root-popup w-3/5 h-96 max-w-screen-sm rounded-3xl flex items-center border border-b-slate-400 p-5">
        <p id="modalmsg" class="w-full text-3xl font-semibold text-center"></p>
      </div>
    </div>
  </section>
`

document.querySelector('[for="cerrar-modal"]').addEventListener('click', () => {
  document.querySelector('#modal').style.top = '-100vh'
  document.querySelector('[for="cerrar-modal"]').classList.add('hidden')
})