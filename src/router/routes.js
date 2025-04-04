

const routes = [
  {

      path: '/',
      name: 'home',
      component: () => import('pages/IndexPage.vue') // Página principal sin layout
    },
    {
      path: '/formulario',
      name: 'formulario',
      component: () => import('pages/FormularioPage.vue') // Página de formulario sin layout
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('pages/ServiciosPage.vue') // Página de formulario sin layout
    },

    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue') // Página de error para rutas no encontradas
    }
]

export default routes
