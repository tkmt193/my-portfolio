import styles from "./Portfolio.module.css";
import * as motion from "motion/react-client";
import portfolio from "../../assets/portfolio.png";
import comming from "../../assets/comming.png";
import work from "../../assets/work.png";

interface CardProps {
	link: string;
	category: string;
	title: string;
	description: string;
	image: string;
}

function PortfolioCard({
	link,
	category,
	title,
	description,
	image,
}: CardProps) {
	return (
		<motion.a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.card}
			whileHover={{
				scale: 1.1,
			}}
			whileTap={{ scale: 0.95 }}
		>
			<div className={styles.cardImg}>
				<img src={image} alt={title} className={styles.responsiveImg} />
			</div>
			<div className={styles.cardBody}>
				<span className={styles.cardCategory}>{category}</span>
				<h3 className={styles.cardTitle}>{title}</h3>
				<p className={styles.cardDescription}>{description}</p>
			</div>
		</motion.a>
	);
}

const works = [
	{
		id: "1",
		category: "WEB",
		title: "My Portfolio",
		description: "A web portfolio built with React",
		image: portfolio,
		link: "https://ikumi-portfolio.netlify.app/",
	},
	{
		id: "2",
		category: "Resume",
		title: "My Professional Experience",
		description: "Detailed Work History",
		image: work,
		link: "https://peppered-cap-e3a.notion.site/My-Professional-Experience-13ad9460212f80cb9915cefc72bc2919?pvs=143",
	},
	{
		id: "3",
		category: "Blog",
		title: "Zenn | Tech Blog",
		description:
			"I also share content on several other technology-related topics.",
		image:
			"https://res.cloudinary.com/zenn/image/upload/s--KwG6M5YQ--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:%25E3%2580%2590%25E5%25AE%259F%25E8%25B7%25B5%25E3%2582%25AC%25E3%2582%25A4%25E3%2583%2589%25E3%2580%2591AWS%2520Lambda%2520%252B%2520Docker%2520%252B%2520DuckDB%25E3%2581%25A7%25E4%25BD%259C%25E3%2582%258B%25E3%2583%2587%25E3%2583%25BC%25E3%2582%25BF%25E5%2587%25A6%25E7%2590%2586%25E5%259F%25BA%25E7%259B%25A4%2520-%2520Python%25203....%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:%25E3%2581%25BF%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyL2NiZjcyMjc2NTQuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT); background-color:unset;",
		link: "https://zenn.dev/mimimi193/articles/20250521-lambda-duckdb",
	},
	{
		id: "4",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		image: comming,
		link: "https://ikumi-portfolio.netlify.app/",
	},
	{
		id: "5",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		image: comming,
		link: "https://ikumi-portfolio.netlify.app/",
	},
];

export default function Portfolio({
	ref,
}: {
	ref: React.RefObject<HTMLElement | null>;
}) {
	return (
		<section ref={ref} className={styles.portfolioContainer}>
			<div className={styles.sectionHeader}>
				<h2>My Works</h2>
			</div>

			<div className={styles.tickerWrapper}>
				<motion.div
					className={styles.worksGrid}
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						duration: 20,
						ease: "linear",
						repeat: Infinity,
					}}
				>
					{works.map((work) => (
						<PortfolioCard key={`first-${work.id}`} {...work} />
					))}
					{works.map((work) => (
						<PortfolioCard key={`second-${work.id}`} {...work} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
