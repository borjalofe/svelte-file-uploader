<script lang="ts">
	import { AppHeader } from './index.js';
	import type { AppHeaderNavItem } from './types.js';

	const navItems: AppHeaderNavItem[] = [
		{ href: '#resources', label: 'Resources', active: true },
		{ href: '#library', label: 'Library' },
		{ href: '#settings', label: 'Settings' }
	];
</script>

<AppHeader {navItems} brandLabel="pack" avatarLabel="Ada Lovelace" avatarInitials="AL" />
