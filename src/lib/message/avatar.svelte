<script lang="ts">
	export let src: string = 'https://cdn.discordapp.com/embed/avatars/0.png';
</script>

<img {src} alt="" />

<style>
	img {
		position: absolute;
		top: 4px;
		left: 16px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
		user-select: none;
		z-index: 1;
	}
</style>
