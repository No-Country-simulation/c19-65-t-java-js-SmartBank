import { checkLogin } from '@auth/Auth'
import { decryptString } from '@helpers/crypt'
import { logOut } from "@services/userService"
import '@helpers/logos'

checkLogin()

// Datos a obtiener del backend o localstorage
// const userInfo = {
//   userName: 'Anomimo',
//   imgUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
// }

const menuOptions = {
  CLIENTE: [
    {label: 'Dashboard', url: '/dashboard/'},
    {label: 'Crear cuenta', url: '/crearCuenta/'},
    {label: 'Movimientos', url: '/movimientos/'},
    {label: 'Transferir', url: '/transferir/'}
  ],
  ADMIN: []
};

//
(async () => {
  try {
    
    const userRole = await decryptString(sessionStorage.getItem('TU'))
    if (!userRole) throw new Error('Error de autenticación')
    
    let renderMenu = ''
    menuOptions[userRole].forEach(({label, url}) => {
      if(window.location.pathname !== url) {
        renderMenu += `<a href="${url}" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" aria-current="page">${label}</a>`
      }
    })
    
    document.querySelector('#navBar').innerHTML = `
      <div class="relative mx-auto w-screen px-2 sm:px-6 lg:px-8 bg-root-navBar">
        <div class="h-16 flex justify-between">
          <!-- Icono Menu desplegable -->
          <div class="flex items-center">
            <!-- Menu button-->
            <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" data-status="false" id='menu' aria-controls="menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Abrir menu</span>
              <!-- Icon when menu is closed. 🍔 -->
              <svg class="block h-6 w-6" id='menu-open' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!-- Icon when menu is open. ❌ -->
              <svg class="hidden h-6 w-6" id='menu-close' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Notificaciones y User Icon -->
          <div class="flex items-center pr-2 ">
            <!-- 🔔 -->
            <!-- <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> -->
      
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <div class='perfil-activo'></div>
                </button>
              </div>
      
              <div class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-root-navBar py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" id="user-menu" data-status="false" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a> -->
                <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" tabindex="-1" id="user-menu-item-1">Settings</a> -->
                <a href="/" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem" tabindex="-1" id="user-menu-sign-out">Sign out</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Dropdown menu, show/hide based on menu state. -->
        <div class="absolute hidden bg-root-navBar w-full sm:w-1/3 left-0 z-10 rounded-br-lg" id="dropdown-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            ${renderMenu}
          </div>
        </div>
      </div>
    `

    const $logOutBtn = document.querySelector('#user-menu-sign-out')

    // Dropdown Main Menu
    const $menu = document.querySelector('#menu')
    const $menu_open = $menu.querySelector('#menu-open')
    const $menu_close = $menu.querySelector('#menu-close')
    const $dropdown_menu = document.querySelector('#dropdown-menu')

    function toggleMenu (menuStatus) {
      $menu_open.style.display = menuStatus ? 'block' : 'none'
      $menu_close.style.display = menuStatus ? 'none' : 'block'
      $dropdown_menu.style.display = menuStatus ? 'none' : 'block'
      $menu.dataset.status = !menuStatus
    }

    $menu.addEventListener('click', () => {
      const menuStatus = $menu.dataset.status === 'true'
      toggleMenu(menuStatus)
    })

    // Dropdown User Menu
    const $user_menu_button = document.querySelector('#user-menu-button')
    const $user_menu = document.querySelector('#user-menu')

    function toggleUserMenu (menuStatus) {
      $user_menu.style.display = menuStatus ? 'none' : 'block'
      $user_menu.dataset.status = !menuStatus
    }

    $user_menu_button.addEventListener('click', () => {
      const menuStatus = $user_menu.dataset.status === 'true'
      toggleUserMenu(menuStatus)
    })

    document.querySelector('body').addEventListener('click', (e) => {
      const isNavBar = e.target.closest('#navBar')
      const menuStatus = $menu.dataset.status === 'true' //dropdown menu
      const UserMenuStatus = $user_menu.dataset.status === 'true'//user menu
      
      if(menuStatus && !isNavBar) 
        toggleMenu(menuStatus)

      if(UserMenuStatus && !isNavBar)
        toggleUserMenu(UserMenuStatus)
    })

    $logOutBtn.addEventListener('click', () => {
      logOut()
    })

  } catch (e) {
    console.log(e)
    logOut()
  }

})();