<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from './index.js';

	let {
		value = $bindable('all'),
		disableVideos = false
	}: {
		value?: string;
		disableVideos?: boolean;
	} = $props();
</script>

<Tabs bind:value>
	<TabsList aria-label="Resource type">
		<TabsTrigger value="all">All</TabsTrigger>
		<TabsTrigger value="videos" disabled={disableVideos}>Videos</TabsTrigger>
		<TabsTrigger value="documents">Documents</TabsTrigger>
	</TabsList>
	<TabsContent value="all">All resources</TabsContent>
	<TabsContent value="videos">Video resources</TabsContent>
	<TabsContent value="documents">Document resources</TabsContent>
</Tabs>
