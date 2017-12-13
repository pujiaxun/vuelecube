import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/timer',
      name: 'timer',
      component: require('@/components/TimerPage').default,
    },
    {
      path: '/stats',
      name: 'stats',
      component: require('@/components/StatsPage').default,
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: require('@/components/TutorialPage').default,
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: require('@/components/PreferencesPage').default,
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/timer',
    },
  ],
});
