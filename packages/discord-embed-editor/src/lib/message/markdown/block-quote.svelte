<div class="container">
	<div class="divider"></div>
	<blockquote><slot /></blockquote>
</div>

<style>
	.container {
		display: flex;
	}
	.divider {
		background-color: rgb(78, 80, 88);
		width: 4px;
		border-radius: 4px;
	}
	blockquote {
		padding: 0 8px 0 12px;
    margin: 0;
		box-sizing: border-box;
		max-width: 90%;
		text-indent: 0;
	}
</style>
