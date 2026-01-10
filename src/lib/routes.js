import Home from './pages/Home.svelte';
import Projects from './pages/Projects.svelte';
import ProjectDetail from './pages/projects/ProjectDetail.svelte';
import Research from './pages/Research.svelte';
import LiveDemos from './pages/LiveDemos.svelte';
import ButtonStopper from './pages/games/ButtonStopper.svelte';
import SQLInjection from './pages/games/SQLInjection.svelte';
import CSSArtist from './pages/games/CSSArtist.svelte';
import CodeDebugger from './pages/games/CodeDebugger.svelte';
import PasswordCracker from './pages/games/PasswordCracker.svelte';

export const routes = {
    '/': Home,
    '/projects': Projects,
    '/projects/:id': ProjectDetail,
    '/research': Research,
    '/live-demos': LiveDemos,
    '/games/button-stopper': ButtonStopper,
    '/games/sql-injection': SQLInjection,
    '/games/css-artist': CSSArtist,
    '/games/code-debugger': CodeDebugger,
    '/games/password-cracker': PasswordCracker
};
