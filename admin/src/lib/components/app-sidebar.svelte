<script lang="ts" module>
	import HomeIcon from '@lucide/svelte/icons/home';
	import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';
	import PackageIcon from '@lucide/svelte/icons/package';
	import UsersIcon from '@lucide/svelte/icons/users';
	import StoreIcon from '@lucide/svelte/icons/store';
	import { m } from '$lib/paraglide/messages';

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Home',
				url: '/dashboard',
				icon: HomeIcon
			},
			{
				title: 'Orders',
				url: '#',
				icon: ShoppingCartIcon,
				items: [
					{
						title: 'Order List',
						url: '#'
					},
					{
						title: 'Draft',
						url: '#'
					},
					{
						title: 'Shipping Labels',
						url: '#'
					}
				]
			},
			{
				title: 'Products',
				url: '#',
				icon: PackageIcon,
				items: []
			},
			{
				title: 'Customers',
				url: '#',
				icon: UsersIcon,
				items: []
			},
			{
				title: 'Online Store',
				url: '#',
				icon: StoreIcon,
				items: []
			}
		],
		navSecondary: [],
		projects: []
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import CommandIcon from '@lucide/svelte/icons/command';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<CommandIcon class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">Acme Inc</span>
								<span class="truncate text-xs">Enterprise</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
