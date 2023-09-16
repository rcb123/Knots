<script lang="ts">
	import { sidebarLinks } from '$constants/index';

	export let pathname: string;
</script>

<section
	class="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden"
>
	<div class="flex items-center justify-between gap-3 xs:gap-5">
		{#each sidebarLinks as link (link.route)}
			{@const isActive =
				(pathname.includes(link.route) && link.route.length > 1) || pathname === link.route}
			<a
				href={link.route}
				class={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
					isActive && 'bg-primary-500'
				}`}
			>
				<img src={link.imgURL} alt={link.label} width={16} height={16} class="object-contain" />

				<p class="text-subtle-medium text-light-1 max-sm:hidden">
					{link.label.split(/\s+/)[0]}
				</p>
			</a>
		{/each}
	</div>
</section>
