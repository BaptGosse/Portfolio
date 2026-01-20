export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	link?: string;
	github?: string;
	image?: string;
	featured?: boolean;
}

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	content?: string;
}

export interface Experience {
	company: string;
	role: string;
	period: string;
	description: string;
	technologies?: string[];
}

export interface Testimonial {
	name: string;
	role: string;
	company: string;
	content: string;
	image?: string;
}

export interface Skill {
	name: string;
	context: string;
}

export interface SkillCategory {
	category: string;
	items: Skill[];
}
