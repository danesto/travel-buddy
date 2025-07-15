<script lang="ts">
	import { fly } from 'svelte/transition';
	import X from '@lucide/svelte/icons/x';
	import CheckCircle from '@lucide/svelte/icons/check-circle';
	import AlertCircle from '@lucide/svelte/icons/alert-circle';
	import Info from '@lucide/svelte/icons/info';

	type ToastType = 'success' | 'error' | 'info' | 'warning';

	type ToastProps = {
		type?: ToastType;
		title?: string;
		description?: string;
		duration?: number;
		onClose?: () => void;
		show?: boolean;
	};

	let {
		type = 'info',
		title,
		description,
		duration = 5000,
		onClose,
		show = true
	}: ToastProps = $props();

	let visible = $state(show);

	// Auto-dismiss after duration
	$effect(() => {
		if (visible && duration > 0) {
			const timer = setTimeout(() => {
				visible = false;
				onClose?.();
			}, duration);

			return () => clearTimeout(timer);
		}
	});

	function handleClose() {
		visible = false;
		onClose?.();
	}

	function getIcon() {
		switch (type) {
			case 'success':
				return CheckCircle;
			case 'error':
				return AlertCircle;
			case 'warning':
				return AlertCircle;
			default:
				return Info;
		}
	}

	function getStyles() {
		const baseStyles = 'flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm';

		switch (type) {
			case 'success':
				return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
			case 'error':
				return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
			case 'warning':
				return `${baseStyles} bg-amber-50 border-amber-200 text-amber-800`;
			default:
				return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
		}
	}

	function getIconStyles() {
		switch (type) {
			case 'success':
				return 'text-green-600';
			case 'error':
				return 'text-red-600';
			case 'warning':
				return 'text-amber-600';
			default:
				return 'text-blue-600';
		}
	}
</script>

{#if visible}
	<div class="fixed top-4 right-4 z-50 w-full max-w-md" transition:fly={{ x: 400, duration: 300 }}>
		<div class={getStyles()}>
			<svelte:component this={getIcon()} class="h-5 w-5 {getIconStyles()} mt-0.5 flex-shrink-0" />

			<div class="min-w-0 flex-1">
				{#if title}
					<p class="text-sm font-semibold">{title}</p>
				{/if}
				{#if description}
					<p class="text-sm {title ? 'mt-1' : ''} opacity-90">{description}</p>
				{/if}
			</div>

			<button
				onclick={handleClose}
				class="ml-2 flex-shrink-0 opacity-70 transition-opacity hover:opacity-100"
				aria-label="Close notification"
			>
				<X class="h-4 w-4" />
			</button>
		</div>
	</div>
{/if}
