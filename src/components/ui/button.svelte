<script lang="ts">
	type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon';

	export let variant: Variant = 'default';
	export let size: Size = 'default';
	export let style: 'primary' | 'success' | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let disabled = false;
	let className: string;
	export let action = () => {};

	export { className as class };

	const buttonVariants = {
		variants: {
			default:
				'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
			destructive:
				'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90',
			outline:
				'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
			secondary:
				'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
			ghost:
				'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
			link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50'
		},
		sizes: {
			default: 'h-10 px-4 py-2',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10'
		}
	};

	const baseClasses =
		'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800';
	let computedClasses = `${baseClasses} ${buttonVariants.variants[variant]} ${buttonVariants.sizes[size]} ${className}`;
</script>

<button
	class={computedClasses}
	class:primary={style === 'primary'}
	class:success={style === 'success'}
	{disabled}
	{type}
	on:click={action}
>
	<slot />
</button>

<style>
	.button {
		padding: 0.5rem;
	}
	.primary {
		background: #748dd5;
		border-color: #748dd5;
		color: #fff;
	}
	.success {
		background: #75d37e;
		border-color: #75d37e;
		color: #fff;
	}
</style>
