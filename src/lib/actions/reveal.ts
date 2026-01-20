export function reveal(node: HTMLElement, options?: { delay?: number; threshold?: number }) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const delay = options?.delay || 0;
					setTimeout(() => {
						entry.target.classList.add('revealed');
					}, delay);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: options?.threshold || 0.1,
			rootMargin: '0px 0px -50px 0px'
		}
	);

	observer.observe(node);
	node.classList.add('reveal');

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
