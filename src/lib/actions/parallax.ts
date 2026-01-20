export function parallax(node: HTMLElement, speed: number = 0.5) {
	let animationFrame: number;

	const handleScroll = () => {
		const scrollY = window.scrollY;
		const rect = node.getBoundingClientRect();
		const nodeTop = rect.top + scrollY;
		const offset = (scrollY - nodeTop) * speed;

		node.style.transform = `translateY(${offset}px)`;
	};

	const throttledScroll = () => {
		if (animationFrame) {
			return;
		}

		animationFrame = requestAnimationFrame(() => {
			handleScroll();
			animationFrame = 0;
		});
	};

	window.addEventListener('scroll', throttledScroll, { passive: true });
	handleScroll();

	return {
		destroy() {
			window.removeEventListener('scroll', throttledScroll);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		}
	};
}
