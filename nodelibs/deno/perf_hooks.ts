export * from from 'https://deno.land/std@0.105.0/node/perf_hooks.ts';
// TODO: update this when deno_std/node will default-export PerformanceEntry
import performance, {
  PerformanceEntry,
} from 'https://deno.land/std@0.105.0/node/perf_hooks.ts';
export default {
  ...performance,
  PerformanceEntry,
} as typeof performance & { PerformanceEntry: typeof PerformanceEntry };
