<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./lib/routes.js";
  import SylvanasMini from "./lib/components/SylvanasMini.svelte";
  import GlobalTooltip from "./lib/components/GlobalTooltip.svelte";
  import Analytics from "./lib/components/Analytics.svelte";
  import Accessibility from "./lib/components/Accessibility.svelte";
  import "./app.css";
</script>

<Accessibility>
  <Router {routes} />
</Accessibility>
<SylvanasMini />
<GlobalTooltip />
<Analytics />
