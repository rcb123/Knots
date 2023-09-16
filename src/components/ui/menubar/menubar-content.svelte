<script lang="ts">
	import { MenubarPortal } from './index';

	export let className: string = '';
	// These exist only in Radix UI and may have to be passed to menu component directly
	// export let align: string = 'start';
	// export let alignOffset: number = -4;
	// export let sideOffset: number = 8;

	const baseClasses =
		'z-50 min-w-[12rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50';
	const computedClasses = `${baseClasses} ${className}`;
</script>

<MenubarPortal>
	<div class={computedClasses}>
		<slot />
	</div>
</MenubarPortal>
