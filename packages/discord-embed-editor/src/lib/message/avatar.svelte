<script lang="ts">
	const DEFAULT_AVATAR_URL = 'https://cdn.discordapp.com/embed/avatars/0.png';
	export let src: string = DEFAULT_AVATAR_URL;
</script>

<img src={src != '' ? src : DEFAULT_AVATAR_URL} alt="" />

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
