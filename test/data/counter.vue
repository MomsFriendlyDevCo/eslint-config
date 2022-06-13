<script>
app.component('counter', {
	data() { return {
		count: 1,
	}},
	methods: {
		increment() {
			this.count++;
		},
	},
});
</script>

<template>
	<div class="card">
		<div>The current count is {{count | number}}</div>
		<a @click="increment" class="btn btn-success">
			<i class="far fa-plus"/>
			Increment
		</a>
		<a @click="count = 0" class="btn btn-danger">
			<i class="far fa-undo"/>
			Reset
		</a>
	</div>
</template>
